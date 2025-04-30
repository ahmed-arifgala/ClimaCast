const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');

require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';


app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(bodyParser.json());

app.post('/weather_data', async (req, res) => {
    const intentName = req.body.queryResult.intent["displayName"]
    const city = req.body.queryResult.parameters['geo-city'];
  
    console.log(intentName)

    try {

        if (intentName === 'current_weather'   ) {
         
            const weather = await getCurrentWeather(city); 
            
            res.json({
                fulfillmentMessages: [
                    {
                        text: {
                            text: [
                                `The current weather for ${city} is ${weather.temperature}°C with ${weather.condition}.`
                            ]
                        }
                    }
                ]
            });
        
          } else if (intentName === 'forecast') {
            const forecastWeather = await getForecastWeather(city);
            
            const startDate = forecastWeather[0].date; 
            const endDate = forecastWeather[forecastWeather.length - 1].date; 
            
            const accordionItems = forecastWeather.map(day => ({
                type: "accordion",
                title: `${day.date}`,
                subtitle: `${(day.temperature - 273.15).toFixed(1)}°C, ${day.condition}`,  
                image: {
                    src: {
                        rawUrl: `https://openweathermap.org/img/wn/${day.icon}@2x.png` 
                    }
                },
                text: `Forecast for ${day.date}: Expect ${day.condition} with an average temperature of ${(day.temperature - 273.15).toFixed(1)}°C.`
            }));
        
            res.json({
                fulfillmentMessages: [
                    {
                        text: {
                            text: [
                                `Weather forecast for ${city} from ${startDate} to ${endDate}:`
                            ]
                        }
                    },
                    {
                        payload: {
                            richContent: [accordionItems]
                        }
                    }
                ]
            });
        }


    } catch (error) {
        console.error(error);
        res.json({
            fulfillmentMessages: [
                {
                    text: {
                        text: [
                            "Sorry, I couldn't retrieve current weather data. Please try again later."
                        ]
                    }
                }
            ]
        });
        
    }

    
  });
  

async function getCityCoordinates(city) {
    const url = `${GEO_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${WEATHER_API_KEY}`;
    const response = await axios.get(url);

    if (response.data.length === 0) {
        throw new Error('City not found');
    }

    return {
        lat: response.data[0].lat,
        lon: response.data[0].lon
    };
}

async function getCurrentWeather(city) {
    const coords = await getCityCoordinates(city);
    const url = `${BASE_URL}weather?lat=${coords.lat}&lon=${coords.lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);

    return {
        temperature: response.data.main.temp,
        condition: response.data.weather[0].description,
    };
}

async function getForecastWeather(city) {
    const coords = await getCityCoordinates(city);
    const url = `${BASE_URL}forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${WEATHER_API_KEY}`;
    const response = await axios.get(url);

    const dailyData = {};

    response.data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];

        if (!dailyData[date]) {
            dailyData[date] = {
                temps: [],
                conditions: []
            };
        }

        dailyData[date].temps.push(item.main.temp);
        dailyData[date].conditions.push(item.weather[0].description);
    });

    const result = Object.keys(dailyData).map(date => {
        const temps = dailyData[date].temps;
        const avgTemp = (temps.reduce((sum, t) => sum + t, 0) / temps.length).toFixed(1);

        return {
            date,
            temperature: avgTemp,
            condition: dailyData[date].conditions[0], 
            icon: response.data.list.find(item => item.dt_txt.includes(date)).weather[0].icon 

        };
    });

    return result.slice(0, 5); 
}

app.listen(3000, () => {
    console.log('Weather bot API listening on port 3000');
});
