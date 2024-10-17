// AdminRoomSelection.js
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from '../../firebase';

const AdminRoomSelection = () => {
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(null); // Track the room being edited
    const [editFields, setEditFields] = useState({ txt: '', desc: '', pr: '', rat: '' }); // Editable fields

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

    const handleDelete = async (roomId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this room?");
        if (confirmDelete) {
            try {
                const roomRef = doc(db, 'rooms', roomId); // Use the Firestore instance directly from db
                console.log("Attempting to delete room with ID:", roomId); // Debugging: log the room ID
                await deleteDoc(roomRef); // Delete the document
                console.log("Room deleted successfully");
                alert("Room deleted successfully.");
                getData(); // Refresh the room list
            } catch (error) {
                console.error("Error deleting room:", error); // Log the error
                alert("Error deleting room: " + error.message); // Show error to the user
            }
        }
    };



    const handleEditClick = (room) => {
        setEditMode(room.id);
        setEditFields({ txt: room.txtVal, desc: room.desc, pr: room.pr, rat: room.rat });
    };

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
                <h3 className='head-greet'>Good to have you here <span>{userName} {surname}</span> :) </h3>
                <p className='head-greet'>What do you feel like doing today?</p>
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
                                <div className="room-actions">
                                    <button onClick={() => handleEditClick(value)}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(value.id)}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <footer className="button-footer">
                <button onClick={() => navigate('/')} className='home-button'>HOME</button>
                <button onClick={() => navigate('/dashboard')} className="back-button">BACK</button>
                <button onClick={() => navigate('/addroompage')} className='add-room-button'>ADD ROOM</button>
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
