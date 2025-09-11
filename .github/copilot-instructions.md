# GitHub Copilot Instructions for ioBroker.hoymiles-ms

## Project Overview

This is an ioBroker adapter that integrates **Hoymiles MicroStorage systems** (currently only Hoymiles SM-A2) into ioBroker. The adapter acts as an MQTT server/client to communicate with Hoymiles MS-A2 devices for monitoring and controlling power consumption and delivery.

**Tech Stack:**
- TypeScript/Node.js
- ioBroker adapter framework
- MQTT protocol for device communication
- ESLint for code quality
- Mocha for testing

## Code Guidelines

### General Development
- Follow TypeScript best practices and existing code style
- Use the existing ESLint configuration (`eslint.config.mjs`)
- Maintain compatibility with Node.js >= 20
- Follow ioBroker adapter development standards

### Build Process
- **IMPORTANT:** Build artifacts in the `build/` directory are intentionally committed to GitHub and should continue to be pushed in future changes
- Use `npm run build` to compile TypeScript to JavaScript
- Use `npm run lint` to check code quality
- Use `npm test` to run the test suite

### Testing
- Add tests for new functionality using the existing Mocha setup
- Tests are located in the `test/` directory
- Run `npm test` to execute all tests

## Pull Request Guidelines

### Issue Management
- **Do NOT close issues** that are solved by a PR
- Instead, attach the label 'fixed' to solved issues
- Add a reference to the PR as a comment on the issue

### Changelog Management
- **ALWAYS** add all changes to the changelog section in `README.md`
- Add entries below the `### **WORK IN PROGRESS**` label (around line 77)
- **Do NOT remove** the template comment for `### **WORK IN PROGRESS**`
- Follow the existing changelog format:
  ```
  ### **WORK IN PROGRESS**
  * (author) Description of change
  ```

### Documentation-Only Changes
When making changes that only affect documentation files:
- **Do NOT** commit any code changes
- **Do NOT** rebuild the project
- **Do NOT** commit build artifacts
- Only commit the documentation file changes

### Build Artifacts
- The `build/` directory contains compiled JavaScript files that are intentionally tracked in Git
- When making code changes, ensure build artifacts are updated and committed
- This is different from typical Node.js projects where build artifacts are ignored

## File Structure

```
├── src/           # TypeScript source code
├── build/         # Compiled JavaScript (tracked in Git)
├── admin/         # Admin interface files
├── test/          # Test files
├── i18n/          # Internationalization files
└── README.md      # Documentation with changelog
```

## Device-Specific Context

### Hoymiles MS-A2 Integration
- The adapter communicates via MQTT protocol
- Device sends configuration data once on connection
- Real-time data is sent every second
- System statistics are updated every 5 minutes
- These intervals are defined by the Hoymiles API, not configurable by the adapter

### Configuration
- Adapter can operate as MQTT server or client
- Default MQTT port is 1881 (avoiding conflicts with other ioBroker adapters)
- Authentication is currently not supported
- Device control (power output setting) is implemented

## Security & Best Practices

- No hardcoded credentials or sensitive data in code
- Use environment variables for configuration when needed
- Follow ioBroker security guidelines
- Maintain compatibility with ioBroker's plugin architecture (e.g., Sentry integration)

## Dependencies

- Keep dependencies up to date while maintaining stability
- Major version updates should be tested thoroughly
- Use `npm audit` to check for security vulnerabilities
- Follow semantic versioning for releases