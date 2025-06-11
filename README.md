# Weather App

A modern, responsive weather application built with React that provides real-time weather information and forecasts. The app includes PWA (Progressive Web App) support for offline functionality and can be installed on mobile devices.

## Features

- **Real-time Weather Data**: Get current weather conditions for any location
- **5-Day Forecast**: View detailed weather forecasts for the next 5 days
- **Geolocation Support**: Automatically detect and display weather for your current location
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Weather Information Displayed

- Current Temperature
- Feels Like Temperature
- Humidity
- Wind Speed and Direction
- Cloud Cover
- Sunrise and Sunset Times
- Daily High and Low Temperatures
- Weather Description with Icons

## Technologies Used

- React 18
- Axios for API calls
- Moment.js for time formatting
- OpenWeatherMap API
- Progressive Web App (PWA) features
- Local Storage for favorites
- CSS3 with Flexbox and Grid
- Responsive Design

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. For production build:
```bash
npm run build
serve -s build
```

## Usage

1. **Current Location Weather**:
   - Allow location access when prompted
   - The app will automatically display weather for your location

2. **Search Location**:
   - Type a city name in the search bar
   - Press Enter to get weather information

3. **Temperature Units**:
   - Click °C/°F buttons to toggle between Celsius and Fahrenheit

4. **Favorites**:
   - Click the star icon to add/remove locations from favorites
   - Access favorite locations from the favorites section

## PWA Features

The app can be installed on your device and works offline:

1. **Installation**:
   - On Chrome desktop: Click the install icon in the address bar
   - On mobile: Select "Add to Home Screen"

2. **Offline Support**:
   - Weather data is cached for offline access
   - Static assets are cached for app functionality without internet

## API Reference

This app uses the OpenWeatherMap API:
- Current Weather Data
- 5 Day / 3 Hour Forecast
- Geocoding for location search

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from OpenWeatherMap
- Font from Google Fonts (Montserrat)
