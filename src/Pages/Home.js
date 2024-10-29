import Navbar from '../Components/Navbar'
import PictureHomeSection from '../Components/HomeComponents/PictureHomeSection';
import PremiumFacilities from '../Components/HomeComponents/PremiumFacilities';
import BookingSection from '../Components/HomeComponents/BookingSection'
import Footer from '../Components/Footer';


function Home() {
    return (
        <div>
            <Navbar />
            <PictureHomeSection />
            <PremiumFacilities />
            <BookingSection />
            <Footer />

        </div>
    )
}

export default Home