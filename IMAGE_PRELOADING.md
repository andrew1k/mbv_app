# Image Preloading Guide

## Problem Fixed
Your images were causing layout shifts (glitches) because the card wasn't reserving space while the image loaded. This is called Cumulative Layout Shift (CLS).

## Solutions Applied

### 1. ✅ Fixed Dimensions & Aspect Ratio (Primary Fix)
- Added `aspect-ratio="16/9"` to NewsCard images
- Added `aspect-ratio="9/16"` to StoryCard carousel
- Added `cover` prop for proper scaling
- **Result**: Cards reserve space before image loads, preventing layout shift

### 2. ✅ Loading Placeholders
- Added skeleton loaders in NewsCard template
- Enhanced StoryCard with proper carousel height (600px)
- **Result**: Better UX with visual feedback while images load

### 3. ✅ Browser Caching
- Added cache headers in index.html
- **Result**: Faster repeat visits

---

## How to Use Image Preloader Utility

### Basic Image Preloading
```vue
<script setup>
import { preloadImages } from '@/utils/imagePreloader'
import { onBeforeMount } from 'vue'

onBeforeMount(async () => {
  // Preload critical images
  await preloadImages([
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
  ]).catch(err => console.warn('Image preload failed:', err))
})
</script>
```

### In Pinia Store (for data fetching)
```javascript
import { preloadImages } from '@/utils/imagePreloader'

export const useContentStore = defineStore('content', () => {
  const items = ref([])

  async function fetchItems() {
    try {
      const response = await fetch('/api/items')
      items.value = await response.json()
      
      // Preload all images from fetched data
      const imageUrls = items.value.map(item => item.imageUrl)
      preloadImages(imageUrls).catch(err => console.warn('Preload failed:', err))
    } catch (error) {
      console.error('Fetch failed:', error)
    }
  }

  return { items, fetchItems }
})
```

### YouTube Thumbnails (for Sunday component)
```vue
<script setup>
import { preloadYouTubeThumb } from '@/utils/imagePreloader'
import { onBeforeMount } from 'vue'

const props = defineProps({
  sunday: Object
})

onBeforeMount(async () => {
  if (props.sunday?.id) {
    await preloadYouTubeThumb(props.sunday.id).catch(() => {})
  }
})
</script>
```

### Preload with Timeout (for unreliable connections)
```vue
<script setup>
import { preloadImagesWithTimeout } from '@/utils/imagePreloader'

onBeforeMount(async () => {
  // Will not block if images take longer than 5 seconds
  await preloadImagesWithTimeout([imageUrl1, imageUrl2], 5000)
})
</script>
```

---

## Best Practices

### ✅ DO
- Preload images **before** showing the component
- Use `aspect-ratio` on all image containers
- Set fixed heights on carousels and cards
- Use `eager` loading for above-the-fold images
- Add skeleton loaders for better UX

### ❌ DON'T
- Lazy load images above the fold (use `eager` instead)
- Skip aspect ratio on image components
- Preload too many images at once (causes network congestion)
- Ignore preload failures (wrap in try-catch)

---

## What Changed in Your Files

1. **NewsCard.vue**: Added aspect ratio, placeholder, and skeleton loader
2. **StoryCard.vue**: Fixed carousel height, added aspect ratio
3. **index.html**: Added caching headers
4. **imagePreloader.js**: New utility for image preloading

---

## Performance Tips

- Preload top 5-10 visible images on page load
- Use responsive images with `srcset` for different screen sizes
- Optimize image formats (WebP for modern browsers, JPG fallback)
- Consider image CDN with compression
- Set reasonable timeout for preloading (5-10 seconds)
