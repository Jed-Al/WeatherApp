import { Input, InputGroup, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import mist from './images/mist.jpg';
import smoke from './images/smoke.jpg';
import fog from './images/fog.jpg';
import dust from './images/dust.jpg';
import tornado from './images/tornado.jpg';
import ash from './images/ash.jpg';
import squall from './images/squall.jpg';
import rain from './images/rainDrops.jpg';
import heavyRain from './images/heavyRain.jpg';
import lightRain from './images/lightShower.jpg';
import snow from './images/lightSnow.jpg';
import heavySnow from './images/snowfall1.jpg';
import sleet from './images/sleet.jpg';
import clearSky from './images/clearSky.jpg';
import brokenClouds from './images/brokenClouds.jpg';
import cloudySky from './images/cloudySky.jpg';
import fewClouds from './images/fewClouds.jpg';
import scatteredClouds from './images/scatteredClouds.jpeg';
import lightning from './images/flashPurple.jpg';
import thunderRain from './images/thunderstromRain.jpg'
import './Practice.css';

const API = {
  key: "eba8c85c702bdb0a237cff400b2cec80",
  url: "https://api.openweathermap.org/data/2.5/"
}

const isObjectEmpty = (objectName) => {
  return JSON.stringify(objectName) === "{}";
}

export default function Practice() {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [id, setId] = useState("");
  const [image, setImage] = useState("");

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
        setId(details.id);
        console.log(weather);
      })
      .catch(err => alert("City not found")
      )

  }

  useEffect(() => {
    switch (id) {
      case 200:
      case 201:
      case 202:
        setImage(thunderRain);
        break;
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        setImage(lightning);
        break;
      case 300:
      case 301:
      case 310:
      case 311:
      case 500:
      case 520:
        setImage(lightRain);
        break;
      case 313:
      case 321:
      case 501:
      case 521:
      case 511:
        setImage(rain);
        break;
      case 302:
      case 312:
      case 314:
      case 502:
      case 503:
      case 504:
      case 522:
      case 531:
        setImage(heavyRain);
        break;
      case 600:
      case 601:
        setImage(snow);
        break;
      case 602:
      case 620:
      case 621:
      case 622:
        setImage(heavySnow);
        break;
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
        setImage(sleet);
        break;
      case 800:
        setImage(clearSky);
        break;
      case 801:
        setImage(fewClouds);
        break;
      case 802:
        setImage(scatteredClouds);
        break;
      case 803:
        setImage(brokenClouds);
        break;
      case 804:
        setImage(cloudySky);
        break;
      case 701:
      case 721:
        setImage(mist);
        break;
      case 711:
        setImage(smoke);
        break;
      case 731:
      case 751:
      case 761:
        setImage(dust);
        break;
      case 741:
        setImage(fog);
        break;
      case 762:
        setImage(ash);
        break;
      case 771:
        setImage(squall);
        break;
      case 781:
        setImage(tornado);
        break;
      default:
        setImage("");
    }
  }, [id]);

  return (
    <div className="practice" style={{ backgroundImage: `url(${image})` }}>
      <div className="left">
        <div className="temp-container">
          <span className="temp">{
            (isObjectEmpty(weather))
              ? ("")
              : (weather.temp)
          }
          </span>
          <span className="city-name">{
            (isObjectEmpty(weather))
              ? ("")
              : (weather.name)
          }
          </span>
          {/* <h3>
          {
            (isObjectEmpty(weather))
              ? ("")
              : (`${weather.weatherDescription}`)
          }
        </h3> */}
        </div>
      </div>
      <div className="right">
        <InputGroup>
          <Input
            className="search"
            placeholder="Enter city name"
            onKeyDown={e => {
              if (e.key === "Enter") {
                performSearch()
              }
            }}
            onChange={e => setQuery(e.target.value)}
            value={query} />
          <Button onClick={performSearch}>
            Search
          </Button>
        </InputGroup>
        <h2>Weather details</h2>
        <span>
          {
            (isObjectEmpty(weather))
              ? ("")
              : (`Feels like:    ${weather.feelsLike}
                  humidity: ${weather.humidity}%, 
                  pressure: ${weather.pressure}pa, 
                  tempMax: ${weather.tempMax}, 
                  tempMin: ${weather.tempMin}, 
                  id: ${weather.id}`)
          }
        </span>
        <h3>
          {
            (isObjectEmpty(weather))
              ? ("No update")
              : (`${weather.weatherDescription}`)
          }
        </h3>
      </div>
    </div>
  );
}
