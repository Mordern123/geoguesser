import { Loader } from '@googlemaps/js-api-loader';

class MapLoader {
  constructor() {
    this.loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places", "streetView"]
    });
    this.loadPromise = null;
  }

  load() {
    if (!this.loadPromise) {
      this.loadPromise = this.loader.load();
    }
    return this.loadPromise;
  }
}

const mapLoader = new MapLoader();
export default mapLoader;