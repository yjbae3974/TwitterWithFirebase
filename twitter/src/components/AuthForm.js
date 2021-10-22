import React,{useState} from "react";
import { authService } from "fbInstance";
export default function AuthForm({seterror}) {
    
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
  return (
      <>
    <form onSubmit={onSubmit} className="container">
      <input
        onChange={onChange}
        name="email"
        type="email"
        placeholder="email"
        required
        value={email}
        className="authInput"
      />
      <input
        onChange={onChange}
        name="password"
        type="password"
        placeholder="Password"
        required
        value={password}
        className="authInput"
      />
      <input
        onChange={onChange}
        type="submit"
        className="authInput authSubmit"
        value={newAccount ? "sign in" : "log in"}
      />
    </form>
    <span onClick={toggleAccount} className="authSwitch">
    {newAccount ? "log in" : "create account"}
  </span>
  </>
  );
}
