import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from '../firebase';

const RoomSelection = () => {
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // New state for search input
    const [filteredRooms, setFilteredRooms] = useState([]); // New state for filtered rooms

    const navigate = useNavigate();

    // Fetch room data from Firestore
    const getData = async () => {
        const valRef = collection(getFirestore(), 'rooms');
        const dataDb = await getDocs(valRef);
        const allData = dataDb.docs.map(val => ({ ...val.data(), id: val.id }));
        setData(allData);
        setFilteredRooms(allData); // Initialize filtered rooms to all data
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

    // Handle room click
    const handleRoomClick = (room) => {
        setSelectedRoom(room);
    };

    // Handle continue button click
    const handleContinueClick = () => {
        if (selectedRoom) {
            navigate('/roominfo', { state: { room: selectedRoom } }); // Pass selected room details to RoomDetails
        }
    };

    // Handle search query change
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter rooms based on search query
        const filtered = data.filter(room =>
            room.txtVal.toLowerCase().includes(query) ||
            room.desc.toLowerCase().includes(query)
        );
        setFilteredRooms(filtered);
    };

    return (
        <div className="room-selection">
            <header className="header">
                <button className="back-button" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faBackward} />
                </button>
                <h1 className="room-header">Room Selection</h1>
                <div className="username-section">
                    <i className="fas fa-user-circle" ><FontAwesomeIcon icon={faUserAlt} /></i> {/* Font Awesome user icon */}
                    <span className="username" onClick={() => navigate('/profile')}>{userName} {surname}</span>
                </div>
            </header>

            {/* Search bar for filtering rooms */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="room-list">
                {filteredRooms.map(value => (
                    <div
                        className={`room-card ${selectedRoom && selectedRoom.id === value.id ? 'selected' : ''}`}
                        key={value.id}
                        onClick={() => handleRoomClick(value)}
                    >
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
                    onClick={handleContinueClick}
                    className="continue-button"
                    disabled={!selectedRoom}
                >
                    CONTINUE
                </button>
            </footer>
        </div>
    );
};

export default RoomSelection;
