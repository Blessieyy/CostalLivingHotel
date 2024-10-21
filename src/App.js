import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Components/firebase";
import { useEffect, useState } from "react";



import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin/Admin';
import AdminRegister from './Pages/AdminRegister'
import Addrooms from "./Components/RoomComponents/Addrooms";
import UserProfile from "./Pages/UserProfile";
import RoomSelection from "./Components/RoomComponents/RoomSelection";
import RoomDetails from "./Components/RoomComponents/RoomDetails";
import StripeWrapper from "./Components/Srtripe/StripeWrapper";
import Review from "./Components/RoomComponents/Review";
import Dashboard from "./Components/Dashboard";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import SuccessPage from "./Components/SuccessPage";
import RoomInfo from "./Components/RoomComponents/Room Infomation/RoomInfo";
import AdminRoomSelection from "./Components/RoomComponents/Admin/AdminRoomSelection";
import AddRoomPage from "./Components/RoomComponents/Admin/AddRoomPage";
import AdminRoomInfo from "./Components/RoomComponents/Admin/AdminRoomInfo";
import BookingConfirmation from "./Components/RoomComponents/BookingConfirmation";


function App() {
    const [admin, setAdmin] = useState('null')
    const [isFetching, setisFetching] = useState('true')
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (admin) => {
            if (admin) {
                setAdmin(admin);
                setisFetching(false);


                return;
            }
            setAdmin(null);
            setisFetching(false);

        })
        return () => unsubscribe();
    }, []);
    if (isFetching) {
        return (

            <div class="loader">

                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>

            </div>




        )
    }
    return (
        <div className="App">
            <Router>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/adminreg" element={<AdminRegister />} />
                    <Route path="/addrooms" element={<Addrooms />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/roomselection" element={<RoomSelection />} />
                    <Route path="/roominfo" element={<RoomInfo />} />
                    <Route path="/roomdetails" element={<RoomDetails />} />
                    <Route path="/pay" element={<StripeWrapper />} />
                    <Route path="/success" element={<SuccessPage />} />
                    <Route path="/review" element={<Review />} />
                    {/* <Route path="/dashboard" element={<ProtectedRoute admin={admin}>
                        <Dashboard></Dashboard>
                    </ProtectedRoute>} /> */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/adminroomselection" element={<AdminRoomSelection />} />
                    <Route path="/addroompage" element={<AddRoomPage />} />
                    <Route path="/adminroominfo" element={<AdminRoomInfo />} />
                    <Route path="/confirm" element={<BookingConfirmation />} />


                </Routes>

                <div className='container main'>


                </div>
                <Footer />
            </Router>
        </div>
    )
}

export default App;