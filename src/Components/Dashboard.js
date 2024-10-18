import React from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = ({ data = [], handleEditClick, handleDelete }) => {
    // Add a check if data is still loading or empty
    if (!data || data.length === 0) {
        return <p>No rooms available or data is loading...</p>;
    }

    return (
        <div className="room-dashboard">
            <div>
                {/* Pass data and functions to Dashboard */}
                <Dashboard
                    data={data} // Ensure data is passed, even if it's an empty array
                    handleEditClick={handleEditClick}
                    handleDelete={handleDelete}
                />
            </div>
            <h2>Room Dashboard</h2>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
