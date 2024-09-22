import { Loader } from '@googlemaps/js-api-loader';

const mapLoader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

export default mapLoader;