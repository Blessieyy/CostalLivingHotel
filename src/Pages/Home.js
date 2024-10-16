import Navbar from '../Components/Navbar'
import PictureHomeSection from '../Components/HomeComponents/PictureHomeSection';
import PremiumFacilities from '../Components/HomeComponents/PremiumFacilities';
import BookingSection from '../Components/HomeComponents/BookingSection'
function Home() {
    return (
        <div>
            <Navbar />
            <PictureHomeSection />
            <PremiumFacilities />
            <BookingSection />

        </div>
    )
}

export default Home