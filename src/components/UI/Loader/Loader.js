import React from 'react';

import styles from './Loader.module.css';


const Loader = (props) => {

    // VARS
    let size;
    if (props.size === 'small') size = styles.sizeSmall;
    else if (props.size === 'big') size = styles.sizeBig;
    else size = styles.sizeDefault;

    let color;
    if (props.color === 'secondary') color = styles.secondary;
    else if (props.color === 'black') color = styles.black;
    else if (props.color === 'white') color = styles.white;
    else color = styles.primary;

    let loaderClasses = [styles.loader, size, color];


    //
    return (
        <div className={loaderClasses.join(' ')}>
            <svg className={styles.circular} viewBox="25 25 50 50">
                <circle className={styles.path} cx="50" cy="50" r="20"/>
            </svg>
        </div>
    );
    
}

export default Loader;