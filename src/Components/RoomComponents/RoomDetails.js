import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const RoomDetails = () => {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const images = [
        {
            pic: "/images/vojtech-bruzek-Yrxr3bsPdS0-unsplash.jpg"
        }
    ]
    const navigate = useNavigate();

    const handleNextClick = () => {
        // Navigate to the Review page and pass the selected values as state
        navigate('/review', {
            state: {
                checkInDate,
                checkOutDate,
                roomType: 'YourRoomTypeHere',
                roomNumber: 'YourRoomNumberHere'
            }
        });
    };

    return (
        <div className="room-details">
            <header className="header">
                <button className="back-button">
                    <i className="fas fa-arrow-left"><FontAwesomeIcon icon={faBackward} className='icon' /></i> {/* Font Awesome back arrow */}
                </button>
                <h1 className='room-header'>Room Check in</h1>
                <div className="username-section">
                    <i className="fas fa-user-circle"><FontAwesomeIcon icon={faUserAlt} /></i> {/* Font Awesome user icon */}
                    <span>USERNAME</span>
                </div>
            </header>
            {images.map((image, index) => (
                <div className="room-image-container" key={index}>
                    <img src={image.pic} alt='' className="room-image" />
                </div>
            ))}


            <div className="action-buttons">
                <button className="action-button">Map</button>
                <button className="action-button">Photos</button>
                <button className="action-button">Call</button>
                <button className="action-button">Reviews</button>
            </div>

            <div className="date-picker">
                <div className="date-input">
                    <label htmlFor="check-in">Check In</label>
                    <input
                        type="date"
                        id="check-in"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                    />
                </div>
                <div className="date-input">
                    <label htmlFor="check-out">Check Out</label>
                    <input
                        type="date"
                        id="check-out"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                </div>
            </div>

            <footer className="footer-button">
                <button onClick={handleNextClick} className="continue-button">Continue</button>
            </footer>
        </div>
    );
};

export default RoomDetails;
