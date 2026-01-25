const MAX_WIDTH = 1280;
const MAX_HEIGHT = 720;
const JPEG_QUALITY = 0.8;

export async function compressImage(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      let { width, height } = img;
      
      if (width <= MAX_WIDTH && height <= MAX_HEIGHT) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
        return;
      }
      
      const aspectRatio = width / height;
      
      if (width > MAX_WIDTH) {
        width = MAX_WIDTH;
        height = Math.round(width / aspectRatio);
      }
      
      if (height > MAX_HEIGHT) {
        height = MAX_HEIGHT;
        width = Math.round(height * aspectRatio);
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      
      const compressedDataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
      
      console.log(`Image compressed: ${Math.round(dataUrl.length / 1024)}KB -> ${Math.round(compressedDataUrl.length / 1024)}KB`);
      
      resolve(compressedDataUrl);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = dataUrl;
  });
}
