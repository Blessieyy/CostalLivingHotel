import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, deleteDoc, updateDoc, collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../firebase';
import Dashboard from '../../Dashboard';

const AdminRoomSelection = () => {
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(null); // Track the room being edited
    const [editFields, setEditFields] = useState({ txt: '', desc: '', pr: '', rat: '' });
    const [searchQuery, setSearchQuery] = useState(''); // New state for search input
    const [filteredRooms, setFilteredRooms] = useState([]); // New state for filtered rooms
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const valRef = collection(getFirestore(), 'rooms');
            const dataDb = await getDocs(valRef);
            const allData = dataDb.docs.map(val => ({ ...val.data(), id: val.id }));
            setData(allData); // Update the state with fetched data
        } catch (error) {
            console.error("Error fetching room data:", error);
            alert("Error fetching room data: " + error.message);
        }
    };

    useEffect(() => {
        getData();
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docSnap = await getDoc(doc(db, 'user', user.uid));
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

    // const handleDelete = async (roomId) => {
    //     const confirmDelete = window.confirm("Are you sure you want to delete this room?");
    //     if (confirmDelete) {
    //         try {
    //             const roomRef = doc(db, 'rooms', roomId);
    //             await deleteDoc(roomRef);
    //             alert("Room deleted successfully.");
    //             getData(); // Refresh the room list after deletion
    //         } catch (error) {
    //             console.error("Error deleting room:", error);
    //             alert("Error deleting room: " + error.message);
    //         }
    //     }
    // };

    // const handleEditClick = (room) => {
    //     setEditMode(room.id);
    //     setEditFields({ txt: room.txtVal, desc: room.desc, pr: room.pr, rat: room.rat });
    // };

    const handleSaveEdit = async (roomId) => {
        const roomRef = doc(getFirestore(), 'rooms', roomId);
        await updateDoc(roomRef, {
            txtVal: editFields.txt,
            desc: editFields.desc,
            pr: editFields.pr,
            rat: editFields.rat
        });
        alert("Room updated successfully.");
        setEditMode(null);
        getData(); // Refresh the room list
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
                <button className="back-button" onClick={() => navigate('/admin')}>
                    <FontAwesomeIcon icon={faBackward} />
                </button>
                <h1 className="room-header">Room Selection</h1>
                <div className="username-section">
                    <span className="username">{userName} {surname}</span>
                </div>
            </header>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="room-list">
                <h3 className='head-greet'>Good to have you here <span>{userName} {surname}</span> :) </h3>
                <p className='head-greet'>What do you feel like doing today?</p>

                {/* Pass data to the Dashboard component */}
                {/* <Dashboard
                    data={data}
                    handleEditClick={handleEditClick}
                    handleDelete={handleDelete}
                /> */}

                {data.map(value => (
                    <div className={`room-card ${selectedRoom && selectedRoom.id === value.id ? 'selected' : ''}`}
                        key={value.id}
                        onClick={() => handleRoomClick(value)}>
                        <img className="room-image" src={value.imgUrl} alt={value.txtVal} />
                        {editMode === value.id ? (
                            <div className="edit-room-details">
                                <input
                                    type="text"
                                    value={editFields.txt}
                                    onChange={(e) => setEditFields({ ...editFields, txt: e.target.value })}
                                    placeholder="Room Name"
                                />
                                <input
                                    type="text"
                                    value={editFields.desc}
                                    onChange={(e) => setEditFields({ ...editFields, desc: e.target.value })}
                                    placeholder="Description"
                                />
                                <input
                                    type="text"
                                    value={editFields.pr}
                                    onChange={(e) => setEditFields({ ...editFields, pr: e.target.value })}
                                    placeholder="Price"
                                />
                                <input
                                    type="text"
                                    value={editFields.rat}
                                    onChange={(e) => setEditFields({ ...editFields, rat: e.target.value })}
                                    placeholder="Rating"
                                />
                                <button onClick={() => handleSaveEdit(value.id)}>Save</button>
                                <button onClick={() => setEditMode(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div className="room-details">
                                <h2 className="room-title">{value.txtVal}</h2>
                                <p className="room-description">{value.desc}</p>
                                <p className="room-price">Price: {value.pr}</p>
                                <p className="room-rating">Rating: {value.rat} ★</p>
                                {/* <div className="room-actions">
                                    <button onClick={() => handleEditClick(value)}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(value.id)}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </button>
                                </div> */}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <footer className="button-footer">
                <button onClick={() => navigate('/admin')} className='home-button'>HOME</button>
                <button onClick={() => navigate('/dashboard')} className="back-button">BACK</button>
                <button onClick={() => navigate('/addroompage')} className='add-room-button'>ADD ROOM</button>
                <button onClick={() => navigate('/dashboard')} className='add-room-button'>Dashboard</button>
                <button
                    onClick={() => navigate('/adminroominfo', { state: { room: selectedRoom } })}
                    className="continue-button"
                    disabled={!selectedRoom}
                >
                    CONTINUE
                </button>
            </footer>
        </div>
    );
};

export default AdminRoomSelection;
