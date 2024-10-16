import { useState } from "react";
import { useNavigate } from "react-router-dom"


function BookingSection() {
    const [isFetching, setisFetching] = useState('true')
    const navigate = useNavigate();


    const handleClick = async (e) => {
        e.preventDefault();


        navigate('/login')

    }

    return (
        <div className='Booking-section'>
            <div className='col'>
                <h1>Booking is as simple as tapping your phone</h1>
                <p>you can start your bookings by logging in first then you will automatically be in our database.
                    start to book your way to paradise!</p>
                <button onClick={handleClick}>BOOK NOW</button>
            </div>
            <div className='col custom-image'>
                <img src='/images/sidath-vimukthi-LV0OCPkmEWo-unsplash.jpg' alt='' />
            </div>
        </div>
    )
}

export default BookingSection