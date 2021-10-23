import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';


function SocialButton({href, Icon, classNameButton, classNameIcon, size = "3x", style}) {
    console.log(href, Icon)
    return (
        <a href={href} className={classNameButton}   rel="noreferrer" target='_blank'>
            <FontAwesomeIcon 
            icon={ Icon } 
            size={size}
            style={{style}}
            spin={false}
            className={classNameIcon}/>
        </a>
    )
}

export default SocialButton
