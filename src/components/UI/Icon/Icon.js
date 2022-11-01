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
    else if (props.type === 'iconLocation') iconElement = <svg fill={color} viewBox="0 0 20 20"><path d="M10,7.37c-1.45,0-2.63,1.18-2.63,2.63s1.18,2.63,2.63,2.63,2.63-1.18,2.63-2.63-1.18-2.63-2.63-2.63Z"/><path d="M18.52,9.25h-2.08c-.35-2.98-2.72-5.35-5.7-5.7V1.48c0-.41-.34-.75-.75-.75s-.75,.34-.75,.75V3.55c-2.98,.35-5.35,2.72-5.7,5.7H1.48c-.41,0-.75,.34-.75,.75s.34,.75,.75,.75H3.55c.35,2.98,2.72,5.35,5.7,5.7v2.08c0,.41,.34,.75,.75,.75s.75-.34,.75-.75v-2.08c2.98-.35,5.35-2.72,5.7-5.7h2.08c.41,0,.75-.34,.75-.75s-.34-.75-.75-.75Zm-8.52,5.75c-2.75,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Z"/></svg>;
    else if (props.type === 'iconCross') iconElement = <svg fill={color} viewBox="0 0 20 20"><path d="M11.41,10l4.3-4.29a1,1,0,1,0-1.42-1.42L10,8.59,5.71,4.29A1,1,0,0,0,4.29,5.71L8.59,10l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L10,11.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>;
    else iconElement = '';

    
    //
    return (
        <i style={{size}}>{iconElement}</i>
    );

};

export default Icon;

