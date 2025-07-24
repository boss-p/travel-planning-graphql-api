export type City = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string | any;
  timezone: string | any;
  country: string;
  population: number | any;
};

export type HourlyWeather = {
  time: string;
  temperature: number;
  weather_code: number;
  weather_description: string;
};

export type CurrentWeather = {
  temperature: number;
  weather_code: number;
  weather_description: string;
  time: string;
  isDay: boolean;
};

export type DailyWeather = {
  date: string;
  temperature_min: number;
  temperature_max: number;
  weather_code: number;
  weather_description: string;
  wind_speed_max: number;
  precipitation_sum: number;
};

export type HourlyWeatherForecast = {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  current_weather: CurrentWeather;
  hourly_forecast: HourlyWeather[];
};

export type DailyWeatherForecast = {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  current_weather: CurrentWeather;
  daily_forecast: DailyWeather[];
};

export type RankingScore = {
  explanation: string;
  score: number;
};

export type ActivityRankings = {
  date: string;
  skiing: RankingScore;
  surfing: RankingScore;
  indoorSightseeing: RankingScore;
  outdoorSightseeing: RankingScore;
  weatherSummary: string;
};
