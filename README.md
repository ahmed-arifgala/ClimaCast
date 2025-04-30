# Project Description: ClimaCast - Weather Forecast Chatbot

**ClimaCast** is an interactive weather forecast chatbot that integrates with the OpenWeather API to provide users with real-time weather information and 5-day weather forecasts. The bot responds to various user queries regarding the current weather and future forecasts for any given city.

## Key Features:
- **Current Weather**: Retrieves and displays the current weather for a specific city, including temperature (in Celsius) and weather condition (e.g., clear sky, broken clouds).
- **5-Day Forecast**: Provides a 5-day weather forecast with detailed information such as the expected weather conditions and average temperature for each day.
- **Interactive Responses**: The bot generates rich content responses, such as accordion cards, to display weather data in an engaging way.
- **User-Friendly Interface**: Built to work seamlessly with Dialogflow for natural language processing and enhanced user interaction.

## Technical Stack:

### Backend:
- Built using **Node.js** and **Express** to handle API requests.
- Utilizes **Axios** to make HTTP requests to the OpenWeather API to fetch weather data.
- The application is structured to serve a static HTML file for a simple web interface.

### Weather Data:
- The bot retrieves data from the **OpenWeather API**, which provides accurate and up-to-date weather forecasts.
- The weather information includes current temperature, weather conditions, and forecast details over the next 5 days.

### Dialogflow Integration:
- The bot is integrated with **Dialogflow** for natural language processing, which allows users to interact with the bot in a conversational manner, asking questions about the weather.

### Frontend:
- Simple HTML interface for testing purposes, but designed to easily integrate with other frontend frameworks or applications.
- **Dialogflow Messenger** is used in the frontend to provide an interactive chat interface. It seamlessly connects to Dialogflow for processing natural language inputs and responding to weather-related queries.
- The frontend is set up to be tested locally, and **ngrok** is used to expose the local server to the internet. This allows the Dialogflow Messenger to interact with the bot even when the backend is running locally.

## How It Works:
1. Users ask for current weather or a forecast for any city through the chatbot.
2. **Dialogflow Messenger** handles the frontend interaction by displaying a chat window and sending the user’s queries to the backend.
3. The backend (Node.js server) receives the query, processes it, and calls the OpenWeather API to retrieve weather data for the specified city.
4. The bot then returns a response, which is formatted and displayed in an interactive way using rich content, such as accordion cards.
5. For forecasts, the data is shown with images, descriptions, and the weather condition for each day.

### Dialogflow Messenger Integration:
- The **Dialogflow Messenger** is added to the frontend as an HTML script tag, which loads the chatbot UI and connects it to the Dialogflow agent.
- This allows users to interact with the bot using natural language and receive responses directly in the chat interface.

### Use of ngrok:
- To test the application locally and make it accessible over the internet, **ngrok** is used. Ngrok exposes the local development server (running on `http://localhost:3000`) to the public internet, allowing Dialogflow Messenger to communicate with the bot even while it is running on a local machine.
- By running `ngrok http 3000`, a publicly accessible URL is generated, which is then configured in the Dialogflow agent to forward user requests.

## Installation and Setup:
1. Clone the repository to your local machine.
2. Run `npm install` to install the necessary dependencies.
3. Set up your `.env` file with your **OpenWeather API** key.
4. Run the application using `node app.js` and visit `http://localhost:3000` in your browser.
5. Use **ngrok** to expose the local server to the internet: `ngrok http 3000`.
6. Configure Dialogflow Messenger to point to the exposed ngrok URL for seamless interaction.

## Dependencies:
- `express`: A web framework for Node.js used to handle HTTP requests and route responses.
- `axios`: A promise-based HTTP client to make requests to the OpenWeather API.
- `body-parser`: Middleware to parse incoming request bodies in a format suitable for processing.
- `dotenv`: A zero-dependency module that loads environment variables from a `.env` file.

## Conclusion:
ClimaCast is a robust, interactive, and user-friendly chatbot that provides accurate weather information, making it an ideal solution for building conversational interfaces around weather forecasts. This project showcases how natural language processing, API integrations, and rich content can be combined to create a seamless user experience in a chatbot application. With the integration of **Dialogflow Messenger** for the frontend and the use of **ngrok** for local server exposure, ClimaCast is a powerful and flexible tool for building weather-based conversational bots.
