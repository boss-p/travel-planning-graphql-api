import activityRankingService from "../services/activityRankingService";
import searchCitiesService from "../services/searchCitiesService";
import weatherForecastService from "../services/weatherForecastService";
import { City, HourlyWeatherForecast, ActivityRankings, DailyWeatherForecast } from "../types/types";

export const resolvers = {
  Query: {
    //Get city suggestions based on user input
    /**
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

    // Get hourly weather forecast for a selected city
    /**
     * @param {number} latitude - The latitude
     * @param {number} longitude - The longitude
     * @returns {Promise<Object>} - Weather forecast data
     */
    hourlyWeatherForecast: async (
      _: any,
      { latitude, longitude }: { latitude: number; longitude: number }
    ): Promise<HourlyWeatherForecast | null> => {
      try {
        const forecasts = await weatherForecastService.getHourlyWeatherForecast(
          latitude,
          longitude
        );
        return forecasts;
      } catch (error) {
        console.error("Failed to fetch weather data: ", error);
        return null; // Return null if empty
      }
    },

    // Get daily weather forecast for a selected city
    /**
     * @param {number} latitude - The latitude
     * @param {number} longitude - The longitude
     * @returns {Promise<Object>} - Weather forecast data
     */
    dailyWeatherForecast: async (
      _: any,
      { latitude, longitude }: { latitude: number; longitude: number }
    ): Promise<DailyWeatherForecast | null> => {
      try {
        const forecasts = await weatherForecastService.getDailyWeatherForecast(
          latitude,
          longitude
        );
        return forecasts;
      } catch (error) {
        console.error("Failed to fetch weather data: ", error);
        return null; // Return null if empty
      }
    },

    // Get activity rankings based on weather forecast for a location
    /**
     * @param {number} latitude - The latitude
     * @param {number} longitude - The longitude
     * @returns {Promise<Object>} - Activity rankings data
     */
    activityRankings: async (
      _: unknown,
      args: { latitude: number; longitude: number }
    ): Promise<ActivityRankings | null> => {
      try {
        return await activityRankingService.getActivityRankings(args.latitude, args.longitude);
      } catch (error) {
        console.error("Failed to get activity rankings: ", error);
        return null;
      }
    }
  },
};

export default resolvers;
