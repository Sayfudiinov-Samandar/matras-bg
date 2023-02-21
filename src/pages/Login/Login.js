import React, { useRef } from "react";
import "./login.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import {getToken} from "../../redux/token/tokenAction"


export const Login = () => {
    // const state = useSelector(state => state);
  const dispatch = useDispatch();

  const inpLogin = useRef();
  const inpPAssword = useRef();

  const handalLoginSubmit = (evt) => {
    evt.preventDefault();


    axios
      .post("http://localhost:1212/admin/login", {
        userName: inpLogin.current.value,
        password: inpPAssword.current.value,
      })
      .then(res=>{
        dispatch(getToken(res.data.token));
        localStorage.setItem("token", res.data.token)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-box" style={{ width: "330px" }}>
      <h3 className="login-title">Kirish</h3>
      <form className="login-form" onSubmit={handalLoginSubmit}>
        <input
          ref={inpLogin}
          className="inp-login"
          type="text"
          placeholder="Login"
        />
        <input
          ref={inpPAssword}
          className="inp-login"
          type="password"
          placeholder="Parol"
        />
        <button className="login-btn" type="submit">
          Kirish
        </button>
      </form>
    </div>
  );
};
