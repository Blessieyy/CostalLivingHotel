// AdminRoomSelection.js
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from '../firebase';


const RoomSelection = () => {
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const getData = async () => {
        const valRef = collection(getFirestore(), 'rooms');
        const dataDb = await getDocs(valRef);
        const allData = dataDb.docs.map(val => ({ ...val.data(), id: val.id }));
        setData(allData);
    };

    useEffect(() => {
        getData();
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

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
    };

    return (
        <div className="room-selection">
            <header className="header">
                <button className="back-button" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faBackward} />
                </button>
                <h1 className="room-header">Room Selection</h1>
                <div className="username-section">
                    <span className="username">{userName} {surname}</span>
                </div>
            </header>

            <div className="room-list">
                {data.map(value => (
                    <div className={`room-card ${selectedRoom && selectedRoom.id === value.id ? 'selected' : ''}`}
                        key={value.id}
                        onClick={() => handleRoomClick(value)}>
                        <img className="room-image" src={value.imgUrl} alt={value.txtVal} />
                        <div className="room-details">
                            <h2 className="room-title">{value.txtVal}</h2>
                            <p className="room-description">{value.desc}</p>
                            <p className="room-price">Price: {value.pr}</p>
                            <p className="room-rating">Rating: {value.rat} ★</p>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="button-footer">
                <button onClick={() => navigate('/')} className='home-button'>HOME</button>
                <button onClick={() => navigate('/addrooms')} className="back-button">BACK</button>

                <button
                    onClick={() => navigate('/roominfo', { state: { room: selectedRoom } })} // Pass selected room details
                    className="continue-button"
                    disabled={!selectedRoom} // Disable until a room is selected
                >
                    CONTINUE
                </button>
            </footer>
        </div>
    );
};

export default RoomSelection;
