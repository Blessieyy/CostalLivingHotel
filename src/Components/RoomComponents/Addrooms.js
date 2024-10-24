import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import Navbar from "../Navbar";
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Addrooms = () => {
    const [userName, setUserName] = useState(''); // State to hold the user's name
    const [surname, setSurname] = useState('');  // State to hold the user's surname
    const [roomType, setRoomType] = useState('');
    const [roomNumber, setRoomNumber] = useState(1);
    const navigate = useNavigate();

    const handleNextClick = () => {
        navigate('/roomselection', {
            state: {
                roomType,
                roomNumber,
            },
        });
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                // Fetch user data from Firestore
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    console.log('User data from Firestore:', userData); // Log user data
                    setUserName(userData.userName); // Set the user's first name
                    setSurname(userData.surname); // Set the user's surname
                } else {
                    console.log('No such document!');
                }
            } else {
                console.log('No user signed in.');
            }
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    const handleIncrement = () => {
        setRoomNumber((prevRooms) => prevRooms + 1);
    };

    const handleDecrement = () => {
        if (roomNumber > 1) {
            setRoomNumber((prevRooms) => prevRooms - 1);
        }
    };

    return (
        <div className="hotel-search-container">
            <Navbar />
            <header className="header">
                {/* <img className='info-image' /> */}
                {userName && surname ? (
                    <h1>Oh Hi!, {userName} {surname} welcome back!</h1>
                ) : (
                    <h1>Welcome!</h1>
                )}
                <p>Let's see where you'll be comfortable :)</p>

            </header>

            <div className="form-section">
                {/* <div className="dropdown">
                    <label>Choose Room Type:</label>
                    <label>
                        <input
                            type="radio"
                            value="Resort"
                            checked={roomType === 'Resort'}
                            onChange={(e) => setRoomType(e.target.value)}
                        />
                        Resort
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Hotel"
                            checked={roomType === 'Hotel'}
                            onChange={(e) => setRoomType(e.target.value)}
                        />
                        Hotel
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Suite"
                            checked={roomType === 'Suite'}
                            onChange={(e) => setRoomType(e.target.value)}
                        />
                        Suite
                    </label> */}
                {/* </div> */}

                <label>No. of Rooms:</label>
                <button onClick={handleDecrement} disabled={roomNumber === 1}>-</button>
                <input type="number" value={roomNumber} readOnly />
                <button onClick={handleIncrement}>+</button>
            </div>

            <div className="search-button-container">
                <button onClick={handleNextClick} className="next-button">Next</button>
            </div>
        </div>
    );
};

export default Addrooms;
