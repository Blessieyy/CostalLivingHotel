import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Review = () => {
    // Use the useLocation hook to get location information
    const location = useLocation();
    // Destructure the roomType and roomNumber from the location state

    const { rooms } = location.state || { rooms: 'Not selected' }
    const { room } = location.state || { room: 'Not selected' }

    const { roomType, roomNumber, checkInDate, checkOutDate } = location.state || { roomType: 'Not selected', roomNumber: 'Not selected', checkInDate: 'no date allocated', checkOutDate: 'no date allocated' };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/roomdetails')
    }

    const handleNextClick = () => {
        // Navigate to the Review page and pass the selected values as state
        navigate('/pay')

    };

    const handleHomeClick = () => {
        navigate('/')
    }
    return (
        <div className="review-container">
            <header className="review-header">
                <button onClick={handleClick} className="back-button">
                    <FontAwesomeIcon icon={faBackward} />Back
                </button>
                <h2>REVIEW</h2>
            </header>

            <div className="review-content">
                <div className="room-details">
                    <img
                        src="/images/chastity-cortijo-M8iGdeTSOkg-unsplash.jpg"
                        alt="Room"
                        className="room-image"
                    />
                    <div className="details-text">
                        <h2>Review:</h2>
                        <h2>{room}</h2>
                        <h4>{roomType}</h4> {/* Use roomType here */}
                        <p>{rooms}</p>
                    </div>
                </div>

                <div className="booking-info">
                    <div className="booking-details">
                        <div className="booking-item">
                            <input type="text" value={`${roomType}`} readOnly />
                        </div>
                        <div className="booking-item">
                            <input type="text" value={`${roomNumber}`} readOnly />
                        </div>
                        <div className="booking-item">
                            <input type="text" value={`${checkInDate} `} readOnly />
                            <img src="calendar-icon.png" alt="" className="calendar-icon" />
                        </div>
                        <div className="booking-item">
                            <input type="text" value={`${checkOutDate} `} readOnly /> {/* Use roomNumber here */}
                        </div>
                    </div>

                    <div className="booking-price">
                        <p>Booking Price:</p>
                        <h2>[PRICE]</h2>
                    </div>

                    <div className="action-buttons">
                        <button onClick={handleHomeClick} className="home-button">HOME</button>
                        <button onClick={handleNextClick} className="confirm-button">CONFIRM</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
