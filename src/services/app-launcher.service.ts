import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppLauncherService {
  // You'll need to determine the actual URL scheme for Augmont
  private readonly APP_STORE_URL = 'https://apps.apple.com/us/app/zoom-workplace/id546505307';
  
  private readonly APP_URL_SCHEME = 'zoomus://';
  constructor() {}
  
  openAugmontApp(): void {
    // Check if we're on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    if (isIOS) {
      this.launchAppOrStore();
    } else {
      // Handle Android or other platforms
      // You would use a similar approach with intent:// for Android
      window.location.href = this.APP_STORE_URL;
    }
  }

  private launchAppOrStore(): void {
    // Current time before attempting to open the app
    // const start = Date.now();
    
    // Timeout to check if app opens (typically 500-1000ms is enough)
    const timeout = 500;
    
    // Set up listener for page visibility change
    const visibilityChange = () => {
      // If page is hidden, app likely opened
      //@ts-ignore
      if (document.hidden || document.webkitHidden) {
        // Remove listeners
        document.removeEventListener('visibilitychange', visibilityChange);
        document.removeEventListener('webkitvisibilitychange', visibilityChange);
      }
    };
    
    // Add listeners for visibility change
    document.addEventListener('visibilitychange', visibilityChange);
    document.addEventListener('webkitvisibilitychange', visibilityChange);
    
    // Attempt to open the app
    window.location.href = this.APP_URL_SCHEME;
    
    // Set timeout to check if app opened
    setTimeout(() => {
      // If page is still visible after timeout, app didn't open
      //@ts-ignore
      if (!document.hidden && !document.webkitHidden) {
        // App not installed, redirect to App Store
        window.location.href = this.APP_STORE_URL;
      }
      
      // Remove listeners
      document.removeEventListener('visibilitychange', visibilityChange);
      document.removeEventListener('webkitvisibilitychange', visibilityChange);
    }, timeout);
  }
}