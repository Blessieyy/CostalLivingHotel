import React, { useState, useEffect } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import { db } from "./firebase"; // Import your db instance
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(null); // Track the room being edited
    const [editFields, setEditFields] = useState({ txt: '', desc: '', pr: '', rat: '' }); // Editable fields
    const navigate = useNavigate();

    // Fetch rooms data from Firestore
    const getData = async () => {
        try {
            const valRef = collection(db, 'rooms'); // Use `db` directly here
            const dataDb = await getDocs(valRef);
            const allData = dataDb.docs.map(val => ({ ...val.data(), id: val.id }));
            setData(allData); // Update the state with fetched data
        } catch (error) {
            console.error("Error fetching room data:", error);
            alert("Error fetching room data: " + error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (roomId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this room?");
        if (confirmDelete) {
            try {
                const roomRef = doc(db, 'rooms', roomId); // Use `db` directly here
                await deleteDoc(roomRef);
                alert("Room deleted successfully.");
                getData(); // Refresh the room list after deletion
            } catch (error) {
                console.error("Error deleting room:", error);
                alert("Error deleting room: " + error.message);
            }
        }
    };

    const handleEditClick = (room) => {
        setEditMode(room.id);
        setEditFields({ txt: room.txtVal, desc: room.desc, pr: room.pr, rat: room.rat });
    };

    const handleSaveEdit = async (roomId) => {
        const roomRef = doc(db, 'rooms', roomId); // Use `db` directly here
        try {
            await updateDoc(roomRef, {
                txtVal: editFields.txt,
                desc: editFields.desc,
                pr: editFields.pr,
                rat: editFields.rat
            });
            alert("Room updated successfully.");
            setEditMode(null);
            getData(); // Refresh the room list after editing
        } catch (error) {
            console.error("Error updating room:", error);
            alert("Error updating room: " + error.message);
        }
    };

    return (
        <div className="room-dashboard">
            <h2>Room Dashboard</h2>

            {/* Check if data is empty or still loading */}
            {data.length === 0 ? (
                <p>No rooms available or data is loading...</p>
            ) : (
                <table className="room-table">
                    <thead>
                        <tr>
                            <th>Room Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((value) => (
                            <tr key={value.id}>
                                {editMode === value.id ? (
                                    <>
                                        <td>
                                            <input
                                                type="text"
                                                value={editFields.txt}
                                                onChange={(e) => setEditFields({ ...editFields, txt: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={editFields.desc}
                                                onChange={(e) => setEditFields({ ...editFields, desc: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={editFields.pr}
                                                onChange={(e) => setEditFields({ ...editFields, pr: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={editFields.rat}
                                                onChange={(e) => setEditFields({ ...editFields, rat: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => handleSaveEdit(value.id)}>Save</button>
                                            <button onClick={() => setEditMode(null)}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{value.txtVal}</td>
                                        <td>{value.desc}</td>
                                        <td>{value.pr}</td>
                                        <td>{value.rat} ★</td>
                                        <td>
                                            <button onClick={() => handleEditClick(value)}>
                                                <FontAwesomeIcon icon={faEdit} /> Edit
                                            </button>
                                            <button onClick={() => handleDelete(value.id)}>
                                                <FontAwesomeIcon icon={faTrash} /> Delete
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={() => navigate('/adminroomselection')} className="back-button">BACK</button>
        </div>
    );
};

export default Dashboard;
