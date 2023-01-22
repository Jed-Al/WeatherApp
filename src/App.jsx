import './App.css';
import { useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, Input, InputGroup, Button } from 'reactstrap';

const API = {
  key: "eba8c85c702bdb0a237cff400b2cec80",
  url: "https://api.openweathermap.org/data/2.5/"
}

const isObjectEmpty = (objectName) => {
  return JSON.stringify(objectName) === "{}";
}

export default function App() {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const performSearch = () => {
    fetch(`${API.url}weather?q=${query}&units=metric&appid=${API.key}`)
      .then(res => res.json())
      .then((response) => {
        let details = {
          name: response.name,
          feelsLike: `${Math.round(response.main.feels_like)}°C`,
          humidity: response.main.humidity,
          pressure: response.main.pressure,
          temp: `${Math.round(response.main.temp)}°C`,
          tempMin: `${Math.round(response.main.temp_min)}°C`,
          tempMax: `${Math.round(response.main.temp_max)}°C`,
          weatherDescription: response.weather[0].description,
          id: response.weather[0].id
        }
        setWeather(details);
      })

  }


  return (
    <div className="App">
      <InputGroup>
        <Input
          className="search"
          placeholder="Enter city name"
          onKeyDown={e => {
            if (e.key ==="Enter"){
              performSearch()
            }
          }}
          onChange={e => setQuery(e.target.value)}
          value={query} />
        <Button onClick={performSearch}>
          Search
        </Button>
      </InputGroup>
      <Card inverse>
        <CardImg
          alt="lighting"
          src="flashPurple.jpg"
          style={{
            height: "100%"
          }}
          width="70%"
        />
        <CardImgOverlay>
          <CardTitle tag="h5">
            {
              (isObjectEmpty(weather) )
              ? ("")
              : (weather.name)
            }
          </CardTitle>
          <CardText> {
            (isObjectEmpty(weather))
              ? ("")
              : (`Feels like: ${weather.feelsLike}, humidity: ${weather.humidity}%, pressure: ${weather.pressure}pa,
              temperature: ${weather.temp}, tempMax: ${weather.tempMax}, tempMin: ${weather.tempMin }` )
          }
          </CardText>
          <CardText>
            <small className="text-muted">
            {
              (isObjectEmpty(weather))
              ? ("No update")
              : (`${weather.weatherDescription}`)
            }
            </small>
          </CardText>
        </CardImgOverlay>
      </Card>
    </div>
  );
}


