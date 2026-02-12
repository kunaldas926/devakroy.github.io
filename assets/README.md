# Assets Directory

Project-specific assets organized by category.

## 📁 Structure

```
assets/
├── resume/
│   └── README.md         # Resume documentation & links
├── images/
│   ├── profile/
│   │   └── README.md     # Profile images documentation
│   └── README.md         # Images organization guide
└── README.md             # This file
```

## 📄 Directory Guide

### resume/

Resume and CV resources.

**Contains**:

- Resume documents (PDF, Word, etc.)
- CV versions
- Cover letters

**Usage**:

- Download link in portfolio header
- Embedded in contact section
- Available in multiple formats

**Maintenance**:

- Update when experience changes
- Keep 2-3 recent versions
- Document versions in README.md

---

### images/

Application images and visual assets.

#### profile/

Profile photography and avatars.

**Image Types**:

- **Main Profile**: High-resolution portfolio photo (1200x1200px)
- **Avatars**: Multiple sizes (192x192, 512x512)
- **Thumbnails**: Social media sizes (200x200)

**File Formats**:

- **JPEG**: Optimal for photos (JPG compression)
- **WebP**: Modern format for faster loading
- **Include JPEG fallback** for browser compatibility

**Optimization**:

- Core Web Vitals: LCP, FID, CLS
- File size: Profile < 200KB ideally
- Format: JPEG → WebP (auto-select in browser)

**Usage**:

- Hero section: Main profile photo
- Navigation: Avatar in header
- Social profiles: Multiple dimensions
- PWA manifest: 192x192, 512x512 versions

**Attribution**:

- Professional photography credit if applicable
- License information if stock photo
- Model release form if required

---

## 🎨 Image Optimization

### Compression Tools

**Recommended**:

- **TinyPNG/TinyJPG**: Simple online compression (60% reduction)
- **ImageOptim**: Batch processing (macOS)
- **ImageMagick**: Command-line tool
- **FFmpeg**: Video & image conversion

### WebP Conversion

```bash
# Convert all JPEGs to WebP
for file in *.jpg; do
  ffmpeg -i "$file" "${file%.*}.webp"
done

# Or use cwebp tool:
cwebp profile.jpg -o profile.webp -q 80
```

### Image Srcset Pattern

```html
<picture>
  <source srcset="profile.webp" type="image/webp" />
  <img src="profile.jpg" alt="Profile" width="400" height="400" />
</picture>
```

---

## 📋 Asset Management

### File Naming Convention

```
{category}-{size}-{format}.{ext}

Examples:
- profile-main-1200x1200.jpg
- profile-avatar-512x512.webp
- profile-thumb-200x200.jpg
```

### Size Guidelines

| Use Case        | Width | Height | Quality |
|-----------------|-------|--------|---------|
| Hero Section    | 1200  | 1200   | High    |
| Avatar (header) | 48    | 48     | High    |
| PWA Icon        | 192   | 192    | High    |
| PWA Icon        | 512   | 512    | High    |
| Social Share    | 1200  | 630    | High    |
| Thumbnail       | 200   | 200    | Medium  |

### Version Control

**Don't commit large files**:

- Add `*.jpg`, `*.png` to `.gitignore`
- Use separate asset storage (CDN, cloud)
- Reference URLs in documentation

**Or compress heavily**:

- Max 100KB per image
- Use lossy compression

---

## 🔍 Asset Usage in Project

### In index.html

```html
<!-- Hero Profile -->
<picture>
  <source srcset="./assets/images/profile/profile-1200.webp" type="image/webp" />
  <img src="./assets/images/profile/profile-1200.jpg" alt="Arnab Kumar Roy" class="hero-img" />
</picture>

<!-- Navigation Avatar -->
<img src="./assets/images/profile/profile-48.jpg" alt="AKR" class="nav-avatar" />
```

### In CSS

```css
.profile-section {
  background-image: url('./assets/images/profile/profile-1200.jpg');
  background-size: cover;
  background-position: center;
}
```

### Lazy Loading

```html
<img src="./assets/images/profile/profile-1200.jpg" loading="lazy" alt="Profile" />
```

---

## 🚀 Performance

### Core Web Vitals Impact

| Metric                         | Impact             | Optimization               |
|--------------------------------|--------------------|----------------------------|
| LCP (Largest Contentful Paint) | Main profile image | Compress, WebP, prioritize |
| FID (First Input Delay)        | Not affected       | ...                        |
| CLS (Cumulative Layout Shift)  | Image dimensions   | Set width/height           |

### Recommendations

1. **Set image dimensions** - Prevents layout shift
2. **Use WebP with fallback** - Modern format + compatibility
3. **Lazy load below-fold** - `loading="lazy"`
4. **Compress aggressively** - Tools like TinyPNG
5. **Serve from CDN** - Faster delivery (optional)

### Measurement

```bash
# Run Lighthouse audit
npm run build
npm run preview
# Then run Chrome DevTools → Lighthouse
```

---

## 📥 Adding New Assets

### Steps

1. **Optimize the image**:
    - Resize to appropriate dimensions
    - Compress (target < 200KB for photos)
    - Convert to WebP if possible

2. **Place in correct folder**:
    - Profile images → `images/profile/`
    - Resume docs → `resume/`

3. **Name consistently**:
    - `profile-{size}.{ext}` format

4. **Update HTML references**:
    - Use `<picture>` tag for WebP support
    - Set alt text
    - Include width/height attributes

5. **Document in relevant README**:
    - Update `images/profile/README.md`
    - Add usage notes
    - Update size guidelines if needed

---

## 🔗 References

### Documentation Files

- **Media Guide**: [../docs/guides/MEDIA_GUIDE.md](../docs/guides/MEDIA_GUIDE.md)
- **Performance**: [../docs/technical/PERFORMANCE.md](../docs/technical/PERFORMANCE.md)
- **Static Assets**: [../public/README.md](../public/README.md)

### External Tools

- **TinyPNG**: https://tinypng.com
- **WebP Converter**: https://cloudconvert.com
- **Lighthouse**: https://developers.google.com/web/tools/lighthouse
- **ImageOptim**: https://imageoptim.com

---

## 📊 Asset Inventory

### Current Assets

| Category       | Type      | Count | Total Size | Status   |
|----------------|-----------|-------|------------|----------|
| Profile Images | JPEG/WebP | 3-4   | ~300 KB    | ✅ Active |
| Resume         | PDF/DOCX  | 1-2   | ~500 KB    | ✅ Active |

### Storage Strategy

- **Development**: Store locally in `assets/`
- **Production**: Option to move to CDN for faster delivery
- **Backup**: Keep original high-res files elsewhere
- **Versioning**: Name by date if multiple versions

---

**← Back to [root](../)**
