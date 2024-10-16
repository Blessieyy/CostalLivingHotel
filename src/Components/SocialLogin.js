import React from 'react'

const SocialLogin = () => {
    return (
        <div> <p className='or'><span>or Login With:</span></p>
            <div className='social-container'>
                <button className='social-button'>
                    <img src='google.svg' alt='' className='social-icon' />
                    Google
                </button>
                <button className='social-button'>
                    <img src='apple.svg' alt='' className='social-icon' />
                    Apple
                </button>
            </div></div>
    )
}

export default SocialLogin