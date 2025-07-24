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

export type WeatherForecast = {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  current_weather: {
    temperature: number;
    weather_code: number;
    weather_description: string;
    time: string;
    isDay: boolean;
  };
  hourly_forecast: HourlyWeather[];
};

export type ActivityRanking = {
  activity: string;
  score: number;
};

export type ActivityRankings = {
  rankings: ActivityRanking[];
};
