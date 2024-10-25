import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore/lite';
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, imgDb } from '../Components/firebase';


const UserProfile = () => {
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [profileImage, setProfileImage] = useState('public/profile-image.png');
    const [coverImage, setCoverImage] = useState('public/cover-image.jpg');
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [newCoverImage, setNewCoverImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserName(userData.userName);
                    setSurname(userData.surname);
                    setEmailAddress(userData.emailAddress);
                    setProfileImage(userData.profileImage || "public/profile-image.png");
                    setCoverImage(userData.coverImage || "public/cover-image.jpg");
                    setBio(userData.bio)
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const handleProfileImageChange = (e) => {
        if (e.target.files[0]) {
            setNewProfileImage(e.target.files[0]);
        }
    };

    const handleCoverImageChange = (e) => {
        if (e.target.files[0]) {
            setNewCoverImage(e.target.files[0]);
        }
    };

    const handleSaveProfile = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const uid = user.uid;
            let updatedProfileImageUrl = profileImage;
            let updatedCoverImageUrl = coverImage;

            if (newProfileImage) {
                const profileStorageRef = ref(imgDb, `ProfileImage/${uid}`);
                await uploadBytes(profileStorageRef, newProfileImage);
                updatedProfileImageUrl = await getDownloadURL(profileStorageRef);
            }

            if (newCoverImage) {
                const coverStorageRef = ref(imgDb, `CoverImage/${uid}`);
                await uploadBytes(coverStorageRef, newCoverImage);
                updatedCoverImageUrl = await getDownloadURL(coverStorageRef);
            }

            const updatedData = {
                userName,
                surname,
                emailAddress,
                profileImage: updatedProfileImageUrl,
                coverImage: updatedCoverImageUrl,
            };
            await setDoc(doc(db, 'users', uid), updatedData, { merge: true });
            setIsEditing(false);
        }
    };

    return (
        <div className="profile-card">
            <div></div>
            <div className="profile-cover" style={{ backgroundImage: `url('${coverImage}')` }}>
                <div className="profile-name">
                    <h1>{userName} {surname}</h1>
                </div>
            </div>
            <div className="profile-image">
                <img src={profileImage} alt="Profile" />
            </div>
            <div className="profile-info">
                <div>
                    <span>Email:</span>
                    <h3>{emailAddress}</h3>
                </div>
                <div>
                    <span>Bio:</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                </div>
                <div>
                    <span>Admin?</span>
                    <h3>Yes</h3>
                </div>
            </div>
            <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</button>
            {isEditing && (
                <div className="edit-section">
                    <h3>Edit Profile</h3>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Surname"
                    />
                    <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="Email"
                    />
                    <input type="file" onChange={handleProfileImageChange} />
                    <input type="file" onChange={handleCoverImageChange} />
                    <button onClick={handleSaveProfile}>Save Changes</button>
                </div>
            )}
            <div className="activity-section">
                <h3>{userName}'s Activity</h3>
                <ul>
                    {/* Add activity items here */}
                </ul>
            </div>
        </div>
    );
}

export default UserProfile;
