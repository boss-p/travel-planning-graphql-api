import weatherForecastService from "./weatherForecastService";

import { DailyWeather, ActivityRankings, RankingScore, DailyWeatherForecast } from '../types/types';

class ActivityRankingService {
  async getActivityRankings(latitude: number, longitude: number): Promise<ActivityRankings> {
    try {
      const forecast: DailyWeatherForecast = await weatherForecastService.getDailyWeatherForecast(latitude, longitude);
      const todayForecast: DailyWeather = forecast.daily_forecast[0];

      return {
        date: todayForecast.date,
        skiing: this._calculateSkiingScore(todayForecast),
        surfing: this._calculateSurfingScore(todayForecast),
        indoorSightseeing: this._calculateIndoorScore(todayForecast),
        outdoorSightseeing: this._calculateOutdoorScore(todayForecast),
        weatherSummary: this._getWeatherSummary(todayForecast),
      };
    } catch (error) {
      console.error('Error getting activity rankings:', error);
      throw new Error('Failed to get activity rankings');
    }
  }

  private _calculateSkiingScore(forecast: DailyWeather): RankingScore {
    let score = 0;
    let explanation = '';

    if (forecast.temperature_max < 5) {
      score += 3;
      explanation += 'Cold temperatures are good for skiing. ';
    } else if (forecast.temperature_max < 10) {
      score += 1;
      explanation += 'Cool temperatures are acceptable for skiing. ';
    } else {
      explanation += 'Temperatures too warm for skiing. ';
    }

    if ([71, 73, 75, 77, 85, 86].includes(forecast.weather_code)) {
      score += 5;
      explanation += 'Snowy conditions are excellent for skiing. ';
    } else if (forecast.temperature_max < 0) {
      score += 2;
      explanation += 'Below freezing temperatures may preserve snow. ';
    }

    if (forecast.wind_speed_max > 30) {
      score -= 2;
      explanation += 'High winds can make skiing dangerous. ';
    }

    score = Math.max(1, Math.min(10, score));
    return { score, explanation: explanation.trim() };
  }

  private _calculateSurfingScore(forecast: DailyWeather): RankingScore {
    let score = 5;
    let explanation = '';

    if (forecast.temperature_max > 25) {
      score += 2;
      explanation += 'Warm temperatures are great for surfing. ';
    } else if (forecast.temperature_max > 15) {
      score += 1;
      explanation += 'Mild temperatures are good for surfing. ';
    } else {
      score -= 1;
      explanation += 'Cool temperatures are less ideal for surfing. ';
    }

    if (forecast.wind_speed_max > 10 && forecast.wind_speed_max < 25) {
      score += 2;
      explanation += 'Moderate winds can create good waves. ';
    } else if (forecast.wind_speed_max >= 25) {
      score -= 1;
      explanation += 'Strong winds may create choppy conditions. ';
    }

    if (forecast.precipitation_sum > 0 && forecast.precipitation_sum < 5) {
      score -= 1;
      explanation += 'Light rain may affect visibility. ';
    } else if (forecast.precipitation_sum >= 5) {
      score -= 2;
      explanation += 'Heavy rain can make surfing conditions poor. ';
    }

    score = Math.max(1, Math.min(10, score));
    return { score, explanation: explanation.trim() };
  }

  private _calculateIndoorScore(forecast: DailyWeather): RankingScore {
    let score = 5;
    let explanation = '';

    if (forecast.precipitation_sum > 5) {
      score += 3;
      explanation += 'Heavy precipitation makes indoor activities ideal. ';
    } else if (forecast.precipitation_sum > 0) {
      score += 2;
      explanation += 'Some precipitation makes indoor activities a good choice. ';
    }

    if (forecast.temperature_max > 30 || forecast.temperature_min < 0) {
      score += 2;
      explanation += 'Extreme temperatures make indoor activities more comfortable. ';
    }

    const badWeatherCodes = [45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99];
    if (badWeatherCodes.includes(forecast.weather_code)) {
      score += 2;
      explanation += 'Poor weather conditions favor indoor activities. ';
    }

    score = Math.max(1, Math.min(10, score));
    return {
      score,
      explanation: explanation.trim() || 'Standard conditions for indoor activities.',
    };
  }

  private _calculateOutdoorScore(forecast: DailyWeather): RankingScore {
    let score = 5;
    let explanation = '';

    if (forecast.temperature_max > 15 && forecast.temperature_max < 30) {
      score += 2;
      explanation += 'Pleasant temperatures for outdoor activities. ';
    } else if (forecast.temperature_max >= 30) {
      score -= 1;
      explanation += 'High temperatures may be uncomfortable for outdoor activities. ';
    } else if (forecast.temperature_max < 5) {
      score -= 2;
      explanation += 'Cold temperatures may limit outdoor enjoyment. ';
    }

    if (forecast.precipitation_sum === 0) {
      score += 3;
      explanation += 'No precipitation is ideal for outdoor sightseeing. ';
    } else if (forecast.precipitation_sum < 2) {
      score -= 1;
      explanation += 'Light precipitation may affect outdoor activities. ';
    } else {
      score -= 3;
      explanation += 'Significant precipitation makes outdoor activities difficult. ';
    }

    const goodWeatherCodes = [0, 1, 2];
    if (goodWeatherCodes.includes(forecast.weather_code)) {
      score += 2;
      explanation += 'Clear or partly cloudy skies are perfect for sightseeing. ';
    }

    if (forecast.wind_speed_max > 30) {
      score -= 2;
      explanation += 'Strong winds can make outdoor activities uncomfortable. ';
    }

    score = Math.max(1, Math.min(10, score));
    return { score, explanation: explanation.trim() };
  }

  private _getWeatherSummary(forecast: DailyWeather): string {
    return `${forecast.weather_description} with temperatures between ${forecast.temperature_min}°C and ${forecast.temperature_max}°C. ${
      forecast.precipitation_sum > 0 ? `Expected precipitation: ${forecast.precipitation_sum}mm.` : 'No precipitation expected.'
    } Wind speed: ${forecast.wind_speed_max}km/h.`;
  }
}

const activityRankingService = new ActivityRankingService();
export default activityRankingService;
