import React, { useContext }  from 'react';
import moment from 'moment';

import styles from './Weather.module.css';

import Clear from '../../assets/weatherImages/Clear.png'
import Clouds from '../../assets/weatherImages/Clouds.png'
import Drizzle from '../../assets/weatherImages/Drizzle.png'
import Fog from '../../assets/weatherImages/Fog.png'
import Rain from '../../assets/weatherImages/Rain.png'
import Snow from '../../assets/weatherImages/Snow.png'
import Thunderstorm from '../../assets/weatherImages/Thunderstorm.png'


const { Translation } = require('../../language');
    
const Weather = (props) => {
    
    // IMPORTS
    const { translate } = useContext(Translation);


    //
    let weatherGraphic = null;
    if (props.weatherData.weather[0].main === 'Clear') {
        weatherGraphic = <img src={Clear} className={styles.weatherGraphic}></img>;
    } 
    else if (props.weatherData.weather[0].main === 'Clouds') {
        weatherGraphic = <img src={Clouds} className={styles.weatherGraphic}></img>;
    } 
    else if (props.weatherData.weather[0].main === 'Drizzle') {
        weatherGraphic = <img src={Drizzle} className={styles.weatherGraphic}></img>;
    } 
    else if (props.weatherData.weather[0].main === 'Rain') {
        weatherGraphic = <img src={Rain} className={styles.weatherGraphic}></img>;
    } 
    else if (props.weatherData.weather[0].main === 'Thunderstorm') {
        weatherGraphic = <img src={Thunderstorm} className={styles.weatherGraphic}></img>;
    } 
    else if (props.weatherData.weather[0].main === 'Snow') {
        weatherGraphic = <img src={Snow} className={styles.weatherGraphic}></img>;
    } 
    else {
        weatherGraphic = <img src={Fog} className={styles.weatherGraphic}></img>;
    }


    //
    let content = <div className={styles.weather}>
                        <div className={styles.graphicContainerWrapper}>
                            <h2>{props.weatherData.name}</h2>

                            <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>

                            <div className={styles.graphicContainer}>
                                {weatherGraphic}
                                <div className={styles.graphicContainerInfo}>
                                    <p className={styles.temp}>{props.weatherData.main.temp} &deg;C</p>
                                    <p>{props.weatherData.weather[0].main}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.infoContainer}>
                            <div className={styles.infoContainerColumn}>
                                <p>{translate('lb_info_wind') + ': ' + props.weatherData.wind.speed} m/s</p>
                                <p>{translate('lb_info_humidity') + ': ' + props.weatherData.main.humidity} %</p>
                                <p>{translate('lb_info_sunrise') + ': ' + new Date(props.weatherData.sys.sunrise * 1000).toLocaleTimeString('de-de').slice(0, -3)}</p>
                            </div>
                            <div className={styles.infoContainerColumn}>
                                <p>{translate('lb_info_pressure') + ': ' + props.weatherData.main.pressure} hPa</p>
                                <p>{translate('lb_info_feels_like') + ': ' + props.weatherData.main.feels_like} %</p>
                                <p>{translate('lb_info_sunset') + ': ' + new Date(props.weatherData.sys.sunset * 1000).toLocaleTimeString('de-de').slice(0, -3)}</p>
                            </div>
                        </div>
                    </div>;


    // 
    return content;
};

export default Weather;
