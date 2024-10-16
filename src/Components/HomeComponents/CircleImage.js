



function CircleImage({ imgSrc, pt }) {
    return (
        <div className="circle-image" style={{ paddingTop: pt }}>
            <img src={imgSrc} alt="" />
        </div>
    )
}

export default CircleImage