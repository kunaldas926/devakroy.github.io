# Image Optimization Guide

## Current Setup

The portfolio implements lazy loading for the profile image to optimize performance.

## Image Optimization Techniques

### 1. **Lazy Loading**

Current implementation uses native lazy loading:

```html
<img
  src="data:image/svg+xml,%3Csvg..."
  data-src="images/profile/profilepic.jpeg"
  alt="Profile Picture"
  loading="lazy"
/>
```

**How it works**:

- Placeholder SVG loads immediately
- Actual image loads when user scrolls near it
- IntersectionObserver detects visibility

### 2. **Image Format Optimization**

#### Convert to WebP (25-30% reduction)

```bash
# Using ImageMagick
convert profilepic.jpeg -quality 80 profilepic.webp

# Using cwebp
cwebp profilepic.jpeg -q 80 -o profilepic.webp
```

#### Multi-format approach:

```html
<picture>
  <source srcset="images/profile/profilepic.webp" type="image/webp" />
  <img src="images/profile/profilepic.jpeg" alt="Profile" />
</picture>
```

**Size comparison**:
| Format | Size | Quality |
|--------|------|---------|
| JPEG (original) | ~150KB | 100% |
| JPEG (optimized) | ~60KB | 95% |
| WebP | ~40KB | 95% |
| AVIF | ~35KB | 95% |

### 3. **Responsive Images**

```html
<img
  sizes="(max-width: 768px) 100vw, 300px"
  srcset="
    images/profile/profilepic-sm.jpeg  300w,
    images/profile/profilepic-md.jpeg  600w,
    images/profile/profilepic-lg.jpeg 1200w
  "
  src="images/profile/profilepic-lg.jpeg"
  alt="Profile Picture"
/>
```

### 4. **Image Compression Tools**

#### Online Tools

- **Squoosh** (Google): https://squoosh.app/
- **TinyPNG/TinyJPG**: https://tinypng.com/
- **ImageOptim**: Mac Only
- **FileOptimizer**: Windows/Linux

#### Command-line Tools

```bash
# Install ImageMagick
brew install imagemagick

# Compress JPEG
convert profilepic.jpeg -quality 80 -strip profilepic-optimized.jpeg

# Convert to WebP
magick profilepic.jpeg -quality 80 profilepic.webp

# Batch convert to WebP
for file in images/profile/*.jpeg; do
  magick "$file" -quality 80 "${file%.jpeg}.webp"
done
```

### 5. **Recommended Images Setup**

**Recommended file organization**:

```
images/
├── profile/
│   ├── profilepic.jpeg          (original)
│   ├── profilepic-optimized.jpeg (~60KB)
│   └── profilepic-optimized.webp (~40KB)
├── projects/
│   ├── project1.jpeg
│   └── project1.webp
```

**Updated HTML**:

```html
<picture>
  <source srcset="images/profile/profilepic-optimized.webp" type="image/webp" />
  <img
    src="data:image/svg+xml,%3Csvg xmlns='...'%3E%3C/svg%3E"
    data-src="images/profile/profilepic-optimized.jpeg"
    alt="Arnab Kumar Roy Profile Picture"
    loading="lazy"
    width="300"
    height="300"
  />
</picture>
```

### 6. **Performance Impact**

| Optimization      | Impact                    |
|-------------------|---------------------------|
| Lazy loading      | ✅ 40% faster initial load |
| WebP format       | ✅ 30% smaller file size   |
| Responsive images | ✅ 50% savings on mobile   |
| Compression       | ✅ 60% size reduction      |
| Dimensions set    | ✅ Prevents layout shift   |

### 7. **Monitoring Image Performance**

Use Chrome DevTools:

1. **Network tab**: Check image sizes and load times
2. **Performance tab**: Record and analyze image loading impact
3. **Lighthouse**: Audit image optimization recommendations

```javascript
// Check image performance programmatically
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.initiatorType === 'img') {
      console.log(`Image ${entry.name}: ${entry.duration}ms`);
    }
  }
});
observer.observe({ entryTypes: ['measure', 'navigation'] });
```

## Next Steps

1. **Optimize profile image**:

   ```bash
   # Generate optimized versions
   convert images/profile/profilepic.jpeg -quality 80 images/profile/profilepic-optimized.jpeg
   convert images/profile/profilepic.jpeg -quality 80 -alpha off images/profile/profilepic-optimized.webp
   ```

2. **Update HTML**:
    - Use `<picture>` element
    - Add width/height attributes
    - Update `src` and `data-src`

3. **Test**:
    - Run Lighthouse audit
    - Check Network tab
    - Verify image loads correctly

## Tools & Resources

- **ImageMagick**: https://imagemagick.org/
- **Squoosh**: https://squoosh.app/
- **Sharp (Node.js)**: https://sharp.pixelplumbing.com/
- **Webpack Image Loader**: https://webpack.js.org/loaders/image-webpack-loader/

---

**Estimated savings**: 60-80KB per optimized image  
**Estimated load time improvement**: 200-500ms faster
