import { Loader } from '@googlemaps/js-api-loader';

class GoogleMapsService {
  private loader: Loader | null = null;
  private isLoaded = false;
  private loadError: Error | null = null;
  private loadPromise: Promise<typeof google> | null = null;

  constructor() {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      this.loadError = new Error('Google Maps API key is missing');
      return;
    }

    this.loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
      authReferrerPolicy: "origin"
    });
  }

  async load(): Promise<typeof google> {
    if (this.loadError) {
      throw this.loadError;
    }

    if (this.isLoaded && window.google) {
      return window.google;
    }

    if (!this.loadPromise) {
      this.loadPromise = (async () => {
        try {
          if (!this.loader) {
            throw new Error('Google Maps loader not initialized');
          }
          
          await this.loader.load();
          this.isLoaded = true;
          return window.google;
        } catch (error) {
          this.loadError = error as Error;
          console.warn('Google Maps failed to load:', error);
          throw error;
        }
      })();
    }

    return this.loadPromise;
  }

  isInitialized(): boolean {
    return this.isLoaded && !this.loadError;
  }

  hasError(): boolean {
    return !!this.loadError;
  }
}

export const googleMapsService = new GoogleMapsService();