# Static Assets

Static files served as-is during development and production.

## 📁 Structure

```
public/
├── service-worker.js       # PWA offline support
├── manifest.json           # PWA configuration
├── robots.txt              # SEO - robot crawling rules
├── sitemap.xml             # SEO - XML sitemap
└── _headers                # Netlify security headers
```

## 📄 File Purposes

### service-worker.js (75 lines)

**Purpose**: Progressive Web App offline support

**Key Features**:

- Cache-first strategy for assets (fonts, CSS, JS)
- Network-first strategy for HTML
- Offline fallback: cached index.html
- Automatic cache management
- 1-year immutable caching for versioned assets

**Cache Name**: `portfolio-v1`

**Cached Resources**:

- `.woff2`, `.woff` - Fonts
- `.css` - Stylesheets
- `.js` - JavaScript
- `.jpg`, `.jpeg`, `.png` - Images
- `.webp` - Modern image format

**How It Works**:

1. **Install**: Caches critical resources
2. **Activate**: Cleans up old cache versions
3. **Fetch**: Intercepts requests and serves from cache
4. **Offline**: Falls back to cached `index.html`

**Testing**:

- DevTools → Application → Service Workers
- Check registration status
- Test offline mode (DevTools: throttle to offline)

---

### manifest.json (20 lines)

**Purpose**: Progressive Web App configuration

**Key Properties**:

```json
{
  "name": "Arnab Kumar Roy - AI/ML Software Engineer Portfolio",
  "short_name": "AKR Portfolio",
  "description": "Modern portfolio with AI/ML projects",
  "start_url": "/devakroy.github.io/",
  "display": "standalone", // Fullscreen app
  "background_color": "#000000",
  "theme_color": "#00d4ff",
  "scope": "/devakroy.github.io/",
  "icons": [
    { "src": "profilepic", "sizes": "192x192", "type": "image/jpeg" },
    { "src": "profilepic", "sizes": "512x512", "type": "image/jpeg" }
  ]
}
```

**Features**:

- Makes website installable on mobile/desktop
- Custom app name and icon
- Standalone display mode (fullscreen)
- Theme color configuration

**Installation**:

- **Mobile**: "Add to Home Screen" in browser
- **Desktop**: Install button in address bar (Chrome/Edge)
- **Result**: App appears in applications menu

---

### robots.txt (5 lines)

**Purpose**: SEO - Control search engine crawling

**Contents**:

```
User-agent: *
Allow: /
Disallow: /node_modules/
Sitemap: https://devakroy.github.io/devakroy.github.io/sitemap.xml
```

**Configuration**:

- **Allow**: All pages are crawlable (`/`)
- **Disallow**: Hide `node_modules/` from search engines
- **Sitemap**: Link to XML sitemap for indexing

**Search Engines**: Respected by Google, Bing, DuckDuckGo, etc.

**Testing**:

- Check: `site:devakroy.github.io` in Google Search
- Monitor: Google Search Console

---

### sitemap.xml (25 lines)

**Purpose**: SEO - XML sitemap for search engines

**URLs Included** (4 main sections):

```xml
<url>
  <loc>https://devakroy.github.io/devakroy.github.io/</loc>
  <lastmod>2026-02-12</lastmod>
  <priority>1.0</priority>
  <changefreq>weekly</changefreq>
</url>
```

**Priority Levels**:

- `1.0` - Home page (highest priority)
- `0.9` - Projects section
- `0.8` - Resume/Experience
- `0.7` - Skills
- `0.6` - Contact (lowest priority)

**Change Frequency**:

- `weekly` - Home, projects, experience
- `monthly` - Other sections

**Updates**:

- Manually maintained in `public/sitemap.xml`
- Reference in `robots.txt`
- Submit to Google Search Console

---

### \_headers (25 lines)

**Purpose**: Netlify security headers configuration

**Headers Configured**:

#### HSTS (Strict-Transport-Security)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

- Enforces HTTPS for 1 year
- Includes subdomains
- Preload in HSTS list

#### CSP (Content-Security-Policy)

```
default-src 'self'
script-src 'self' 'wasm-unsafe-eval'
style-src 'self' data:
font-src 'self' data:
img-src 'self' data: https:
connect-src 'self' <analytics-endpoint>
```

- Restricts resources to same-origin
- Allows inline styles (required for some libraries)
- Analytics connection allowed

#### X-Frame-Options

```
X-Frame-Options: DENY
```

- Prevents clickjacking
- Disallows framing in iframes

#### Permissions-Policy

```
geolocation=(), microphone=(), camera=()
```

- Disables unnecessary permissions
- Privacy protection

#### Cache Rules

**Assets (1 year)**:

```
/assets/*
  Cache-Control: public, immutable, max-age=31536000
```

- Versioned filenames (hash-based)
- Never changes - cache forever

**HTML (no-cache)**:

```
/*.html
  Cache-Control: no-cache
```

- Always validates freshness
- Prevents stale content

**Service Worker (1 hour)**:

```
/service-worker.js
  Cache-Control: max-age=3600
```

- Short cache to check for updates
- Allows SW version control

---

## 🔧 Configuration Usage

### Netlify Deployment

Configuration automatically applied when deploying to Netlify:

1. Upload to GitHub
2. Netlify detects changes
3. `_headers` file configures headers
4. Deployed with custom headers

### Local Development

Headers not applied locally (Vite dev server).
Test headers:

```bash
npm run build           # Build for production
npm run preview         # Preview with similar headers
curl -I http://localhost:4173  # Check headers (not all shown)
```

### GitHub Pages

GitHub Pages doesn't use `_headers` file.
Instead, uses default security headers.
View current headers:

```bash
curl -I https://devakroy.github.io
```

---

## 📦 Asset Files

### Images

**Profile Picture** (`profilepic`)

- Size: 105-114 KB (JPEG)
- Used in PWA manifest (192x192, 512x512)
- Multiple sizes for different contexts

### Fonts

**FontAwesome Fonts**

- `fa-solid-900.woff2` - 114.74 KB
- `fa-brands-400.woff2` - 110.09 KB
- `fa-regular-400.woff2` - 18.92 KB
- WOFF2 format (modern, compressed)
- Cached for 1 year (immutable)

---

## 🔄 Production Build

### Static Files Copying

Vite copies all `public/` files to `dist/`:

```
build command:
  vite build
  → copies everything from public/ to dist/
  → outputs to dist/index.html, dist/manifest.json, etc.
```

### File Names

**Hash-based Versioning**:

- `index-C9iJwWcL.js` - Changes when code changes
- `style-afAOOg9F.css` - Changes when styles change
- Enables long-term caching

**Static Files**:

- `manifest.json` - Stays same name
- `robots.txt` - Stays same name
- `service-worker.js` - Stays same name (but short-cached)

---

## 🧪 Verification

### Service Worker Status

```javascript
// Check in browser console
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then((reg) => console.log(reg || 'No SW'));
}
```

### Security Headers

```bash
# Check headers on production
curl -I https://devakroy.github.io

# Should see:
# Strict-Transport-Security: ...
# Content-Security-Policy: ...
# X-Frame-Options: DENY
```

### Sitemap

```bash
# Verify sitemap is valid XML
curl https://devakroy.github.io/sitemap.xml | head -20
```

### PWA Installation

1. Visit site on mobile/desktop
2. Look for "Install" button or "Add to Home Screen"
3. Icon should show from manifest.json
4. App should launch in standalone mode

---

## 🔍 Troubleshooting

### Service Worker Not Registering

- Check browser DevTools (F12)
- Verify `service-worker.js` exists
- Clear cache and reload
- Check console for errors

### PWA Not Installable

- Manifest.json must have icons
- Start URL must be valid
- HTTPS required (not http://)
- Manifest linked in index.html

### Headers Not Applied

- Only works on Netlify deployment
- GitHub Pages uses default headers
- Local dev server (vite) doesn't apply headers
- Use `npm run preview` for testing

### Cache Issues

- Assets: Cache based on content hash
- HTML: Always validates (no-cache)
- Service Worker: 1-hour cache (checks for updates)
- Clear cache: DevTools → Application → Storage → Clear Site Data

---

## 📚 Documentation

- **Architecture**: [../docs/technical/ARCHITECTURE.md](../docs/technical/ARCHITECTURE.md)
- **Deployment**: [../docs/guides/DEPLOYMENT_GUIDE.md](../docs/guides/DEPLOYMENT_GUIDE.md)
- **Project Structure**: [../docs/technical/PROJECT_STRUCTURE.md](../docs/technical/PROJECT_STRUCTURE.md)

---

**← Back to [root](../)**
