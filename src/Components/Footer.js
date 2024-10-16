import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope'
import { faGamepad, faHouse, faX } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faPeace } from '@fortawesome/free-solid-svg-icons/faPeace'
import { faHand } from '@fortawesome/free-regular-svg-icons/faHand'

function Footer() {
    return (
        <div>
            <div className="footer container">
                <div className="footer-section">
                    <p className="tit">CoastalLivingHotelsSA.com</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                </div>
                <div className="footer-section">
                    <p className="tit">Contact Us</p>
                    <p><FontAwesomeIcon icon={faEnvelope} className='icon' />Email</p>
                    <p><FontAwesomeIcon icon={faPhone} className='icon' />Phone Number</p>
                    <p><FontAwesomeIcon icon={faHouse} className='icon' />Home Address</p>
                </div>
                <div className="footer-section">
                    <p className="tit">Socials</p>
                    <p><FontAwesomeIcon icon={faFacebook} className='icon' />Facebook</p>
                    <p><FontAwesomeIcon icon={faTwitter} className='icon' />Twitter</p>
                    <p><FontAwesomeIcon icon={faInstagram} className='icon' />Instagram</p>
                </div>

            </div>
            <div className='rights-section'>
                <p>&copy; 2024 | All Rights Reserved.</p>
                <p>Authoured by: Mogashoa wa Mathaveiya 12 <FontAwesomeIcon icon={faGamepad} className='icon' /></p>
            </div>
        </div>
    )
}

export default Footer