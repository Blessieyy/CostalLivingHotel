import Activities from './Activities'
import CustomImage from './CustomImage'

function PremiumFacilities() {
    const images = [
        '/images/online-marketing-hIgeoQjS_iE-unsplash.jpg',
        '/images/toni-rose-ng-Aq3MVtlHC1s-unsplash.jpg',
        '/images/michael-wave-yScdP2--v0s-unsplash.jpg',
    ]
    return (
        <div className='container'>
            <div className='facility-section'>
                <div className='col'>
                    <h1>Exclusive Premium Facilities</h1>
                </div>
                <div className='col'>
                    our premium Facilities include extra values like swimming pool, game activities, a bar and breathtaking views. every corner of the place is created to give you the jaw dropping moment
                </div>
            </div>
            <div className='col gallery'>
                {images.map((src, index) => (
                    <CustomImage key={index} imgSrc={src} pt={'60%'} />
                ))}
                <p className='desc-title'>24 Hour Medical Service<p className='info'>Professional Doctors are always on standby for any emergency issues</p></p>
                <p className='desc-title'>Swimming Pool<p className='info'>serene swimming Pool in tropic style</p></p>
                <p className='desc-title'>Bar area<p className='info'>every single drink that you love is found here</p></p>

            </div>
            <Activities />

        </div>

    )
}

export default PremiumFacilities