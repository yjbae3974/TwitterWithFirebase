import React, { useState } from "react";
import { authService, firebaseInstance } from "fbInstance";
export default function Auth() {
  const [error, seterror] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [newAccount, setnewAccount] = useState(true);
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setemail(value);
    } else if (name === "password") {
      setpassword(value);
      console.log(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault(); //기본 일들이 실행되지 않고 내가 원하는 일들이 실행되게끔..
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      seterror(error.message);
    }
  };
  const toggleAccount = () => {
    return setnewAccount((prev) => !prev);
  };
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="email"
          required
          value={email}
        />
        <input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
        />
        <input
          onChange={onChange}
          type="submit"
          value={newAccount ? "sign in" : "log in"}
        />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "log in" : "create account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
      <div>{error}</div>
    </div>
  );
}
