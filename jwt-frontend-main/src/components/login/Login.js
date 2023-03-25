import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { loginService } from "../../services/userService";
import { UserContext } from "../../context/UserContext";
const LoginStyle = styled.div`
  min-height: 100vh;
  .brand {
    h2 {
      background: linear-gradient(90deg, #262443 0, #2a99d5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      span {
        font-weight: 600;
      }
    }
  }
  .brand-detail {
    font-size: 20px;
  }
`;
const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState({
    isValidValueLogin: true,
    isValidPassword: true,
  });
  const isValidInput = () => {
    if (!valueLogin) {
      toast.error("Value is required!");
      setIsValid({
        ...isValid,
        isValidValueLogin: false,
      });
      return false;
    }
    if (!password) {
      toast.error("Password is required!");
      setIsValid({
        isValidValueLogin: true,
        isValidPassword: false,
      });
      return false;
    }
    if (password.length < 8) {
      toast.error("Your password at least 8 characters");
      setIsValid({
        isValidValueLogin: true,
        isValidPassword: false,
      });
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    if (isValidInput()) {
      const res = await loginService(valueLogin, password);
      if (res && +res.EC === 0) {
        let data = {
          isAuthenticated: true,
          access_token: res.DT.access_token,
          account: {
            role: res.DT.role,
            email: res.DT.account.email,
            username: res.DT.account.username,
          },
        };
        login(data);
        localStorage.setItem("jwt", res.DT.access_token);
        toast.success(res?.EM);
        navigate("/");
        window.location.reload();
      } else {
        toast.error(res?.EM);
      }
    }
  };
  useEffect(() => {
    // if (user && user.isAuthenticated === true) {
    //   navigate("/");
    // }
  }, [user]);
  return (
    <LoginStyle>
      <div className="container pt-sm-3 pt-md-5">
        <div className="m-3 row m-sm-0">
          <div className="content-left col-12 col-md-8 d-flex justify-content-center align-items-start flex-column">
            <div className="brand">
              <h2 className="display-1">
                Cinema<span>Plus</span>
              </h2>
            </div>
            <div className="brand-detail">Blog sharing and more...</div>
          </div>
          <div className="gap-4 py-3 rounded shadow content-right d-flex flex-column col-md-4 col-12">
            <div className="form-group">
              <label htmlFor="email">Email or Phone: </label>
              <input
                type="text"
                name="valueLogin"
                className={`${
                  isValid.isValidValueLogin ? "" : "is-invalid"
                } form-control`}
                placeholder="Enter your email address or phone number"
                value={valueLogin}
                onChange={(e) => setValueLogin(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                className={`${
                  isValid.isValidPassword ? "" : "is-invalid"
                } form-control`}
                placeholder="Enter your email password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.charCode === 13 && e.code === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </div>
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <a href="#" className="text-center">
              Forget your password?
            </a>
            <hr />
            <div className="text-center ">
              <button
                className="text-white btn btn-info"
                onClick={() => navigate("/register")}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
};

export default Login;
