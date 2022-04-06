import React from 'react'
import user from "../images/profil.png"

function User() {

    return (
        <div className='User'>
            <div className="user">
                <img src={user} alt="user" className="profileImage"/>
            </div>
            <div className="info">
                <p> Tarek Ammar </p>
            </div>
        </div>
    )
}

export default User