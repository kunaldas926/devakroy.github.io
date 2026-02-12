# Arnab Kumar Roy - Portfolio

A modern, production-ready portfolio website with enterprise-grade features.

**📚 [Complete Documentation](docs/)** | **🌐 [Live Site](https://devakroy.github.io)**

## Quick Links

- 📖 **Getting Started**: [Setup Guide](docs/guides/SETUP.md)
- 🏗️ **Architecture**: [System Design](docs/technical/ARCHITECTURE.md)
- 💻 **API Reference**: [Complete API](docs/technical/API_DOCUMENTATION.md)
- 🤝 **Contributing**: [Contribution Guide](docs/guides/CONTRIBUTING.md)
- 📋 **All Docs**: [Documentation Index](docs/reference/DOCUMENTATION_INDEX.md)

## ✨ Features

- 🔒 **Enterprise Security**: XSS prevention, CSP headers, input validation
- ⚡ **Performance Optimized**: 11.4 KB JS bundle, lazy loading, PWA
- 📊 **Privacy-First Analytics**: Error tracking without personal data
- 🍪 **GDPR Compliant**: Cookie consent, privacy policy, terms of service
- ✅ **Well Tested**: 19 unit tests, 80%+ code coverage
- 🚀 **Production Ready**: CI/CD pipeline, automated deployment

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Run tests
npm test

# 4. Build for production
npm run build
```

**For detailed setup**: See [SETUP.md](docs/guides/SETUP.md)

## 📁 Project Structure

```
devakroy.github.io/
├── docs/                    # Complete documentation (organized by category)
│  ├── guides/              # Setup, contribution, testing, deployment
│  ├── technical/           # Architecture, API, project structure
│  ├── legal/               # Privacy policy, terms, conduct
│  └── reference/           # Implementation details, status
│
├── src/                    # Application source code
│  ├── core/               # Core modules (security, analytics, etc.)
│  ├── modules/            # Feature modules (forms, navigation, UI, etc.)
│  └── tests/              # Unit tests
│
├── public/                 # Static assets
│  ├── service-worker.js    # PWA offline support
│  ├── manifest.json        # PWA configuration
│  └── robots.txt           # SEO
│
├── index.html              # Main HTML
├── styles.css              # Global styles
├── script.js               # Entry point
├── package.json            # Dependencies
└── Configuration files     # vite.config.js, etc.
```

**For detailed structure**: See [PROJECT_STRUCTURE.md](docs/technical/PROJECT_STRUCTURE.md)

## 📚 Documentation

All documentation is organized in the `docs/` folder:

### Guides (Getting Started)

- [SETUP.md](docs/guides/SETUP.md) - Installation & configuration
- [DEVELOPER_GUIDE.md](docs/guides/DEVELOPER_GUIDE.md) - Developer onboarding
- [CONTRIBUTING.md](docs/guides/CONTRIBUTING.md) - How to contribute
- [TESTING_GUIDE.md](docs/guides/TESTING_GUIDE.md) - Testing strategies
- [DEPLOYMENT_GUIDE.md](docs/guides/DEPLOYMENT_GUIDE.md) - Production deployment

### Technical Documentation

- [ARCHITECTURE.md](docs/technical/ARCHITECTURE.md) - System design & modules
- [API_DOCUMENTATION.md](docs/technical/API_DOCUMENTATION.md) - Complete API reference (60+ functions)
- [PROJECT_STRUCTURE.md](docs/technical/PROJECT_STRUCTURE.md) - File organization

### Legal & Compliance

- [PRIVACY_POLICY.md](docs/legal/PRIVACY_POLICY.md) - GDPR/CCPA compliant
- [TERMS_OF_SERVICE.md](docs/legal/TERMS_OF_SERVICE.md) - Legal terms

### Reference

- [DOCUMENTATION_INDEX.md](docs/reference/DOCUMENTATION_INDEX.md) - Browse all docs
- [DOCUMENTATION_STATUS.md](docs/reference/DOCUMENTATION_STATUS.md) - Completeness report
- [COMPREHENSIVE_IMPLEMENTATION_SUMMARY.md](docs/reference/COMPREHENSIVE_IMPLEMENTATION_SUMMARY.md) - Implementation
  details

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Watch mode
npm run test:watch

# Interactive UI
npm run test:ui
```

**Test Coverage**: 19 tests passing, 80%+ coverage on critical modules

## 🛠️ Development

```bash
# Start development server (hot reload)
npm run dev

# Format code
npm run format

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 🚀 Deployment

```bash
# Build for production
npm run build

# Verify build
npm run preview

# Push to main branch (auto-deploys via GitHub Actions)
git push origin main
```

**Deployment details**: See [DEPLOYMENT_GUIDE.md](docs/guides/DEPLOYMENT_GUIDE.md)

## 📊 Key Metrics

- **Build time**: 1.07 seconds
- **Main JS bundle**: 11.4 KB (minified)
- **CSS**: 95.6 KB (with FontAwesome)
- **Tests**: 19/19 passing
- **Coverage**: 80%+ on security & utils modules
- **Performance**: Lighthouse 90+

## 🔒 Security & Compliance

- ✅ XSS prevention via input sanitization
- ✅ CSP headers configured
- ✅ HTTPS enforced (HSTS)
- ✅ GDPR compliant (cookie consent, privacy policy)
- ✅ CCPA compliant
- ✅ Automated security headers

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](docs/guides/CONTRIBUTING.md) for:

- Code style guidelines
- Git workflow
- Pull request process
- Testing requirements

## 📝 License

MIT License - See [LICENSE](LICENSE)

## 👤 Author

**Arnab Kumar Roy**

- Portfolio: [devakroy.github.io](https://devakroy.github.io)
- GitHub: [@devakroy](https://github.com/devakroy)

---

**Status**: ✅ Production Ready | **Last Updated**: February 12, 2026
