# Frontend Developer Assessment

## 0. Before you begin

You have **48 hours** to solve this assessment.

You can work with any technology you want, but solutions in **React are preferred**. If you decide to work with anything else other than React or Vanilla JS, feel free to remove the whole project and start fresh, but make sure to add instructions on how to run your solution.

### Initialize the project

We have prepared a simple React app for you to begin with. To get it working, run the following commands in the root of this project:

```bash
npm install
npm run dev
```

You should then be able to access your code on [http://localhost:5173/](http://localhost:5173/)

If you decide to implement your solution, or part of it in a different technology, feel free to modify the project any way necessary.

**First make sure the application works**. If you have any time left after that, you may add styles or other improvements, but the main objective is to complete every task below.

Don't hesitate to come to us with any questions.

### Version control

Please follow these version control guidelines:

- Use a `main` branch as the base branch for the project
- For each task, create a separate commit
- You may create additional branches/commits as needed for tasks, sub-tasks, or features
- Include `.git` folder in the final zip file

---

## 1. Warmup

Feel free to just create a JavaScript file to solve this task, no need to implement it with React.

Add a button to an HTML5 page. When the button is pressed, print the first 50 numbers in the Fibonacci sequence (starting with 0, 1). Each number should be on a new line.

**Bonus**: Highlight prime numbers in a different color.

---

## 2. Working with the API

Solutions in React are preferred here, but not mandatory. You can also implement them in Vanilla JS.

You will work with two public APIs:

1. **REST Countries API**: https://restcountries.com/v3.1/region/europe
2. **Open-Meteo Weather API**: https://api.open-meteo.com/v1/forecast

### Task 2.1: Display Country Info

Display detailed information for one specific country (your choice from Europe).

Fetch data from: `https://restcountries.com/v3.1/name/{country_name}`

Display the following information:

- Flag image (large)
- Country name (common name)
- Capital city
- Population
- Region
- Languages (comma-separated list)

### Task 2.2: European Countries Dashboard

Create a search interface for European countries:

1. **Input box** for searching countries by name
2. **Display results** as a grid of cards showing:
   - Flag image (should be medium-sized with rounded corners)
   - Country name
   - Capital city
   - Population (formatted with thousands separators)

### Task 2.3: Weather Integration with Hover Details

For each country card from Task 2.2:

1. Fetch current weather data for the capital city using the Open-Meteo API
2. Display on each card:
   - Weather icon/emoji (☀️ sunny, ⛅ partly cloudy, ☁️ cloudy, ��️ rainy, ❄️ snowy)
   - Current temperature in °C

**Hover interaction**: When hovering over a country card, display an overlay with detailed weather information:

- Large flag image
- Country name and capital
- Current temperature
- Weather condition description
- Wind speed (km/h)
- Humidity (%)
- "Feels like" temperature

**Bonus**: Add the following features to enhance the dashboard:

- Sort countries by population (ascending/descending)
- Filter countries by language spoken (e.g., show only countries where English or German is spoken)
- Sort by temperature (coldest to warmest)

### API Usage Notes

**REST Countries API**:

- Europe region endpoint: `https://restcountries.com/v3.1/region/europe`
- Search by name: `https://restcountries.com/v3.1/name/{name}`
- No API key required

**Open-Meteo Weather API**:

- Endpoint: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature`
- No API key required
- You'll need to use the country's capital coordinates (available in the REST Countries API response as `capitalInfo.latlng`)

**Weather code mapping** (simplified):

- 0: Clear sky ☀️
- 1-3: Partly cloudy ⛅
- 45, 48: Fog/Mist ��️
- 51-67: Rain ��️
- 71-77: Snow ❄️
- 80-99: Rain showers/Thunderstorm ⛈️

### Technical Requirements

- Handle loading states while fetching data
- Handle errors gracefully (e.g., if a capital doesn't have coordinates)
- Make API calls efficient (avoid unnecessary requests)
- Responsive design is a plus

---

## 3. Add unit tests for components

Add unit tests for components that you have implemented.

**Make sure test coverage is at least 75%.**

Test important functionality such as:

- Component rendering
- API data handling
- User interactions
- Error states
- Loading states

---

## Evaluation Criteria

1. **Functionality**: Does the application work as described?
2. **Code Quality**: Clean, readable, maintainable code
3. **API Integration**: Proper handling of async operations, errors, and edge cases
4. **Testing**: Adequate test coverage with meaningful tests
5. **Git Usage**: Clear commit messages and proper branching
6. **UI/UX**: User-friendly interface (bonus points for polish)

Good luck!
