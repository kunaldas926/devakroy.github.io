# Profile Images

High-quality profile photography for the portfolio website at various sizes and formats.

## 📁 Contents

```
profile/
├── profile-main-1200x1200.jpg          # Hero section (large)
├── profile-main-1200x1200.webp         # Hero section (modern format)
├── profile-avatar-512x512.jpg          # PWA icon (medium)
├── profile-avatar-512x512.webp         # PWA icon (modern)
├── profile-avatar-192x192.jpg          # PWA icon (small)
├── profile-thumbnail-200x200.jpg       # Navigation avatar
└── README.md                            # This file
```

## 🖼️ Image Specifications

### Main Profile - 1200×1200

**Files**:

- `profile-main-1200x1200.jpg` (JPEG format)
- `profile-main-1200x1200.webp` (Modern WebP format)

**Specifications**:

- **Dimensions**: 1200 × 1200 pixels
- **Aspect Ratio**: 1:1 (square)
- **JPEG Size**: ~150 KB
- **WebP Size**: ~70 KB (50% smaller)
- **Quality**: High (Professional photography)

**Usage**:

- Hero section background
- Portfolio main image
- Social media sharing (open graph meta tag)
- Print-friendly version

**HTML Implementation**:

```html
<picture>
  <source srcset="./images/profile/profile-main-1200x1200.webp" type="image/webp" />
  <img
    src="./images/profile/profile-main-1200x1200.jpg"
    alt="Arnab Kumar Roy - AI/ML Software Engineer"
    width="1200"
    height="1200"
    class="profile-hero"
  />
</picture>
```

**CSS**:

```css
.profile-hero {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}
```

---

### PWA Icon - 512×512

**Files**:

- `profile-avatar-512x512.jpg` (JPEG format)
- `profile-avatar-512x512.webp` (Modern WebP format)

**Specifications**:

- **Dimensions**: 512 × 512 pixels
- **Aspect Ratio**: 1:1 (square)
- **JPEG Size**: ~40 KB
- **WebP Size**: ~20 KB
- **Quality**: High (must be sharp at any display density)

**Usage**:

- PWA app icon (large display)
- Home screen icon (desktop)
- "Add to Home Screen" installation
- App launcher in application menus

**Manifest.json Reference**:

```json
{
  "name": "Arnab Kumar Roy - Portfolio",
  "icons": [
    {
      "src": "./images/profile/profile-avatar-512x512.jpg",
      "sizes": "512x512",
      "type": "image/jpeg",
      "purpose": "any"
    },
    {
      "src": "./images/profile/profile-avatar-512x512.webp",
      "sizes": "512x512",
      "type": "image/webp",
      "purpose": "any"
    }
  ]
}
```

**Icon Requirements**:

- ✅ Square format (512×512)
- ✅ Clear subject (face/logo fills ~80% of canvas)
- ✅ No transparency needed (solid background)
- ✅ Legible at small sizes (test at 192×192)

---

### PWA Icon - 192×192

**File**:

- `profile-avatar-192x192.jpg` (JPEG format)

**Specifications**:

- **Dimensions**: 192 × 192 pixels
- **Aspect Ratio**: 1:1 (square)
- **File Size**: ~15 KB
- **Quality**: High (Android standard icon size)

**Usage**:

- Mobile home screen icon
- PWA installation icon (Android/Chrome)
- Standard web app icon size
- App drawer icon

**Manifest.json Reference**:

```json
{
  "icons": [
    {
      "src": "./images/profile/profile-avatar-192x192.jpg",
      "sizes": "192x192",
      "type": "image/jpeg"
    }
  ]
}
```

**Mobile Display**:

- Shows on home screen (usually 96×96 displayed)
- Shown in app drawer as full icon
- Used for PWA launcher shortcuts

---

### Thumbnail - 200×200

**File**:

- `profile-thumbnail-200x200.jpg` (JPEG only)

**Specifications**:

- **Dimensions**: 200 × 200 pixels
- **Aspect Ratio**: 1:1 (square)
- **File Size**: ~10 KB
- **Quality**: Medium (smaller file size acceptable)

**Usage**:

- Navigation header avatar
- Sidebar profile picture
- Social profile references
- Comment/post author images

**HTML Implementation**:

```html
<!-- Navigation avatar -->
<img
  src="./images/profile/profile-thumbnail-200x200.jpg"
  alt="AKR Avatar"
  width="48"
  height="48"
  class="nav-avatar"
/>

<!-- Note: Serving 200px image for 48px display is intentional
   - Provides better quality on high-DPI screens (2x, 3x)
   - Browser scales down automatically
   - CSS can constrain size -->
```

**CSS**:

```css
.nav-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}
```

---

## 📐 Size Scaling Reference

How each image appears at different display sizes:

| Image                 | 1200px      | 512px     | 200px     | 48px      |
|-----------------------|-------------|-----------|-----------|-----------|
| profile-main-1200     | ✅ Native    | 📉 Scaled | 📉 Scaled | 📉 Scaled |
| profile-avatar-512    | 📈 Upscaled | ✅ Native  | 📉 Scaled | 📉 Scaled |
| profile-avatar-192    | 📈 Upscaled | 📉 Scaled | 📉 Scaled | 📉 Scaled |
| profile-thumbnail-200 | 📈 Upscaled | 📉 Scaled | ✅ Native  | 📉 Scaled |

**Legend**:

- ✅ Native: Image at its native resolution (best quality)
- 📉 Scaled: Image reduced in size (quality degradation acceptable for small displays)
- 📈 Upscaled: Image enlarged (quality degradation, try to avoid)

---

## 🎨 Format Details

### JPEG Format (`.jpg`)

**Characteristics**:

- Lossy compression (some data discarded)
- Excellent for photographs
- ~60% smaller than PNG
- Universal browser support

**JPEG Compression Quality**:

- Quality 95 (default): Maximum quality, larger file
- Quality 85 (recommended): Good balance
- Quality 75: Acceptable for secondary images
- Quality 60: Lower quality, noticeably degraded

**Tools**:

- Export from Photoshop: Quality 8-9 (equivalent to 80-90)
- GIMP: Export as JPEG, quality 85-90
- macOS Preview: Export as JPEG automatically compresses to ~85

---

### WebP Format (`.webp`)

**Characteristics**:

- Modern format developed by Google
- ~30% smaller than JPEG at same quality
- Lower browser support (90%+)
- Recommended as primary format with JPEG fallback

**Quality Settings**:

- Quality 95: High quality, ~60KB for 1200px
- Quality 80 (recommended): Good balance, ~45KB
- Quality 70: Lower quality, ~35KB

**Conversion Tools**:

```bash
# Using cwebp (command line)
cwebp -quality 80 input.jpg -o output.webp

# Using FFmpeg
ffmpeg -i input.jpg -c:v libwebp -quality 80 output.webp

# Using ImageMagick
convert input.jpg -quality 80 output.webp

# Online: https://cloudconvert.com
```

---

## 📐 Responsive Image Strategy

### Current Approach

All images served at full size for all devices:

- Desktop: 1200px main image (appropriate)
- Tablet: 1200px image scaled down by browser (acceptable)
- Mobile: 1200px image scaled down by browser (works, but download unused pixels)

### Optimized Approach (Optional)

Use srcset for better performance:

```html
<img
  src="./images/profile/profile-main-1200x1200.jpg"
  srcset="
    ./images/profile/profile-main-400x400.jpg    400w,
    ./images/profile/profile-main-800x800.jpg    800w,
    ./images/profile/profile-main-1200x1200.jpg 1200w
  "
  sizes="
    (max-width: 480px) 100vw,
    (max-width: 768px) 80vw,
    1200px
  "
  alt="Arnab Kumar Roy"
  width="1200"
  height="1200"
/>
```

**Benefits**:

- Mobile downloads 400px image instead of 1200px (save ~70KB)
- Tablet downloads 800px image instead of 1200px (save ~40KB)
- Desktop still gets high-quality 1200px

**Trade-off**:

- Requires creating 3 image sizes
- More maintenance
- Marginal benefit for hero image (already shouldn't be too large)

---

## 🔍 Quality Verification Checklist

When updating profile images:

- ✅ **Dimensions correct**: 1200×1200 for main, 512×512 for PWA, etc.
- ✅ **File size optimized**: JPEG ~150KB, WebP ~70KB for main
- ✅ **No transparency**: Use solid background (JPEG can't do transparency)
- ✅ **Face/subject centered**: For icon recognition at small sizes
- ✅ **Lighting quality**: Professional, well-lit image
- ✅ **No compression artifacts**: Smooth gradients, no blockiness
- ✅ **Both JPEG and WebP provided**: For maximum compatibility
- ✅ **Alt text descriptive**: Not just "image", describe content

---

## 📸 Recommended Photo Specifications

### Portrait Composition

**Framing**:

- Head-and-shoulders composition (not just face)
- Face occupies ~50-60% of image
- Comfortable eye level (not looking up/down too much)
- Good distance (not too close, not too far)

**Lighting**:

- Soft, diffused lighting (avoid harsh shadows)
- Slight fill light (reduces shadows)
- Natural or studio lighting preferred
- No strong backlighting

**Background**:

- Neutral background (solid color or subtle gradient)
- Avoid busy/distracting elements
- Professional appearance
- Complements personal brand

**Color Tone**:

- Warm tone preferred (professional appearance)
- Good skin tone representation
- Color accuracy important
- Avoid excessive filters

---

## 📊 Performance Metrics

### File Size Breakdown

| Image     | JPEG       | WebP      | Savings |
|-----------|------------|-----------|---------|
| 1200×1200 | 150 KB     | 70 KB     | 53%     |
| 512×512   | 40 KB      | 20 KB     | 50%     |
| 192×192   | 15 KB      | 8 KB      | 47%     |
| 200×200   | 10 KB      | —         | —       |
| **Total** | **215 KB** | **98 KB** | **54%** |

### Load Time Savings

On 3G (3.0 Mbps):

| Scenario         | JPEG  | WebP  | Improvement    |
|------------------|-------|-------|----------------|
| Desktop (1200px) | 0.4s  | 0.2s  | **50% faster** |
| Mobile (all)     | 0.7s  | 0.3s  | **57% faster** |
| PWA Install      | 0.21s | 0.09s | **57% faster** |

---

## 🔧 Maintenance

### Updating Images

1. **Prepare new image**:
    - Get professional photo (selfie, professional shot, AI-generated, etc.)
    - Resize to each required size
    - Compress aggressively
    - Convert to WebP

2. **Replace files**:
    - Back up old images
    - Place new images in this folder
    - Use same naming convention

   ```bash
   profile-main-1200x1200.jpg
   profile-main-1200x1200.webp
   profile-avatar-512x512.jpg
   profile-avatar-512x512.webp
   profile-avatar-192x192.jpg
   profile-thumbnail-200x200.jpg
   ```

3. **Test**:
    - Build project: `npm run build`
    - Preview: `npm run preview`
    - Check all images load correctly
    - Verify no visual issues
    - Test on mobile device

4. **Commit changes**:
   ```bash
   git add images/profile/
   git commit -m "Update profile images"
   git push
   ```

---

## 📚 Documentation

**Related Files**:

- [../README.md](../README.md) - Images directory
- [../../assets/README.md](../../assets/README.md) - Assets overview
- [../../docs/technical/PERFORMANCE.md](../../docs/technical/PERFORMANCE.md) - Performance guide
- [../../docs/guides/DEPLOYMENT_GUIDE.md](../../docs/guides/DEPLOYMENT_GUIDE.md) - Deployment

---

## 🔗 External Resources

- **Image Optimization**: https://web.dev/image-optimization/
- **WebP Format**: https://developers.google.com/speed/webp
- **Picture Element**: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
- **Responsive Images**: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- **TinyPNG/TinyJPG**: https://tinypng.com
- **CloudConvert**: https://cloudconvert.com

---

**← Back to [images/](../)**
