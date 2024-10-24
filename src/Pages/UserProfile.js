import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore/lite';
import { Link, useLocation, useNavigate } from "react-router-dom";

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, imgDb } from '../Components/firebase';
const UserProfile = () => {
    const [userName, setUserName] = useState(''); // State to hold the user's name
    const [surname, setSurname] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [isEditing, setIsEditing] = useState(false);
    const [newProfileImage, setNewProfileImage] = useState(null);

    const navigate = useNavigate();


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
                    setUserName(userData.userName);
                    setSurname(userData.surname);
                    setEmailAddress(userData.emailAddress);
                    setProfileImage(userData.profileImage || ""); // Load profile image if it exists
                }
            }
        })

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setNewProfileImage(e.target.files[0])
        }
    };

    const handleSaveProfile = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const uid = user.uid;
            let updatedProfileImageUrl = profileImage; // Use existing profile image URL

            // If a new profile image is selected, upload it to Firebase Storage
            if (newProfileImage) {
                const storageRef = ref(imgDb, `ProfileImage/${uid}`);
                await uploadBytes(storageRef, newProfileImage);
                updatedProfileImageUrl = await getDownloadURL(storageRef);
            }
            const updatedData = {
                userName,
                surname,
                emailAddress,
                profileImage: updatedProfileImageUrl,
            }
            await setDoc(doc(db, 'users', uid), updatedData, { merge: true });

            setIsEditing(false);
        }

    }
    return (
        <div><div className="profile-card">
            <div className="profile-header">
                <div className='profile-cover'>
                    <h1> {userName} {surname}</h1>
                </div>
                <div className="profile-image">
                    <img src="profile-image.png" /> {/* Replace with your image */}
                </div>

                <div className="profile-info">
                    <div>
                        <span>Email:</span>
                        <h3>{emailAddress}</h3>
                    </div>
                    <div>
                        <span>Bio</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div>
                        <span>Admin?</span>
                        <h3>yes</h3>
                    </div>
                </div>
            </div>

            <div className="activity-section">
                <h3>John's Activity</h3>
                <ul>

                </ul>
            </div>
        </div>
        </div>
    )

}



export default UserProfile