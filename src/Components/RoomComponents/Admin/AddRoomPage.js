// AddRoomPage.js
import { useState } from 'react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { imgDb } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const AddRoomPage = () => {
    const [txt, setTxt] = useState('');
    const [desc, setDesc] = useState('');
    const [pr, setPr] = useState('');
    const [rat, setRat] = useState('');
    const [img, setImg] = useState('');

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
        navigate('/adminroomselection');  // Navigate to home or wherever appropriate
    };

    return (
        <div className="add-room-page">
            <h1>Add a New Room</h1>
            <input onChange={(e) => setTxt(e.target.value)} placeholder='Room Name' />
            <input onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
            <input onChange={(e) => setRat(e.target.value)} placeholder="Rating" />
            <input onChange={(e) => setPr(e.target.value)} placeholder="Price" />
            <input type='file' onChange={(e) => handleUpload(e)} />
            <button onClick={handleClick}>Add Room</button>
        </div>
    );
};

export default AddRoomPage;
