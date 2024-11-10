import { googleMapsService } from './googleMapsLoader';

export interface PlaceResult {
  name: string;
  location: string;
  rating: number;
  photos: string[];
  priceLevel?: number;
  reviews?: google.maps.places.Review[];
  address: string;
  phoneNumber?: string;
  website?: string;
}

class GooglePlacesService {
  private placesService: google.maps.places.PlacesService | null = null;

  async initialize(): Promise<void> {
    try {
      const google = await googleMapsService.load();
      // Create a dummy element for PlacesService (requirement from Google)
      const attributionsElement = document.createElement('div');
      attributionsElement.style.display = 'none';
      document.body.appendChild(attributionsElement);
      
      this.placesService = new google.maps.places.PlacesService(attributionsElement);
    } catch (error) {
      console.error('Failed to initialize Places service:', error);
      throw error;
    }
  }

  async searchNearbyOysterBars(location: google.maps.LatLng): Promise<PlaceResult[]> {
    if (!this.placesService) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      const request: google.maps.places.PlaceSearchRequest = {
        location,
        radius: 5000, // 5km radius
        keyword: 'oyster bar restaurant',
        type: 'restaurant'
      };

      this.placesService?.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const places = results.map(async (result) => {
            const details = await this.getPlaceDetails(result.place_id!);
            return {
              name: result.name!,
              location: result.vicinity!,
              rating: result.rating || 0,
              photos: result.photos?.map(photo => photo.getUrl()) || [],
              priceLevel: result.price_level,
              address: details.formatted_address || '',
              phoneNumber: details.formatted_phone_number,
              website: details.website
            };
          });

          Promise.all(places).then(resolve).catch(reject);
        } else {
          reject(new Error(`Places search failed: ${status}`));
        }
      });
    });
  }

  private getPlaceDetails(placeId: string): Promise<google.maps.places.PlaceResult> {
    return new Promise((resolve, reject) => {
      const request: google.maps.places.PlaceDetailsRequest = {
        placeId,
        fields: ['formatted_address', 'formatted_phone_number', 'website', 'reviews']
      };

      this.placesService?.getDetails(request, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          resolve(result);
        } else {
          reject(new Error(`Place details request failed: ${status}`));
        }
      });
    });
  }
}

export const googlePlacesService = new GooglePlacesService();