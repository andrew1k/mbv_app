/**
 * Image Preloading Utility
 * Preloads images to prevent layout shift and improve perceived performance
 */

/**
 * Preload a single image
 * @param {string} src - Image URL to preload
 * @returns {Promise} Resolves when image is loaded or rejected on error
 */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error('No image source provided'))
      return
    }

    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

/**
 * Preload multiple images in parallel
 * @param {string[]} srcs - Array of image URLs to preload
 * @returns {Promise} Resolves when all images are loaded
 */
export function preloadImages(srcs) {
  return Promise.all(srcs.map(preloadImage))
}

/**
 * Preload images with error handling and timeout
 * @param {string[]} srcs - Array of image URLs to preload
 * @param {number} timeout - Timeout in ms (default: 10000)
 * @returns {Promise} Resolves with results array
 */
export async function preloadImagesWithTimeout(srcs, timeout = 10000) {
  const promises = srcs.map(src =>
    Promise.race([
      preloadImage(src),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Image load timeout: ${src}`)), timeout)
      )
    ]).catch(err => {
      console.warn(err.message)
      return null
    })
  )

  return Promise.all(promises)
}

/**
 * Preload YouTube video thumbnail
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - Thumbnail quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres'
 * @returns {Promise}
 */
export function preloadYouTubeThumb(videoId, quality = 'standard') {
  const src = `https://img.youtube.com/vi/${videoId}/${quality === 'maxres' ? 'maxresdefault' : quality === 'standard' ? '0' : '1'}.jpg`
  return preloadImage(src)
}
