import React, { useContext, useEffect, useState } from 'react';
import axios from './axios';

import styles from './App.css';

import Weather from './components/Weather/Weather';
import Forecast from './components/Forecast/Forecast';
import Navigation from './components/Navigation/Navigation';
import Loader from './components/UI/Loader/Loader';


const { Translation } = require('./language');

const App = props => {
    
    // IMPORTS
    const { translate } = useContext(Translation);


	// STATE
	const [latLong, setlatLong] = useState({'lat':null, 'long':null});
	const [defaultLatLong, setDefaultlatLong] = useState({'lat':'51.509865', 'long':'-0.118092'});

	const [isDefaultLocation, setIsDefaultLocation] = useState(false);
	const [weatherData, setWeatherData] = useState(null);
	const [forecastData, setForecastData] = useState(null);

	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdate, setIsUpdate] = useState(null);

	const [searchInputData, setSearchInputData] = useState('');
	const [currentSearchCity, setCurrentSearchCity] = useState(null);


	// EFFECTS
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				let cordinates = {...latLong};
				cordinates.lat = position.coords.latitude;
				cordinates.long = position.coords.longitude;
				setlatLong(cordinates);
			},
			err => {
				setIsLoading(false); 
				setIsDefaultLocation(true);
			}
		);	

		const interval = setInterval(() => {setIsUpdate(Date.now())}, 10000);
		return () => { clearInterval(interval); };

	}, []);


	//
	useEffect(() => {

		let promises = []; 
		if(currentSearchCity) {
			promises.push(
				getWeatherDataByLocation(searchInputData)
			)
			promises.push(
				getForecastDataByLocation(searchInputData)
			)

			Promise.all(promises).then(() => { setIsLoading(false); })
            .catch( err => { 
				setIsLoading(false); 
				setError(true); 
			});
		}
		else if(latLong.lat && latLong.long) {
			promises.push(
				getWeatherData(latLong)
			)
			promises.push(
				getForecastData(latLong)
			)

			Promise.all(promises).then(() => { setIsLoading(false); })
            .catch( err => { 
				setIsLoading(false); 
				setError(true); 
			});
		}
	}, [latLong, currentSearchCity, isUpdate]);

	//
	useEffect(() => {
		if(isDefaultLocation) {

			let promises = []; 
			promises.push(
				getWeatherData(defaultLatLong)
			)
			promises.push(
				getForecastData(defaultLatLong)
			)

			Promise.all(promises).then(() => { setIsLoading(false); })
            .catch( err => { 
				setIsLoading(false); 
				setError(true); 
			});
		}
	}, [isDefaultLocation]);


	// FUNCTIONS
    const getWeatherData = (latLong) => {
		axios.get(`/weather/?lat=${latLong.lat}&lon=${latLong.long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
			.then(resWeather => { setWeatherData(resWeather.data); })
	};

    const getForecastData = (latLong) => {
		axios.get(`/forecast/?lat=${latLong.lat}&lon=${latLong.long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
			.then(resForecast => { setForecastData(resForecast.data); })
	};

    const getWeatherDataByLocation = (searchString) => {
		axios.get(`/weather/?q=${searchString}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
			.then(resWeather => { setWeatherData(resWeather.data); })
	};
	
    const getForecastDataByLocation = (searchString) => {
		axios.get(`/forecast/?q=${searchString}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
			.then(resForecast => { setForecastData(resForecast.data); })
	};

    const onClickButtonSubmitSearch = event => {
		setCurrentSearchCity(searchInputData);
    };


	//
	let content;
	if (error) {
		content = <div className="weatherApp_wrapper">
						<div className="weatherApp">
							<h1>{translate('lb_info_error')}</h1>
						</div>
					</div>
	}
	else if (!isLoading && weatherData && forecastData) {
		content = <div className="weatherApp_wrapper">
							<div className="weatherApp">
								<Weather weatherData={weatherData} />
								<Forecast forecastData={forecastData.list} />
							</div>
							<Navigation 
								searchInputData={searchInputData}
								setSearchInputData={val => setSearchInputData(val)}
								onClickButtonSubmitSearch={event => onClickButtonSubmitSearch(event)}
							/>
						</div>
	}
	else {
		content = <Loader size="big" color="white"></Loader>;
	}


	// 
	return (content);
}

export default App;