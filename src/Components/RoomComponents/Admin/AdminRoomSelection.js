
// RoomSelection.js
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
// import ImageUploadModal from '../ImageUploadModal'; // Ensure this is the correct import path
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { db, imgDb } from '../../firebase';

const AdminRoomSelection = () => {
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [img, setImg] = useState('');
    const [txt, setTxt] = useState('');
    const [desc, setDesc] = useState('');
    const [pr, setPr] = useState('');
    const [rat, setRat] = useState('');
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const handleUpload = (e) => {
        const file = e.target.files[0]; // Get the file
        if (file) {
            const imgs = ref(imgDb, `Imgs/${v4()}`); // Create a reference in Firebase storage

            // Upload the file and then get the download URL
            uploadBytes(imgs, file)
                .then(snapshot => {
                    console.log('File uploaded successfully:', snapshot);
                    return getDownloadURL(snapshot.ref); // Get the download URL
                })
                .then(url => {
                    console.log('Download URL:', url);
                    setImg(url); // Set the image URL in state
                })
                .catch(error => {
                    console.error("Error uploading file:", error);
                });
        } else {
            console.error("No file selected.");
        }
    };

    const handleClick = async () => {
        if (!txt || !desc || !pr || !rat || !img) {
            alert("Please fill out all fields, including the image.");
            return;
        }

        const valRef = collection(getFirestore(), 'rooms');
        await addDoc(valRef, {
            txtVal: txt,
            imgUrl: img,  // Save the image URL
            desc: desc,
            pr: pr,
            rat: rat
        });

        alert('Room Added Successfully');
        getData(); // Fetch the updated data
    };

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
                <button className="back-button" onClick={() => navigate('/addrooms')}>
                    <FontAwesomeIcon icon={faBackward} />
                </button>

                <h1 className="room-header">Room Selection</h1>
                <div className="username-section">
                    <span className="username">{userName} {surname}</span>
                </div>
            </header>

            <div className="room-list">
                <input onChange={(e) => setTxt(e.target.value)} placeholder='Room Name' />
                <input onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
                <input onChange={(e) => setRat(e.target.value)} placeholder="Rating" />
                <input onChange={(e) => setPr(e.target.value)} placeholder="Price" />
                <input type='file' onChange={(e) => handleUpload(e)} />
                <button onClick={handleClick}>Add</button>
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

            <footer className="button-foote">
                <button onClick={() => navigate('/')} className='home-button'>HOME</button>
                <button onClick={() => navigate('/dashboard')} className="back-button">BACK</button>
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

export default AdminRoomSelection;
