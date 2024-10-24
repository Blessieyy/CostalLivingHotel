
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';




const BookingDetails = () => {
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
        <div className="booking-details">
            <header className="header">
                <div className="header-left">
                    <button className="back-button"><FontAwesomeIcon icon={faBackward} />;</button>
                    <h1>Confimaion</h1>
                </div>
                <div className="header-right">
                    <p className="username"> <FontAwesomeIcon icon={faUserAlt} />
                        <span>{userName} {surname}</span></p>
                </div>
            </header>

            <div className="booking-info">
                <img
                    src="/images/chastity-cortijo-M8iGdeTSOkg-unsplash.jpg"
                    alt="hotel-room"
                    className="hotel-image"
                />
                <div className="booking-actions">
                    <button className="call-hotel">Call Hotel</button>
                    <span className="status">Confirmed &#x2714;</span>
                    <button className="cancel-booking">Cancel Booking</button>
                </div>


                <div className="booking-card">
                    <div className="hotel-info">

                        <div className="hotel-details">
                            <h2>The Capital Zimbali Resort</h2>
                            <h2>{room ? room.txtVal : 'Room not found'}</h2>
                            <h4>{room ? room.desc : 'Description not available'}</h4> {/* Use roomType here */}
                            <p>{room ? room.rat : 'Rating not available'}</p>
                        </div>
                        <p className="booking-id">Booking ID: </p>
                    </div>

                    <div className="booking-dates">
                        <div className="booking-item">
                            <input type="text" value={checkInDate || 'No check-in date allocated'} readOnly />
                        </div>
                        <div className="arrow">
                            <span>&rarr;</span>
                        </div>
                        <div className="booking-item">
                            <input type="text" value={checkOutDate || 'No check-out date allocated'} readOnly />
                        </div>
                    </div>


                    <div className="booking-details">
                        <p className="trip-type">Business</p>
                        <p className="rooms">3 Rooms</p>
                    </div>

                    <button className="home-button">HOME</button>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
