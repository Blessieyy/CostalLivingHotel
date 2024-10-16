// import React, { useState } from 'react';
// import { storage, db } from './firebase'; // Import Firebase config
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { collection, addDoc } from 'firebase/firestore';

// function ImageUploadModal() {
//     const [showModal, setShowModal] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [description, setDescription] = useState('');

//     const handleImageChange = (event) => {
//         setSelectedImage(event.target.files[0]);
//     };

//     const handleDescriptionChange = (event) => {
//         setDescription(event.target.value);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!selectedImage) {
//             alert('Please select an image.');
//             return;
//         }

//         const storageRef = ref(storage, `images/${selectedImage.name}`);
//         const uploadTask = uploadBytes(storageRef, selectedImage);

//         try {
//             await uploadTask;
//             const downloadURL = await getDownloadURL(storageRef);

//             await addDoc(collection(db, 'images'), {
//                 imageUrl: downloadURL,
//                 description: description,
//             });

//             setShowModal(false);
//             setSelectedImage(null);
//             setDescription('');
//             alert('Image uploaded successfully!');
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             alert('Error uploading image. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <button onClick={() => setShowModal(true)}>Add Image</button>

//             {showModal && (
//                 <div className='modal'>
//                     <div className="modal-content">
//                         <span className='close' onClick={() => setShowModal(false)}>&times;</span>
//                         <h4>Add image</h4>
//                         <form onSubmit={handleSubmit}>
//                             <input type="file" accept="image/*" onChange={handleImageChange} />
//                             <label htmlFor="description">Description:</label>
//                             <input
//                                 type="text"
//                                 id="description"
//                                 value={description}
//                                 onChange={handleDescriptionChange}
//                             />
//                             <button type="submit">Add</button>


//                         </form>

//                     </div>
//                 </div>
//             )}

//         </div>

//     )
// }


// export default ImageUploadModal
