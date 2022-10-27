import React from 'react';

const Icon = (props) => {

    // VARS
    let color; 
    if (props.color === 'secondary') color = 'var(--secondary-color)';
    else if (props.color === 'white') color = '#fff';
    else if (props.color === 'black') color = '#000';
    else color = 'var(--primary-color)';

    let size; 
    if (props.size === 'small') size = 'width:12px; height:12px';
    else size = size = 'width:24px; height:24px';

    let iconElement;
    if (props.type === 'iconMagnifier') iconElement = <svg fill={color} viewBox="0 0 20 20"><path d="M8.55,0a8.56,8.56,0,1,0,5.32,15.25l.18-.14,4.68,4.68a.77.77,0,0,0,1.05,0,.75.75,0,0,0,.22-.53.73.73,0,0,0-.22-.52l-4.67-4.68.14-.18A8.56,8.56,0,0,0,8.55,0Zm0,15.62a7.06,7.06,0,1,1,7.06-7.06A7.07,7.07,0,0,1,8.55,15.62Z"/></svg>;
    else iconElement = '';

    
    //
    return (
        <i style={{size}}>{iconElement}</i>
    );

};

export default Icon;

