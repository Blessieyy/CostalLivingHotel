import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore/lite';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from '../Components/firebase'; // Make sure to correctly initialize firebase in this file

const Navbar = () => {
    const [userName, setUserName] = useState(''); // State to hold the user's name
    const [surname, setSurname] = useState('')

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                // Fetching user data from Firestore
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserName(userData.userName); // Set the user's first name
                    setSurname(userData.surname)
                }
            }
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    const navigate = useNavigate();

    const handleClick = async () => {
        const auth = getAuth();
        signOut(auth).then(() => {

            navigate("/login");

        }).catch((error) => {


            console.error(error);
        });
    };

    return (
        <div className='navbar container'>
            <a href="/" className="logo">CoastalLivingHotels.com</a>

            <div className='nav-links'>
                <a href="/login">Login</a>
                {/* <a href="/register">SignUp</a> */}
                <a href="/">Home</a>
                <button onClick={handleClick} >Sign Out</button>
                <a href="/profile">User: {userName} {surname} </a>
            </div>
        </div>
    );
}

export default Navbar;
