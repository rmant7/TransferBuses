import React from 'react'
import './SocialMedia.css'
import SocialButton from '../SocialButton/SocialButton.jsx'
// import { FaWhatsapp, FaPhone, FaTelegramPlane, FaViber} from 'react-icons/fa'
 import {  faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import {faWhatsapp, faTelegramPlane, faViber} from '@fortawesome/fontawesome-free-brands';
// import  FacebookMessenger  from './facebookmessenger.svg'


export default function SocialMedia() {
    console.log(faPhoneAlt)
    return (
        <div className='social-wrapper'>
        < SocialButton 
                href='https://wa.me/972524760015' 
                Icon={faWhatsapp} 
                classNameButton="social-button whats-but" classNameIcon='whatsapp' 
        ></SocialButton>

        < SocialButton 
                href='https://telegram.me/EvgenyStarchenko' 
                Icon={faTelegramPlane} 
                classNameButton="social-button teleg-but" classNameIcon='telegram' 
        ></SocialButton>

        < SocialButton 
                href='tel:+972524760015' 
                Icon={faPhoneAlt} 
                classNameButton="social-button phone-but" classNameIcon='phone'
                size="2x"
         ></SocialButton>

        < SocialButton 
                href='viber://add?number=972524760015' 
                Icon={faViber} 
                classNameButton="social-button viber-but"
                classNameIcon='viber-mb' 
        ></SocialButton>


            {/* <a href='https://wa.me/972524760015' rel="noreferrer" target='_blank'><FaWhatsapp className='whatsapp' /></a> */}

            {/* <a href='tel:+972524760015'><FaPhone className='phone' /></a>

            <a href="https://telegram.me/EvgenyStarchenko" rel="noreferrer" target='_blank'><FaTelegramPlane className='telegram' /></a>

            <a href="https://www.messenger.com/t/starchenkogin@mail.ru" rel="noreferrer" target='_blank'><img src={FacebookMessenger} className='facebook' alt='facebook messenger icon' /></a>

            <a href="viber://chat?number=+972524760015" rel="noreferrer" target='_blank'><FaViber className='viber' /></a>

            <a href="viber://add?number=972524760015"  ><FaViber className='viber-mb' /></a> */}

            
        </div>
    )
}
