import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore/lite';
import { Link, useNavigate } from "react-router-dom";
import { db } from '../Components/firebase';

const Navbar = () => {
    const [user, setUser] = useState(null); // State to hold the user's info
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user); // Set the user object if logged in
                const uid = user.uid;

                // Fetch user data from Firestore
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserName(userData.userName);
                    setSurname(userData.surname);
                }
            } else {
                setUser(null); // Reset user state if not logged in
                setUserName('');
                setSurname('');
            }
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    const handleAuthAction = () => {
        const auth = getAuth();
        if (user) {
            // Sign out if user is signed in
            signOut(auth).then(() => {
                navigate("/login");
            }).catch((error) => {
                console.error(error);
            });
        } else {
            // Navigate to login if no user is signed in
            navigate("/login");
        }
    };

    return (
        <div className='navbar container'>
            <a href="/" className="logo">CoastalLivingHotels.com</a>

            <div className='nav-links'>
                {!user && <a href="/login">Login</a>}
                <a href="/">Home</a>
                <button onClick={handleAuthAction}>{user ? "Sign Out" : "Sign In"}</button>
                {user && <a href="/profile">User: {userName} {surname}</a>}
            </div>
        </div>
    );
}

export default Navbar;
