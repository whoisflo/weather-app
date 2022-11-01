import React, { useContext, useEffect }  from 'react';
import moment from 'moment';

import styles from './Forecast.module.css';

import Navigation from '../Navigation/Navigation';

import Clear from '../../assets/weatherImages/Clear.png'
import Clouds from '../../assets/weatherImages/Clouds.png'
import Drizzle from '../../assets/weatherImages/Drizzle.png'
import Fog from '../../assets/weatherImages/Fog.png'
import Rain from '../../assets/weatherImages/Rain.png'
import Snow from '../../assets/weatherImages/Snow.png'
import Thunderstorm from '../../assets/weatherImages/Thunderstorm.png'


const { Translation } = require('../../language');
    
const Forecast = (props) => {
    
    // IMPORTS
    const { translate } = useContext(Translation);


    //
    let weatherClasses = [styles.weatherGraphic]
    let filteredForecastList = props.forecastData.filter(forecast => forecast.dt_txt.match(/09:00:00/))
    let forecastList = filteredForecastList.map((item, index) => { 
        
        let weatherGraphic = null;  
        if (item.weather[0].main === 'Clear') {
            weatherClasses.push(styles.clear);
            weatherGraphic = <img src={Clear} className={weatherClasses.join(' ')}></img>;
        } 
        else if (item.weather[0].main === 'Clouds') {
            weatherClasses.push(styles.clouds);
            weatherGraphic = <img src={Clouds} className={weatherClasses.join(' ')}></img>;
        } 
        else if (item.weather[0].main === 'Drizzle') {
            weatherClasses.push(styles.drizzle);
            weatherGraphic = <img src={Drizzle} className={weatherClasses.join(' ')}></img>;
        } 
        else if (item.weather[0].main === 'Rain') {
            weatherClasses.push(styles.rain);
            weatherGraphic = <img src={Rain} className={weatherClasses.join(' ')}></img>;
        } 
        else if (item.weather[0].main === 'Thunderstorm') {
            weatherClasses.push(styles.thunderstorm);
            weatherGraphic = <img src={Thunderstorm} className={weatherClasses.join(' ')}></img>;
        } 
        else if (item.weather[0].main === 'Snow') {
            weatherClasses.push(styles.snow);
            weatherGraphic = <img src={Snow} className={weatherClasses.join(' ')}></img>;
        } 
        else {
            weatherClasses.push(styles.fog);
            weatherGraphic = <img src={Fog} className={weatherClasses.join(' ')}></img>;
        }

        return (
            <div key={index} className={styles.forecastItem}>
                {weatherGraphic}
                <p className={styles.date}>{moment(item.dt_txt).format("dddd")}</p>
                <p className={styles.temp}>{parseInt(item.main.temp)} &deg;C</p>
            </div>
        )
    });


    let content = <div className={styles.forecast}>
                        <h2>{translate('lb_info_forecast')}</h2>
                        <div className={styles.forecastList}>
                            {forecastList}
                        </div>
                        <Navigation 
                            searchError={props.searchError}
                            searchInputData={props.searchInputData}
                            setSearchInputData={props.setSearchInputData}
                            setCurrentSearchCity={props.setCurrentSearchCity}
                            onClickButtonSubmitSearch={props.onClickButtonSubmitSearch}
                            onClickButtonOwnLocation={props.onClickButtonOwnLocation}
                        />
                    </div>;

                
    // RENDER
    return content;
};

export default Forecast;
