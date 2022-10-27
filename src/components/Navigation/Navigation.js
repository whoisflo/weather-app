import React, { useContext, useState }  from 'react';

import styles from './Navigation.module.css';

import Icon from '../UI/Icon/Icon';
import Loader from '../UI/Loader/Loader';
import Button from '../UI/Button/Button';


const { Translation } = require('../../language');
    
const Navigation = (props) => {
    
    // IMPORTS
    const { translate } = useContext(Translation);


    // FUNCTIONS
    const onChangeFormValue = event => {
        let text = event.currentTarget.value;
        props.setSearchInputData(text);
    };


    //
    let content = <div className={styles.navigation}>
                        <input type="text" placeholder={translate('lb_info_location')} value={props.searchInputData} onChange={e => onChangeFormValue(e)}></input>
                        <Button type="submit" onClick={props.onClickButtonSubmitSearch}><Icon type="iconMagnifier" color="white"></Icon></Button>
                    </div>;

                
    // RENDER
    return content;
};

export default Navigation;