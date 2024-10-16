// Dashboard.js
import React, { useState } from 'react';
import AdminRoomSelection from './RoomComponents/Admin/AdminRoomSelection';


const Dashboard = () => {
    const [rooms, setRooms] = useState([]);

    // Function to receive room data from AdminRoomSelection
    const handleRoomsFromAdmin = (roomsData) => {
        setRooms(roomsData);
    };

    return (
        <div>
            <h1>Dashboard</h1>

            {/* Render the AdminRoomSelection component */}
            <AdminRoomSelection sendRoomsToDashboard={handleRoomsFromAdmin} />

            {/* Display rooms data in a table */}
            {rooms.length > 0 && (
                <table className="room-table">
                    <thead>
                        <tr>
                            <th>Room Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room.id}>
                                <td>{room.txtVal}</td>
                                <td>{room.desc}</td>
                                <td>{room.pr}</td>
                                <td>{room.rat}</td>
                                <td>
                                    <img src={room.imgUrl} alt={room.txtVal} width="100" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;
