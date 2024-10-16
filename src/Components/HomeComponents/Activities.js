import CircleImage from './CircleImage'


const images = [
    '/images/josh-rocklage-U14CJHTsyB0-unsplash.jpg',
    '/images/lotus-design-n-print--iQYdCr4EpE-unsplash.jpg',
    '/images/maxime-bhm-9ZnGWdsqNZ4-unsplash.jpg',
    '/images/maya-maceka-yW-Qgw_IJXg-unsplash.jpg',
    '/images/samuel-girven-fqMu99l8sqo-unsplash.jpg',
    '/images/toa-heftiba-bcLE7reXFLM-unsplash.jpg',

]
function Activities() {
    return (
        <div><div className='col cirgallery'>
            {images.map((src, index) => (
                <CircleImage key={index} imgSrc={src} pt={'60%'} />

            ))}


        </div>
        </div>
    )
}

export default Activities