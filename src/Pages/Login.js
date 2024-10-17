import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../Components/SocialLogin';

import '../styles/Partials/_login.scss';


const images = '/images/rhema-kallianpur-jbJ-_hw2yag-unsplash.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before each attempt

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/addrooms');
    } catch (error) {
      console.error('Login error:', error.message); // Log the error message for debugging
      setError('Invalid Email or Password! you might be new here, click below to sign in!');
    }
  };

  return (
    <div className="login-page">
      <div className="left-section" style={{ backgroundImage: `url(${images})` }}>
        <div className="text-container">
          <h1>CostalLivingHotels.Com</h1>
          <p>Places That Makes You Feel At Home</p>
        </div>
      </div>
      <div className="right-section">
        <div className="login-container">
          <h2>Login</h2>
          <p>Welcome Back!</p>
          <form onSubmit={handleSubmit}>
            <label>Email Address:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>LOGIN</button>
            <SocialLogin />
          </form>
          {error && <p className='error-message'>{error}</p>}
          <p className="new-here">Are You New Around Here? <Link to={'/register'}> Signup</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
