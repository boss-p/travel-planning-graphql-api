import axios from "axios";
import { WeatherForecast } from "../types/types"; // You can extend this file for matching types

// interface OpenMeteoApiResponse {
//   latitude: number;
//   longitude: number;
//   timezone: string;
//   timezone_abbreviation: string;
//   current_weather: {
//     temperature: number;
//     weathercode: number;
//     time: string;
//     is_day: number;
//   };
//   hourly: {
//     time: string[];
//     temperature_2m: number[];
//   };
// }

class WeatherForecastService {
  private forecastUrl = "https://api.open-meteo.com/v1/forecast";

  async getWeatherForecast(
    latitude: number,
    longitude: number
  ): Promise<WeatherForecast> {
    try {
      const response = await axios.get(this.forecastUrl, {
        params: {
          latitude,
          longitude,
          hourly: ["temperature_2m", , "weather_code"],
          current_weather: true,
          timezone: "auto",
        },
      });

      const {
        latitude: lat,
        longitude: lon,
        timezone,
        timezone_abbreviation,
        current_weather,
        hourly,
      } = response.data;

      const formattedCurrent = {
        time: current_weather.time,
        temperature: current_weather.temperature,
        weather_code: current_weather.weathercode,
        weather_description: this._getWeatherDescription(
          current_weather.weathercode
        ),
        isDay: current_weather.is_day === 1,
      };

      const hourlyData = hourly.time.map((time: string, index: number) => ({
        time,
        temperature: hourly.temperature_2m[index],
        weather_code: hourly.weather_code[index],
        weather_description: this._getWeatherDescription(
          hourly.weather_code[index]
        ),
      }));

      return {
        latitude: lat,
        longitude: lon,
        timezone,
        timezone_abbreviation,
        current_weather: formattedCurrent,
        hourly_forecast: hourlyData,
      };
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      throw new Error("Unable to retrieve weather forecast.");
    }
  }

  /**
   * Get weather description from code
   */
  private _getWeatherDescription(code: number): string {
    const weatherCodes: Record<number, string> = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };
    return weatherCodes[code] || "Unknown";
  }
}

const weatherForecastService = new WeatherForecastService();
export default weatherForecastService;
