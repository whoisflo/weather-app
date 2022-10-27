import React from 'react';

import styles from './Button.module.css';

import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';


const Button = (props) => {

    // VARS
    let color;
    if (props.color === 'secondary') color = styles.secondary;
    else if (props.color === 'transparent') color = styles.transparent;
    else color = styles.primary;

    let size;
    if (props.size === 'width50') size = styles.width50;
    else if (props.size === 'width100') size = styles.width100;
    else size = styles.widthAuto

    let buttonClasses = [styles.button, size, color];
    let buttonText = (props.children) ? <p>{props.children}</p> : '';
    let buttonIcon = (props.icon) ? <Icon type={props.iconType} iconColor={props.iconColor}></Icon> : null;
    let buttonLoader = (props.loader) ? <Loader size={props.loaderSize} color={props.loaderColor}></Loader> : null;


    // 
    return (
        <button className={buttonClasses.join(' ')} type={props.type} title={props.title} onClick={props.onClick} disabled={props.disabled}>{buttonLoader}{buttonIcon}{buttonText}</button>
    );

};

export default Button;