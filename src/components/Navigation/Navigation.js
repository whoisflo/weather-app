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

    const onClickResetSearchInput = event => {
        props.setSearchInputData('');
        props.setCurrentSearchCity(null);
    };


    //
    let resetButton = (props.searchInputData !== '') ? <Button type="button" color="transparent" onClick={event => onClickResetSearchInput(event)}><Icon type="iconCross" color="primary"></Icon></Button> : null; 
    let searchError = (props.searchError) ? <p className={styles.error}>{translate('lb_info_search_error')}</p> : null;

    //
    let content = <div className={styles.navigation}>
                        <div className={styles.formItem}>
                            <input type="text" placeholder={translate('lb_info_location')} value={props.searchInputData} onChange={e => onChangeFormValue(e)}></input>
                            {resetButton}
                        </div>
                        <Button type="submit" onClick={props.onClickButtonSubmitSearch}><Icon type="iconMagnifier" color="white"></Icon></Button>
                        <Button type="button" onClick={props.onClickButtonOwnLocation}><Icon type="iconLocation" color="white"></Icon></Button>
                        {searchError}
                    </div>;

                
    // RENDER
    return content;
};

export default Navigation;