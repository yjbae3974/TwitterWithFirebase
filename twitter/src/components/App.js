import React, {useState, useEffect} from "react";
import AppRouter from "components/Router";
import {authService} from "fbInstance";
function App() {
  const [init, setinit] = useState(false)
  console.log(authService.currentUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setinit(true);
    })
  }, [])
  //setInterval(()=>{
  //  console.log(authService.currentUser)
  //},2000)
  return (
    <>
    {init ? <AppRouter isLoggedIn = {isLoggedIn}></AppRouter> : 'initializing'}
    <footer>&copy; BYJ {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
