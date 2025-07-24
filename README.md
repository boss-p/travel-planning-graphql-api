# Travel Planning GraphQL API Documentation

## Overview

A scalable GraphQL API for travel planning that provides city suggestions, weather forecasts, and activity rankings based on weather conditions. Built with Node.js, Apollo Server v4, and TypeScript.

## Tech Stack

- **Runtime**: Node.js (v14+)
- **GraphQL Server**: Apollo Server v4
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Testing**: Jest with ts-jest
- **Development**: Nodemon, ts-node
- **External APIs**: Open-Meteo (Weather & Geocoding)
- **Automated Testing**: GitHub Actions Workflow to automate testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Clone Repository

```bash
git clone https://github.com/boss-p/travel-planning-graphql-api.git
cd travel-planning-graphql-api
```

### Installation

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

Access Apollo Explorer at `http://localhost:4000`

## Project Structure

```
GraphQL/
├── src/
│   ├── __tests__/           # Test files
│   │   ├── services/        # Service layer tests
│   │   │   ├── activityRankingService.test.ts     #
│   │   │   ├── searchCitiesService.test.ts        #
│   │   │   └── weatherForecastService.test.ts     #
│   │   ├── resolvers/       # Resolver tests
│   │   │   └── resolvers.test.ts     #
│   ├── resolvers/           # GraphQL resolvers
│   │   └── resolvers.ts     # Query handlers
│   ├── schema/              # GraphQL schema definitions
│   │   └── schema.ts        # Type definitions
│   ├── services/            # Business logic layer
│   │   ├── searchCitiesService.ts     # City search logic
│   │   ├── weatherForecastService.ts  # Weather API integration
│   │   └── activityRankingService.ts  # Activity scoring logic
│   ├── types/               # TypeScript type definitions
│   │   └── types.ts         # Shared types
│   └── index.ts             # Application entry point
├── jest.config.js           # Jest configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # This documentation
```

### Folder Descriptions

- **`src/`**: Main source code directory
- **`__tests__/`**: Unit tests with Jest, organized by layer
- **`resolvers/`**: GraphQL query handlers that delegate to services
- **`schema/`**: GraphQL type definitions and schema structure
- **`services/`**: Business logic and external API integrations
- **`types/`**: TypeScript interfaces and type definitions

## Features

- **City Search**: Dynamic city suggestions with geocoding
- **Weather Forecasts**: Hourly and daily weather data
- **Activity Rankings**: Weather-based activity recommendations for skiing, surfing, indoor/outdoor sightseeing

## API Usage

### City Suggestions

# Dynamic city suggestions based on partial or complete user input

```graphql
query {
  citySuggestions(query: "Johan") {
    id
    name
    latitude
    longitude
    timezone
    country_code
    country
    population
  }
}
```

### Weather Forecasts

# Weather forecasts for a selected city. The weather data for the current weather forecast and all the available hourly weather forecasts and / the available daily weather forecasts for that city

```graphql
# Fetch hourly weather forecasts
query {
  hourlyWeatherForecast(latitude: -26.20227, longitude: 28.04363) {
    timezone
    timezone_abbreviation
    current_weather {
      time
      temperature
      weather_code
      weather_description
      isDay
    }
    hourly_forecast {
      time
      temperature
      weather_code
      weather_description
    }
  }
}
```

```graphql
# Fetch daily weather forecasts
query {
  dailyWeatherForecast(latitude: -26.20227, longitude: 28.04363) {
    latitude
    longitude
    timezone
    timezone_abbreviation
    current_weather {
      time
      temperature
      weather_code
      weather_description
      isDay
    }
    daily_forecast {
      date
      temperature_min
      temperature_max
      weather_code
      weather_description
      wind_speed_max
      precipitation_sum
    }
  }
}
```

### Activity Rankings
# This service ranks 4 activities (Skiing, Surfing, Indoor sightseeing, Outdoor sightseeing) based on daily weather conditions for a selected city, using the forecast data retrieved from the weatherForecastService

```graphql

query {
  activityRankings(latitude: -26.20227, longitude: 28.04363) {
    date
    weatherSummary
    skiing {
      explanation
      score
    }
    surfing {
      explanation
      score
    }
    indoorSightseeing {
      explanation
      score
    }
    outdoorSightseeing {
      explanation
      score
    }
  }
}
```

## Architecture

### GraphQL Schema Design

**Clarity**: Schema uses descriptive type names and clear field definitions. Weather data is properly structured with separate types for current, hourly, and daily forecasts.

**Extensibility**: Modular type system allows easy addition of new weather parameters or activity types. Nullable fields provide flexibility for optional data.

**Domain Modeling**: Schema accurately represents travel planning domain with distinct entities (City, Weather, Activities) and their relationships.

### Code Quality

**Structure**: Clean separation with dedicated folders:

- `/schema` - GraphQL type definitions
- `/resolvers` - Query handlers
- `/services` - Business logic and external API integration
- `/types` - TypeScript type definitions

**Maintainability**:

- Single responsibility principle in services
- Consistent error handling patterns
- TypeScript for type safety
- Clear naming conventions

**Best Practices**:

- Dependency injection pattern
- Centralized error handling
- Input validation
- Proper HTTP status codes

### Architecture Patterns

**Separation of Concerns**:

- **Resolvers**: Handle GraphQL queries, delegate to services
- **Services**: Contain business logic, interact with external APIs
- **Types**: Define data contracts

**Scalability**:

- Stateless service design
- External API abstraction
- Configurable endpoints
- Environment-based configuration

**Testability**:

- Dependency injection for easy mocking
- Pure functions in business logic
- Clear service boundaries
- Isolated unit tests

## Testing Strategy

### Test Coverage

**Unit Tests**: 100% coverage of business logic

- Service layer testing with mocked HTTP calls
- Resolver testing with mocked services
- Error scenario coverage

**Tools Used**:

- **Jest**: Test framework with TypeScript support
- **axios-mock-adapter**: HTTP request mocking
- **ts-jest**: TypeScript compilation for tests

### Test Structure

```
src/__tests__/
├── services/
│   ├── searchCitiesService.test.ts
│   ├── weatherForecastService.test.ts
│   └── activityRankingService.test.ts
└── resolvers/
    └── resolvers.test.ts
```

### Test Quality

**Meaningful Tests**:

- Business logic validation
- Error handling verification
- Edge case coverage
- Integration between layers

**Test Scenarios**:

- Successful API responses
- Network failures
- Invalid input handling
- Data transformation accuracy

### Running Tests

```bash
npm test                    # Run all tests
npm test -- --coverage     # Run with coverage report
npm test -- --watch        # Watch mode for development
```

## Service Layer Details

### SearchCitiesService

- Integrates with Open-Meteo Geocoding API
- Handles city search with fuzzy matching
- Returns standardized city objects

### WeatherForecastService

- Fetches weather data from Open-Meteo API
- Transforms raw API responses to GraphQL schema
- Provides weather code descriptions

### ActivityRankingService

- Calculates activity scores based on weather conditions
- Uses domain-specific scoring algorithms
- Provides explanations for recommendations

## Error Handling

- **GraphQL Level**: Resolvers catch and log errors, return appropriate null/empty values
- **Service Level**: Services throw descriptive errors for upstream handling
- **HTTP Level**: Axios errors are caught and transformed to domain errors

## Configuration

Environment variables:

- `PORT`: Server port (default: 4000)
- External API endpoints are configurable in service classes

## Omissions & Trade-offs

- **Authentication**: No authentication mechanism is implemented. In a production environment, JWT or OAuth would be appropriate.
- **Caching**: No caching layer is implemented. For production, Redis or in-memory caching would improve performance.
- **Error Handling**: Basic error handling is implemented. A more robust error handling system with custom error types would be beneficial.
- **Logging**: Simple console logging is used. A proper logging system would be needed for production.
- **Rate Limiting**: No rate limiting for the OpenMeteo API. This could be an issue if the application scales.

## CI/CD Pipeline

### GitHub Actions Workflow

Automated testing is configured using GitHub Actions to ensure code quality and prevent broken code from being merged.

**Workflow Triggers**:
- Pull requests from `dev` → `staging`
- Pull requests from `staging` → `master`
- Only runs when changes are made to the `src/` folder

**Workflow Steps**:
1. Checkout code
2. Setup Node.js 18.x with npm caching
3. Install dependencies (`npm ci`)
4. Run Jest tests (`npm test`)
5. Fail workflow if any tests fail

**Branch Protection**:
To enforce test requirements:
1. Go to GitHub Settings → Branches
2. Add protection rules for `master` and `staging`
3. Enable "Require status checks to pass before merging"
4. Select "Run Tests" as required status check

**Benefits**:
- Prevents merging code with failing tests
- Saves CI resources by only running on source code changes
- Maintains code quality across development workflow

## Future Enhancements

With more time, I would add:

- **Caching Layer**: Add caching layer (Redis) to reduce API calls to OpenMeteoAdd caching layer (Redis)
- **Authentication**: Add authentication/authorization with JWT
- **Activity types**: Extend activity types
- **Historical data**: Add historical weather data
- **GraphQL Subscriptions**: For real-time weather updates
- **Input Validation**: More robust validation of user inputs
- **More Comprehensive Testing**: Integration tests and more unit tests
- **Documentation**: More detailed API documentation with examples
