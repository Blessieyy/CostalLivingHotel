import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';

const RoomDetails = () => {
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { room } = location.state || {}; // Ensure room is accessed safely

    const handleNextClick = () => {
        if (room) {
            navigate('/review', {
                state: {
                    checkInDate,
                    checkOutDate,
                    room,
                },
            });
        }
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

    if (!room) {
        return <p>Room details not available.</p>; // Handle case where room is not passed or undefined
    }

    return (
        <div className="room-details">
            <header className="header">
                <button className="back-button">
                    <FontAwesomeIcon icon={faBackward} className="icon" onClick={() => navigate(-1)} />
                </button>
                <h1 className="room-header">Room Check In</h1>
                <div className="username-section">
                    <FontAwesomeIcon icon={faUserAlt} />
                    <span>{userName} {surname}</span>
                </div>
            </header>
            {/* Ensure room.imgUrl is available before rendering */}
            <div className="room-image-container">
                {room.imgUrl ? (
                    <img className='room-image' src={room.imgUrl} alt={room.txtVal} />
                ) : (
                    <p>Image not available</p>
                )}
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
                <button onClick={handleNextClick} className="continue-button">
                    Continue
                </button>
            </footer>
        </div>
    );
};

export default RoomDetails;
