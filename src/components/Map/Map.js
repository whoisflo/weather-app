import React, { useContext }  from 'react';

import styles from './Map.module.css';


const { Translation } = require('../../language');
    
const Map = (props) => {
    
    // IMPORTS
    const { translate } = useContext(Translation);

    
    // FUNCTIONS


    //
    let content = <div className={styles.map}>
                        
                    </div>;

                
    // RENDER
    return content;
};

export default Map;