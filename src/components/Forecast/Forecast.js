import React, { useContext, useEffect }  from 'react';
import moment from 'moment';

import styles from './Forecast.module.css';

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

    
    // FUNCTIONS


    //
    let filteredForecastList = props.forecastData.filter(forecast => forecast.dt_txt.match(/09:00:00/))
    let forecastList = filteredForecastList.map((item, index) => { 

        let weatherGraphic = null;  
        if (item.weather[0].main === 'Clear') {
            weatherGraphic = <img src={Clear} className={styles.weatherGraphic}></img>;
        } 
        else if (item.weather[0].main === 'Clouds') {
            weatherGraphic = <img src={Clouds} className={styles.weatherGraphic}></img>;
        } 
        else if (item.weather[0].main === 'Drizzle') {
            weatherGraphic = <img src={Drizzle} className={styles.weatherGraphic}></img>;
        } 
        else if (item.weather[0].main === 'Rain') {
            weatherGraphic = <img src={Rain} className={styles.weatherGraphic}></img>;
        } 
        else if (item.weather[0].main === 'Thunderstorm') {
            weatherGraphic = <img src={Thunderstorm} className={styles.weatherGraphic}></img>;
        } 
        else if (item.weather[0].main === 'Snow') {
            weatherGraphic = <img src={Snow} className={styles.weatherGraphic}></img>;
        } 
        else {
            weatherGraphic = <img src={Fog} className={styles.weatherGraphic}></img>;
        }

        return (
            <div key={index} className={styles.forecastItem}>
                {weatherGraphic}
                <p className={styles.date}>{moment(item.dt_txt).format("dddd")}</p>
                <p className={styles.temp}>{item.main.temp} &deg;C</p>
            </div>
        )
    });


    let content = <div className={styles.forecast}>
                        <h2>{translate('lb_info_forecast')}</h2>
                        <div className={styles.forecastList}>
                            {forecastList}
                        </div>
                    </div>;

                
    // RENDER
    return content;
};

export default Forecast;
