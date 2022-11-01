import React, { useContext, useEffect, useState } from 'react';
import axios from './axios';

import styles from './App.css';

import Weather from './components/Weather/Weather';
import Forecast from './components/Forecast/Forecast';
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

	const [searchError, setSearchError] = useState(false);
	const [searchInputData, setSearchInputData] = useState('');
	const [currentSearchCity, setCurrentSearchCity] = useState(null);


	// EFFECTS
	useEffect(() => {
		let ownLocationStorage = JSON.parse(localStorage.getItem('own_location'));
		if(ownLocationStorage) setlatLong(ownLocationStorage);
		else getCurrentPosition();

		// const interval = setInterval(() => {setIsUpdate(Date.now())}, 10000);
		// return () => { clearInterval(interval); };
	}, []);


	//
	useEffect(() => {
		setSearchError(false);

		let promises = []; 
		if(currentSearchCity) {
			promises.push(
				getWeatherDataByLocation(searchInputData)
			)
			promises.push(
				getForecastDataByLocation(searchInputData)
			)
		}
		else if(latLong.lat && latLong.long) {
			promises.push(
				getWeatherData(latLong)
			)
			promises.push(
				getForecastData(latLong)
			)
		}
		else if(isDefaultLocation) {

			promises.push(
				getWeatherData(defaultLatLong)
			)
			promises.push(
				getForecastData(defaultLatLong)
			)
		}

		Promise.all(promises).then(() => { setIsLoading(false); })
		.catch( err => { 
			setIsLoading(false); 
			setError(true); 
		});

	}, [latLong, currentSearchCity, isDefaultLocation, isUpdate]);


	// FUNCTIONS
    const getCurrentPosition = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				let cordinates = {...latLong};
				cordinates.lat = position.coords.latitude;
				cordinates.long = position.coords.longitude;
				setlatLong(cordinates);
				localStorage.setItem('own_location', JSON.stringify(cordinates))
			},
			err => {
				setIsLoading(false); 
				setIsDefaultLocation(true);
				localStorage.clear();
			}
		);	
	};

    const getWeatherData = (latLong) => {
		axios.get(`/weather/?lat=${latLong.lat}&lon=${latLong.long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY_ALT}`)
			.then(resWeather => { setWeatherData(resWeather.data); })
			.catch( err => { fetchDataError(err) } );
	};

    const getForecastData = (latLong) => {
		axios.get(`/forecast/?lat=${latLong.lat}&lon=${latLong.long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY_ALT}`)
			.then(resForecast => { setForecastData(resForecast.data); })
			.catch( err => { fetchDataError(err) } );
	};

    const getWeatherDataByLocation = (searchString) => {
		axios.get(`/weather/?q=${searchString}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY_ALT}`)
			.then(resWeather => { setWeatherData(resWeather.data); })
			.catch( err => { fetchDataError(err) } );
	};
	
    const getForecastDataByLocation = (searchString) => {
		axios.get(`/forecast/?q=${searchString}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY_ALT}`)
			.then(resForecast => { setForecastData(resForecast.data); })
			.catch( err => { fetchDataError(err) } );
	};

    const fetchDataError = () => {
		setSearchError(true);
		setCurrentSearchCity(null);
		setSearchInputData('');
	};


	// EVENTS
    const onClickButtonSubmitSearch = event => {
		setCurrentSearchCity(searchInputData);
		setSearchError(false);
    };

    const onClickButtonOwnLocation = event => {
		getCurrentPosition();
		setSearchError(false);
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
								<Forecast 
									forecastData={forecastData.list} 
								
									searchError={searchError}
									searchInputData={searchInputData}
									setSearchInputData={val => setSearchInputData(val)}
									setCurrentSearchCity={val => setCurrentSearchCity(val)}
									onClickButtonSubmitSearch={event => onClickButtonSubmitSearch(event)}
									onClickButtonOwnLocation={event => onClickButtonOwnLocation(event)}
								/>
							</div>
						</div>
	}
	else {
		content = <Loader size="big" color="white"></Loader>;
	}


	// 
	return (content);
}

export default App;