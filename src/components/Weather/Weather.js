import React, { useContext }  from 'react';

import styles from './Weather.module.css';


const { Translation } = require('../../language');
    
const Weather = (props) => {
    
    // IMPORTS
    const { translate } = useContext(Translation);

    
    // FUNCTIONS


    //
    let content = <div className={styles.weather}>
                        
                    </div>;

                
    // RENDER
    return content;
};

export default Weather;