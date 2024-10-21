import { faBackward, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from '../../firebase';




const RoomInfo = () => {
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const { room } = location.state; // Access the selected room

    const handleNextClick = () => {
        if (room) {
            navigate('/roomdetails', {
                state: {
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


    return (

        <div className="info-container">
            <header className="header-info">
                <button className="back-button">
                    <i className="fas fa-arrow-left"><FontAwesomeIcon icon={faBackward} className='icon' /></i> {/* Font Awesome back arrow */}
                </button>
                <h1 className='room-header'>Room Information</h1>
                <div className="username-section">
                    <i className="fas fa-user-circle"><FontAwesomeIcon icon={faUserAlt} /></i> {/* Font Awesome user icon */}
                    <span>{userName} {surname}</span>
                </div>
            </header>

            <div className='info-image-container'>
                <img className='info-image' src={room.imgUrl} alt={room.txtVal} />
                <div className='info-details'>
                    <h1>{room.txtVal}</h1>
                    <p>{room.desc}</p>
                    <p>Price: {room.pr}</p>
                    <p>Rating: {room.rat}</p>
                </div>
            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit massa sed sem maximus vehicula. Sed tristique nisi justo, et feugiat purus luctus ac. Duis congue risus in lacus ultricies, sed aliquet massa semper. Quisque egestas elit erat, sed porta magna laoreet vel. Morbi pulvinar ullamcorper elit, quis posuere justo sollicitudin sit amet. Maecenas pretium egestas ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tincidunt ornare ante et volutpat.</p>

            <button onClick={() => navigate('/roomselection')} className='home-button'>BACK</button>
            <button onClick={handleNextClick} className="back-button">BOOK</button>

        </div>
    );
};

export default RoomInfo;