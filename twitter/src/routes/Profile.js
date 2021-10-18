import React from 'react'
import { authService } from 'fbInstance'
import { useHistory } from 'react-router';
export default function Profile() {
    const history = useHistory();
    const onLogOutClick=()=>{
        authService.signOut();
        history.push("/")
    }
    return (
        <>
            Profile
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
}
