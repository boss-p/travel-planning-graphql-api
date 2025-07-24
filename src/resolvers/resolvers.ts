import searchCitiesService from "../services/searchCitiesService";
import weatherForecastService from "../services/weatherForecastService";
import { City, WeatherForecast, ActivityRankings } from "../types/types";

export const resolvers = {
  Query: {
    /**
     * Get city suggestions based on user input
     * @param {Object} _ - Parent object (not used)
     * @param {Object} args - Query arguments
     * @param {string} args.query - The search query
     * @returns {Promise<Array>} - Array of city objects
     */
    citySuggestions: async (
      _: any,
      { query }: { query: string }
    ): Promise<City[]> => {
      try {
        const cities = await searchCitiesService.searchCities(query);
        return cities;
      } catch (error) {
        console.error("Error in citySuggestions:", error);
        return []; // Return an empty list instead of null
      }
    },

    // Get weather forecast for a selected city
    /**
     * Get weather forecast for a specific location
     * @param {number} latitude - The latitude
     * @param {number} longitude - The longitude
     * @returns {Promise<Object>} - Weather forecast data
     */
      weatherForecast: async (
        _: any,
        { latitude, longitude }: { latitude: number; longitude: number }
      ): Promise<WeatherForecast | null> => {
        try {
          const forecasts = await weatherForecastService.getWeatherForecast(
            latitude,
            longitude
          );
          return forecasts;
        } catch (error) {
          console.error("Failed to fetch weather data: ", error);
          return null; // Return an empty list instead of null
        }
      },

    // Get activity rankings based on weather forecast for a location
    // activityRankings: async (
    //   _: unknown,
    //   args: { latitude: number; longitude: number }
    // ): Promise<ActivityRankings> => {
    //   return await activityRankingService.getActivityRankings(args.latitude, args.longitude);
    // }
  },
};

export default resolvers;
