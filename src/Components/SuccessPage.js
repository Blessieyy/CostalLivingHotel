import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from './firebase';


const SuccessPage = () => {
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { room } = location.state || {}; // Ensure room is accessed safely

    const handleNextClick = () => {
        if (room) {
            navigate('/confirm', {
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

    return (
        <div className="success-page">
            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
            <h1>Payment Successful!</h1>
            <p>Thank you for your payment, {userName} {surname}. Your transaction has been completed successfully.</p>
            <button onClick={handleNextClick}>SEE DETAILS</button>
        </div>
    );
};

export default SuccessPage;
