import React from 'react'
import { BrowserRouter as Router, Route, NavLink,Link} from 'react-router-dom'

export default function navigation() {
    return (
        
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Profile">My Profile</Link></li>
                </ul>
            </nav>
        
    )
}
