import axios from "axios";
import { City } from "../types/types";

class SearchCitiesService {
  private geocodingBaseUrl = "https://geocoding-api.open-meteo.com/v1/search";
  
  //Search for cities based on a query string
  /**
   * @param {string} query - The search query
   * @returns {Promise<Array>} - Array of city objects
   */
  async searchCities(query: string): Promise<City[]> {
    try {
      const response = await axios.get(this.geocodingBaseUrl, {
        params: {
          name: query,
          count: 10,
          language: "en",
          format: "json",
        },
      });

      console.log(response);

      //   return an empty array if no results
      if (!response.data.results) {
        return [];
      }

      return response.data.results.map((city: any) => ({
        id: String(city.id),
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        timezone: city.timezone,
        country_code: city.country_code,
        country: city.country,
        population: city.population,
      }));
    } catch (error) {
      console.error("Error searching cities:", error);
      return [];
    }
  }
}
const searchCitiesService = new SearchCitiesService();
export default searchCitiesService;
