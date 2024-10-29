import { faBackward, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';

const Review = () => {
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { checkInDate, checkOutDate, totalDays, room } = location.state || {};

    const handleNextClick = () => {
        navigate('/pay');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docSnap = await getDoc(doc(db, 'users', user.uid));
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserName(userData.userName);
                    setSurname(userData.surname);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="review-container">
            <header className="review-header">
                <button onClick={() => navigate('/roomdetails')} className="back-button">
                    <FontAwesomeIcon icon={faBackward} />
                </button>
                <h1>REVIEW</h1>
                <div className="username-section">
                    <i className="fas fa-user-circle" ><FontAwesomeIcon icon={faUserAlt} /></i> {/* Font Awesome user icon */}
                    <span className="username" onClick={() => navigate('/profile')}>{userName} {surname}</span>
                </div>
            </header>

            <div className="review-content">
                <div className="room-details">
                    <img className='room-image' src={room.imgUrl} alt={room.txtVal} />
                    <div className="details-text">
                        <h2>Review:</h2>
                        <h2>{room ? room.txtVal : 'Room not found'}</h2>
                        <h4>{room ? room.desc : 'Description not available'}</h4>
                        <p>{room ? room.rat : 'Rating not available'}</p>
                    </div>
                </div>

                <div className="booking-info">
                    <div className="booking-details">
                        <div className="booking-item">
                            <input type="text" value={checkInDate || 'No check-in date allocated'} readOnly />
                        </div>
                        <div className="booking-item">
                            <input type="text" value={checkOutDate || 'No check-out date allocated'} readOnly />

                        </div>
                        <div className="booking-item">

                        </div>
                    </div>

                    <div className="booking-price">
                        <p>Total Days: {totalDays || 0}</p> {/* Display total days */}

                        <p>Booking Price:</p>
                        <h2>{room ? room.pr : 'N/A'}</h2>
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
