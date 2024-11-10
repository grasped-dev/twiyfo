import { Loader } from '@googlemaps/js-api-loader';

let loader: Loader | null = null;
let isLoaded = false;

const loadGoogleMapsScript = async (): Promise<void> => {
  if (isLoaded) return;
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error('Google Maps API key is missing');
  }

  if (!loader) {
    loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"]
    });
  }

  try {
    await loader.load();
    isLoaded = true;
  } catch (error) {
    console.error('Failed to load Google Maps:', error);
    throw new Error('Failed to load Google Maps');
  }
};

export default loadGoogleMapsScript;