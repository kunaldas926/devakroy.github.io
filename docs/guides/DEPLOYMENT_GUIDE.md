# Deployment & Infrastructure Guide

## Overview

This guide covers deployment strategies, infrastructure setup, monitoring, and best practices for the portfolio
application.

## Table of Contents

1. [Deployment Platforms](#deployment-platforms)
2. [GitHub Pages Deployment](#github-pages-deployment)
3. [Alternative Deployment Options](#alternative-deployment-options)
4. [Environment Management](#environment-management)
5. [Monitoring & Analytics](#monitoring--analytics)
6. [Security Headers](#security-headers)
7. [Performance Optimization](#performance-optimization)
8. [Scaling Considerations](#scaling-considerations)

## Deployment Platforms

### Current: GitHub Pages

**Advantages:**

- Free hosting for public repositories
- Automatic deployment from `main` branch
- Custom domain support
- Built-in CDN
- HTTPS by default

**Setup:**

1. Repository must be public
2. Enable GitHub Pages in Settings
3. Set source to `gh-pages` branch
4. Configure custom domain (optional)

### Build Output

The `dist/` directory contains the production build:

- Minified and optimized assets
- Service Worker (offline support)
- Security headers
- Performance-optimized images

## GitHub Pages Deployment

### Automatic Deployment (CI/CD)

```yaml
# .github/workflows/ci-cd.yml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
    cname: devakroy.github.io
```

### Manual Deployment

```bash
# Build the project
npm run build

# Push to gh-pages branch
npm run deploy
```

### Verification

1. **Check live site**: https://devakroy.github.io/devakroy.github.io/
2. **Monitor GitHub Actions**: Actions tab in repository
3. **Check deployment status**: Settings → GitHub Pages

## Alternative Deployment Options

### Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_ANALYTICS_ENABLED": "true"
  }
}
```

Benefits:

- Preview deployments
- Edge functions
- Analytics built-in
- Automatic optimizations

### Netlify

```toml
[build]
  command = "npm run build"
  publish = "dist"

[context.production]
  environment = { VITE_NODE_ENV = "production" }

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY _headers /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Management

### Environment Variables

Create `.env.local` (not committed):

```env
VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_GITHUB_TOKEN=your_token_here
```

### Development

```bash
npm run dev
# Uses .env.development.local
```

### Production

```bash
npm run build
# Uses .env.production.local
```

### Feature Flags

```javascript
// Enable/disable features for specific environments
const FEATURES = {
  ANALYTICS: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
  PWA: import.meta.env.VITE_ENABLE_PWA === 'true',
};
```

## Monitoring & Analytics

### Error Tracking (Future)

```javascript
// Setup Sentry (optional)
import * as Sentry from '@sentry/vite';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring

Key metrics to track:

- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Page load time
- Bundle size

```javascript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Google Search Console

1. Verify domain ownership
2. Submit sitemap (auto-generated at `/sitemap.xml`)
3. Monitor indexing status
4. Check search performance

### Google Analytics

```javascript
// Global site tag (gtag.js)
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
```

## Security Headers

### Implemented Headers

```yaml
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; script-src 'self' 'wasm-unsafe-eval'
Referrer-Policy: strict-origin-when-cross-origin
```

### Custom Domain Configuration

If using custom domain:

```text
// _headers (Netlify)
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

## Performance Optimization

### Current Optimizations

✅ Code splitting
✅ Asset compression (Terser)
✅ Lazy image loading
✅ Service Worker caching
✅ CSS/JS minification
✅ HTTP/2 push hints

### Further Improvements

```javascript
// Enable preload hints
<link rel="preload" href="/assets/logo.svg" as="image">
<link rel="dns-prefetch" href="https://api.github.com">
<link rel="prefetch" href="/about">
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze

# Use Vite plugin for detailed breakdown
npm install -D rollup-plugin-visualizer
```

## Scaling Considerations

### Current Architecture

- **Static site**: No backend required
- **CDN delivery**: GitHub Pages CDN (global)
- **Caching**: Service Worker + HTTP cache headers
- **Database**: Not applicable

### If Scaling is Needed

1. **Add API Backend**
    - Node.js/Express server
    - Database (PostgreSQL/MongoDB)
    - Auth system

2. **Use Serverless Functions**
    - Vercel Functions
    - AWS Lambda
    - Netlify Functions

3. **Dynamic Content**

   ```javascript
   // Example: API call to fetch projects
   async function loadProjects() {
     const response = await fetch('/api/projects');
     return response.json();
   }
   ```

4. **Database Integration**

   ```javascript
   import { createClient } from '@supabase/supabase-js';

   const supabase = createClient(URL, KEY);
   const { data } = await supabase.from('projects').select('*');
   ```

## Rollback & Version Management

### Deployment History

```bash
# View recent deployments
gh api repos/devakroy/devakroy.github.io/deployments

# Rollback to previous version
git revert <commit-hash>
git push origin main
```

### Versioning

Use semantic versioning:

- **MAJOR.MINOR.PATCH** (e.g., 1.2.3)
- Update in `package.json`
- Tag releases: `git tag v1.2.3`

## Health Checks

### Regular Checks

```bash
# Monthly checklist
- [ ] All links work
- [ ] Forms submit correctly
- [ ] Analytics data flowing
- [ ] Service Worker active
- [ ] HTTPS certificate valid
- [ ] Security headers present
- [ ] Performance metrics acceptable
- [ ] Mobile responsive
- [ ] Accessibility compliant
```

### Automated Health Checks

```yaml
# Example: Uptime monitoring
- Check homepage loads in < 2s
- Verify critical resources exist
- Test form submission
- Check core functionality
```

## Disaster Recovery

### Backup Strategy

```bash
# Automatic via Git
- All code in repository (GitHub)
- Database backups (if applicable)
- Assets in dist/ (regenerable from source)
```

### Recovery Steps

1. Clone repository
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Deploy: `git push origin main`

## Documentation

- [GitHub Pages Docs](https://pages.github.com/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Web Performance APIs](https://developer.mozilla.org/en-US/docs/Web/API/Performance)

---

**Last Updated**: February 2026
