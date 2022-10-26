import React, { useContext }  from 'react';

import styles from './Forecast.module.css';


const { Translation } = require('../../language');
    
const Forecast = (props) => {
    
    // IMPORTS
    const { translate } = useContext(Translation);

    
    // FUNCTIONS


    //
    let content = <div className={styles.forecast}>
                        
                    </div>;

                
    // RENDER
    return content;
};

export default Forecast;