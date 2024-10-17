import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendar, faPhone, faTimes, faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const BookingConfirmation = () => {
    return (
        <div className="booking-container">
            {/* Header */}
            <header className="booking-header">
                <div className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className="hotel-info">
                    <h1>The Capital Zimbali Resort</h1>
                </div>
                <div className="username">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>USERNAME</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="booking-main">
                <div className="room-image">
                    <img src="/path-to-image/room-image.jpg" alt="Room" />
                </div>
                <div className="booking-details">
                    <div className="confirmation">
                        <span>Confirmed</span>
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className="hotel-name">
                        <h2>The Capital Zimbali Resort</h2>
                        <p>★★★★★</p>
                    </div>
                    <div className="room-info">
                        <h3>Executive Room</h3>
                        <p>Bed | Shower | Television | Air Conditioner</p>
                    </div>
                    <div className="booking-id">
                        <span>Booking ID: 011195</span>
                    </div>
                </div>

                <div className="booking-actions">
                    <button className="call-hotel">
                        Call Hotel
                    </button>
                    <button className="cancel-booking">
                        Cancel Booking
                    </button>
                </div>

                {/* Date Selection */}
                <div className="date-details">
                    <div className="check-in">
                        <label>Check In</label>
                        <div>
                            <span>12 Sept. 2024</span>
                            <FontAwesomeIcon icon={faCalendar} />
                        </div>
                    </div>
                    <div className="arrow">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                    <div className="check-out">
                        <label>Check Out</label>
                        <div>
                            <span>19 Sept. 2024</span>
                            <FontAwesomeIcon icon={faCalendar} />
                        </div>
                    </div>
                </div>

                <div className="business-info">
                    <p>Business</p>
                    <p>3 Rooms</p>
                </div>
            </main>

            {/* Footer */}
            <footer>
                <button className="home-button">Home</button>
            </footer>
        </div>
    );
};

export default BookingConfirmation;
