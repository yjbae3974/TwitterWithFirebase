import React, {useState, useEffect} from "react";
import AppRouter from "components/Router";
import {authService} from "fbInstance";

function App() {
  const [init, setinit] = useState(false)
  console.log(authService.currentUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setuserObj] = useState(null)
  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setuserObj({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      }else{
        setIsLoggedIn(false);
      }
      setinit(true);
    })
  }, [])
  //setInterval(()=>{
  //  console.log(authService.currentUser)
  //},2000)
  const refreshUser = () =>{
    const user = authService.currentUser;
    setuserObj({
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
    //이걸 왜 했냐면, 오브젝트의 크기가 너무 커서 리액트가 전이랑 현재랑 다른지를 제대로 판단하지 못함. 그래서 오브젝트 크기를 매우 줄임.
  }
  return (
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn = {isLoggedIn} userObj={userObj}></AppRouter> : 'initializing'}
    <footer>&copy; BYJ {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
