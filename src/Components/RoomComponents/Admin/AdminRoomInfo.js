import { faCloudversify } from '@fortawesome/free-brands-svg-icons';
import { faBackward, faBook, faBookAtlas, faUserAlt, faUserNinja } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';






const AdminRoomInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { room } = location.state; // Access the selected room

    return (

        <div className="info-container">
            <header className="header-info">
                <button className="back-button">
                    <i className="fas fa-arrow-left"><FontAwesomeIcon icon={faBackward} className='icon' /></i> {/* Font Awesome back arrow */}
                </button>
                <h1 className='room-header'>Room Information</h1>
                <div className="username-section">
                    <i className="fas fa-user-circle"><FontAwesomeIcon icon={faUserAlt} /></i> {/* Font Awesome user icon */}
                    <span>USERNAME</span>
                </div>
            </header>

            <div className='info-image-container'>
                <img className='info-image' src={room.imgUrl} alt={room.txtVal} />
                <div className='info-details'>
                    <h1>{room.txtVal}</h1>
                    <p>{room.desc}</p>
                    <p>Price: {room.pr}</p>
                    <p>Rating: {room.rat}</p>
                </div>
                <div className='success-in'>

                    <FontAwesomeIcon icon={faUserNinja}></FontAwesomeIcon>Added successfully
                </div>

            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit massa sed sem maximus vehicula. Sed tristique nisi justo, et feugiat purus luctus ac. Duis congue risus in lacus ultricies, sed aliquet massa semper. Quisque egestas elit erat, sed porta magna laoreet vel. Morbi pulvinar ullamcorper elit, quis posuere justo sollicitudin sit amet. Maecenas pretium egestas ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tincidunt ornare ante et volutpat.</p>

            <button onClick={() => navigate('/adminroomselection')} className='home-button'>BACK</button>
            <button onClick={() => navigate('/dashboard')} className="back-button">EDIT</button>

        </div>
    );
};

export default AdminRoomInfo;