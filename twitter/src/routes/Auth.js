import React, { useState } from "react";
import { authService, firebaseInstance } from "fbInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import AuthForm from "components/AuthForm";
export default function Auth() {
  const [error, seterror] = useState("");
  
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if(name ==='google'){
        provider = new firebaseInstance.auth.GoogleAuthProvider();
    }else if (name === 'github'){
        provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm seterror={seterror}/>
      
      <div className="authBtns">
        <button onClick={onSocialClick} name="google"  className="authBtn">
          Continue with Google  <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github  <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
      <div className="authError">{error}</div>
    </div>
  );
}
