
/**
 * AKKU-MANAGEMENT-SKRIPT FÜR IO BROKER
 * 
 * Dieses Skript steuert einen Batteriespeicher basierend auf dem aktuellen Stromüberschuss.
 * Es lädt den Akku bei PV-Überschuss und entlädt ihn bei Strombedarf.
 * Entwurf von BertDerKleine
 * 
 * Merkmale:
 * - Kontinuierliche Regelung unabhängig von Tageszeit
 * - Getrennte Zielfaktoren für Lade- und Entladevorgänge
 * - PI-Regler für stabile Regelung
 * - SOC-Schutz gegen Überladung und Tiefentladung
 * - Alternierende Steuerbefehle für zuverlässige Akku-Kommunikation
 * - Ausführliche Diagnosefunktionen
 * - Konfigurierbares Logging
 */
 
// ========== KONFIGURATION ==========
const AUSFUEHRLICHES_LOGGING = false;  // Auf TRUE setzen für detaillierte Regel-Logs (nur für Debugging)
const MAX_LOG_LAENGE = 100;             // Maximale Anzahl gespeicherter Log-Einträge für Diagnose
 
// ========== GLOBALE VARIABLEN ==========
/**
 * Intervall für das Senden von Steuerbefehlen (in Millisekunden)
 * Der Akku benötigt regelmäßige Aktualisierungen, da er Befehle nach 60-90 Sekunden "vergisst"
 * 30000 = 30 Sekunden ist ein bewährter Wert für zuverlässige Kommunikation
 */
const alternierIntervall = 30000;
 
/**
 * Datenpunkt für Akku-Steuerbefehle
 * - Positive Werte: Entladen (Leistungsabgabe)
 * - Negative Werte: Laden (Leistungsaufnahme)
 */
const AKTIONS_DATENPUNKT = 'alias.0.Akku_befohlene_Entladeleistung';
 
/** Datenpunkt für die aktuell gemessene Akku-Leistung */
const AKTUELLE_AKKULEISTUNG = 'alias.0.Akku_grid_on_power';
 
// Betriebsstatus
let regelungAktiv = false;  // Gibt an, ob die Regelung aktuell läuft
 
// Intervalle
let messIntervall = null;    // Intervall für Leistungsmessungen
let regelIntervall = null;   // Intervall für Regelberechnungen
let sendeIntervall = null;   // Intervall für Steuerbefehle
 
// Regelvariablen
let mittelungArray = [];     // Speichert die letzten Messwerte für die Mittelwertbildung
let aktuellerSollwert = 0;   // Aktuell berechneter Sollwert für Akku-Leistung
let toggleFlag = true;       // Steuert die Alternierung der Steuerbefehle (+0.1W Wechsel)
let integral = 0;            // Integralanteil des PI-Reglers
 
// ========== PARAMETER ==========
/**
 * Maximale Ladeleistung in Watt
 * Sollte unterhalb der technischen Grenzen des Akkus liegen.
 */
const maxLadeleistung = 800;
 
/**
 * Maximale Entladeleistung in Watt
 * Abhängig von Akku-Kapazität und Wechselrichter.
 */
const maxEntladeleistung = 800;
 
/**
 * Intervall für Leistungsmessungen in Millisekunden
 * 10000 = 10 Sekunden ist ein guter Kompromiss zwischen Aktualität und Stabilität
 */
const samplingIntervall = 10000;
 
/**
 * Faktor für den Integralanteil des PI-Reglers
 * Ein höherer Wert reagiert stärker auf anhaltende Abweichungen
 * 0.2 ist ein moderater Wert für stabile Regelung ohne zu starkes Überschwingen
 */
const integralFaktor = 0.2;
 
/** Ladezustand bei dem das Laden gestoppt wird (Vermeidung von Überladung) */
const SOC_LADESTOPP = 98;
 
/** Ladezustand bei dem das Entladen gestoppt wird (Vermeidung von Tiefentladung) */
const SOC_ENTLADESTOPP = 10;
 
/**
 * Zielfaktoren für Regelung
 * 
 * zielFaktorLaden: Anteil des Überschusses der fürs Laden genutzt wird (0-1)
 *   - 0.8 = 80% des Überschusses werden zum Laden genutzt (konservativ)
 *   - Höhere Werte nutzen mehr Überschuss, können aber zu Netzinstabilität führen
 * 
 * zielFaktorEntladen: Anteil des Bedarfs der durch Entladen gedeckt wird (0-1)
 *   - 1.0 = 100% des Bedarfs werden durch Entladen gedeckt (maximale Autarkie)
 *   - Niedrigere Werte schonen den Akku, erhöhen aber Netzbezug
 */
const zielFaktorLaden = 0.8;
const zielFaktorEntladen = 1.0;
 
// ========== LOGGING SYSTEM ==========
let logHistorie = [];  // Speichert die letzten Log-Einträge für Diagnosezwecke
 
/**
 * Verbesserte Log-Funktion mit Historie-Speicherung und Level-Steuerung
 * 
 * @param {string} nachricht - Die zu loggende Nachricht
 * @param {string} level - Log-Level ('debug', 'info', 'warn', 'error')
 */
function log(nachricht, level = 'info') {
    // Erstelle formatierten Log-Eintrag
    const timestamp = new Date().toISOString();
    const logEintrag = `[${timestamp}] [${level.toUpperCase()}] ${nachricht}`;
    
    // Füge zur Historie hinzu (begrenzt auf MAX_LOG_LAENGE)
    logHistorie.push(logEintrag);
    if (logHistorie.length > MAX_LOG_LAENGE) {
        logHistorie.shift();
    }
    
    // Ausgabe basierend auf Level und Konfiguration
    switch(level) {
        case 'error':
            console.error(logEintrag);
            break;
        case 'warn':
            console.warn(logEintrag);
            break;
        case 'info':
            console.log(logEintrag);
            break;
        case 'debug':
            // Debug-Logs nur bei aktiviertem ausführlichen Logging
            if (AUSFUEHRLICHES_LOGGING) {
                console.log(logEintrag);
            }
            break;
        default:
            console.log(logEintrag);
    }
}
 
// ========== HELFERFUNKTIONEN ==========
/**
 * Setzt den Steuerungsdatenpunkt mit Fehlerbehandlung
 * 
 * @param {number} wert - Der zu setzende Wert
 * @returns {boolean} True bei Erfolg, False bei Fehler
 */
function sicherSetState(wert) {
    try {
        setState(AKTIONS_DATENPUNKT, wert, false);
        return true;
    } catch (e) {
        log(`Fehler beim Setzen des Datenpunkts: ${e.message}`, 'error');
        return false;
    }
}
 
/**
 * Bereinigt den gemessenen Überschuss um den aktuellen Akku-Beitrag
 * 
 * @param {number} ueberschussGemessen - Gemessener Stromüberschuss
 * @param {number} akkuLeistung - Aktuelle Akku-Leistung (positiv = Entladen, negativ = Laden)
 * @returns {number} Bereinigter Überschuss
 */
function bereinigeLeistung(ueberschussGemessen, akkuLeistung) {
    return ueberschussGemessen - akkuLeistung;
}
 
// ========== FLEXIBLE REGELUNG ==========
/**
 * Startet die kontinuierliche Akku-Regelung
 */
function starteFlexibleRegelung() {
    if (regelungAktiv) {
        log("Regelung bereits aktiv - Start abgebrochen", 'debug');
        return;
    }
    
    stoppeRegelung();
    log("Starte flexible Regelung...");
    
    regelungAktiv = true;
    mittelungArray = [];
    aktuellerSollwert = 0;
    integral = 0;
    toggleFlag = true;
 
    // Initialer Status-Log mit Konfiguration
    log(`Regelung gestartet mit:
  Max Laden: ${maxLadeleistung}W
  Max Entladen: ${maxEntladeleistung}W
  Laden-Zielfaktor: ${zielFaktorLaden}
  Entladen-Zielfaktor: ${zielFaktorEntladen}
  SOC-Limits: Ladestopp >${SOC_LADESTOPP}%, Entladestopp <${SOC_ENTLADESTOPP}%`, 'info');
 
    // Messintervall - Sammelt regelmäßig Leistungsdaten
    messIntervall = setInterval(() => {
        try {
            const ueberschussGemessen = getState('alias.0.Stromüberschuss_IR-Lesekopf').val;
            const akkuLeistung = getState(AKTUELLE_AKKULEISTUNG).val;
            const bereinigteLeistung = bereinigeLeistung(ueberschussGemessen, akkuLeistung);
            
            mittelungArray.push(bereinigteLeistung);
            if (mittelungArray.length > 6) mittelungArray.shift();
        } catch (e) {
            log("Messfehler: " + e.message, 'error');
        }
    }, samplingIntervall);
 
    // Regelintervall - Berechnet alle 20 Sekunden neue Sollwerte
    regelIntervall = setInterval(() => {
        try {
            if (mittelungArray.length < 3) {
                log("Nicht genug Messwerte für Regelung", 'debug');
                return;
            }
            
            // Berechne gleitenden Mittelwert der letzten Messungen
            const summe = mittelungArray.reduce((a, b) => a + b, 0);
            const mittelwert = summe / mittelungArray.length;
            
            // Bestimmung des Betriebsmodus
            const istLadebetrieb = mittelwert > 0; // Positiver Wert = Überschuss = Laden
            const zielFaktor = istLadebetrieb ? zielFaktorLaden : zielFaktorEntladen;
            
            // Berechnung der benötigten Akku-Leistung
            const zielLeistung = Math.abs(mittelwert) * zielFaktor;
            const zielwert = istLadebetrieb ? -zielLeistung : zielLeistung;
            
            // PI-Regler berechnet Anpassung
            const differenz = zielwert - aktuellerSollwert;
            integral += differenz * integralFaktor;
            
            // Integrator-Begrenzung
            const integratorLimit = istLadebetrieb ? maxLadeleistung : maxEntladeleistung;
            integral = Math.min(Math.max(integral, -integratorLimit), integratorLimit);
            
            // Neuen Sollwert berechnen
            let neuerSollwert = aktuellerSollwert + differenz + integral;
            
            // Physikalische Grenzen einhalten
            if (istLadebetrieb) {
                neuerSollwert = Math.min(neuerSollwert, 0); // Max 0 = keine Entladung
                neuerSollwert = Math.max(neuerSollwert, -maxLadeleistung); // Min = -maxLadeleistung
            } else {
                neuerSollwert = Math.max(neuerSollwert, 0); // Min 0 = kein Laden
                neuerSollwert = Math.min(neuerSollwert, maxEntladeleistung); // Max = maxEntladeleistung
            }
            
            // Sanfte Anpassung (30% pro Schritt)
            const aenderung = neuerSollwert - aktuellerSollwert;
            if (Math.abs(aenderung) > 10) {
                aktuellerSollwert += aenderung * 0.3;
            } else {
                aktuellerSollwert = neuerSollwert;
            }
            
            // Ausführliches Logging nur bei Bedarf
            if (AUSFUEHRLICHES_LOGGING) {
                log(`Regelberechnung:
  Überschuss (gemittelt): ${mittelwert.toFixed(1)}W
  Ziel-Leistung: ${zielLeistung.toFixed(1)}W
  Zielwert (Akku): ${zielwert.toFixed(1)}W
  Neuer Sollwert: ${neuerSollwert.toFixed(1)}W
  Aktueller Sollwert: ${aktuellerSollwert.toFixed(1)}W
  Differenz: ${differenz.toFixed(1)}W
  Integral: ${integral.toFixed(1)}
  Faktor: ${zielFaktor}
  Modus: ${istLadebetrieb ? 'Laden' : 'Entladen'}`, 'debug');
            }
        } catch (e) {
            log("Regelfehler: " + e.message, 'error');
        }
    }, 20000);
 
    // Sendeintervall - Sendet alle 30 Sekunden Steuerbefehle
    sendeIntervall = setInterval(() => {
        if (!regelungAktiv) return;
        
        // SOC-Schutz - Verhindert Überladung und Tiefentladung
        const akkuSOC = getState('alias.0.Akku_Ladezustand').val;
        let effektiverSollwert = aktuellerSollwert;
        
        if (effektiverSollwert < 0 && akkuSOC > SOC_LADESTOPP) {
            effektiverSollwert = 0;
            log(`LADESTOPP: Akku > ${SOC_LADESTOPP}% (SOC: ${akkuSOC.toFixed(1)}%)`, 'warn');
        }
        
        if (effektiverSollwert > 0 && akkuSOC < SOC_ENTLADESTOPP) {
            effektiverSollwert = 0;
            log(`ENTLADESTOPP: Akku < ${SOC_ENTLADESTOPP}% (SOC: ${akkuSOC.toFixed(1)}%)`, 'warn');
        }
        
        // Alternierende Werte senden (jeder 2. Befehl +0.1W)
        const wert = toggleFlag ? effektiverSollwert : effektiverSollwert + 0.1;
        sicherSetState(wert);
        toggleFlag = !toggleFlag;
        
        // Protokolliere nur die ersten 20 Minuten oder bei Moduswechsel
        log(`Steuerbefehl gesendet: ${wert.toFixed(1)}W (${toggleFlag ? 'nächstes Mal Basiswert' : 'nächstes Mal +0.1W'})`, 'debug');
    }, alternierIntervall);
 
    log("Flexible Regelung erfolgreich gestartet", 'info');
}
 
/**
 * Stoppt die laufende Regelung
 */
function stoppeRegelung() {
    if (!regelungAktiv) return;
    
    clearInterval(messIntervall);
    clearInterval(regelIntervall);
    clearInterval(sendeIntervall);
    regelungAktiv = false;
    
    sicherSetState(0);
    log("Regelung gestoppt", 'info');
}
 
// ========== HAUPTPROGRAMM ==========
/**
 * Initialisiert das Skript
 */
function initSkript() {
    try {
        starteFlexibleRegelung();
        log("Skript initialisierung abgeschlossen");
        
        // Aktiviere temporäres ausführliches Logging für die ersten 10 Minuten
        setTimeout(() => {
            if (!AUSFUEHRLICHES_LOGGING) {
                log("Initiale Debug-Periode beendet - Detaillogs deaktiviert");
            }
        }, 600000); // 10 Minuten
    } catch (e) {
        log("Initialisierungsfehler: " + e.message, 'error');
    }
}
 
// Startverzögerung für Systeminitialisierung
setTimeout(initSkript, 5000);
 
// ========== EVENT-HANDLER ==========
// Überwacht Ladezustandsänderungen
on({ id: 'alias.0.Akku_Ladezustand', change: 'ne' }, (state) => {
    const soc = state.val;
    
    // Protokolliere nur bei relevanten Änderungen
    if (soc > SOC_LADESTOPP && aktuellerSollwert < 0) {
        log(`AKTION: Ladung pausiert (SOC: ${soc}% > ${SOC_LADESTOPP}%)`, 'warn');
    } else if (soc < SOC_ENTLADESTOPP && aktuellerSollwert > 0) {
        log(`AKTION: Entladung pausiert (SOC: ${soc}% < ${SOC_ENTLADESTOPP}%)`, 'warn');
    } else if (soc <= SOC_LADESTOPP && soc >= SOC_ENTLADESTOPP) {
        log(`SOC im normalen Bereich: ${soc}%`, 'debug');
    }
});
 
// ========== DIAGNOSE & MONITORING ==========
// Regelmäßige Systemdiagnose
const diagIntervall = setInterval(() => {
    const ueberschuss = getState('alias.0.Stromüberschuss_IR-Lesekopf').val || 0;
    const akkuLeistung = getState(AKTUELLE_AKKULEISTUNG).val || 0;
    const akkuSOC = getState('alias.0.Akku_Ladezustand').val || 0;
    const istLadebetrieb = aktuellerSollwert < 0;
    
    log(`Systemdiagnose:
  Regelstatus: ${regelungAktiv ? "AKTIV" : "INAKTIV"}
  Betriebsmodus: ${istLadebetrieb ? 'LADEN' : 'ENTLADEN'}
  Sollleistung: ${aktuellerSollwert.toFixed(1)}W
  Istleistung: ${akkuLeistung}W
  Überschuss: ${ueberschuss}W
  SOC: ${akkuSOC.toFixed(1)}%
  Messwerte: ${mittelungArray.length} gespeichert
  Letzte Logs: ${logHistorie.slice(-3).join('\n  ')}`, 
  'info');
}, 300000); // Alle 5 Minuten
 
// Datenpunkt-Prüfung
function pruefeDatenpunkte() {
    const datenpunkte = [
        'alias.0.Stromüberschuss_IR-Lesekopf',
        'alias.0.Akku_Ladezustand',
        AKTUELLE_AKKULEISTUNG,
        AKTIONS_DATENPUNKT
    ];
    
    let fehler = false;
    datenpunkte.forEach(id => {
        if (getState(id) === undefined) {
            fehler = true;
            log(`KRITISCH: Datenpunkt ${id} nicht gefunden!`, 'error');
        }
    });
    
    if (fehler) {
        log("Fehlende Datenpunkte - Skriptfunktionalität eingeschränkt", 'error');
    } else {
        log("Alle benötigten Datenpunkte verfügbar", 'debug');
    }
}
 
// Verzögerte Datenpunktprüfung
setTimeout(pruefeDatenpunkte, 15000);
 
// ========== NOTFALL-SYSTEM ==========
// Automatischer Neustart bei Inaktivität
const watchdogIntervall = setInterval(() => {
    if (!regelungAktiv) {
        log("Watchdog: Regelung inaktiv - Neustart wird versucht", 'warn');
        initSkript();
    }
}, 600000); // Prüft alle 10 Minuten
