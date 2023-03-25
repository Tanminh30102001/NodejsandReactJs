import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { registerService } from "../../services/userService";
const RegisterStyle = styled.div`
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
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isValid, setIsValid] = useState({
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfPassword: true,
  });
  useEffect(() => {}, []);
  const isValidInput = () => {
    if (!email) {
      toast.error("Email is required!");
      setIsValid({
        ...isValid,
        isValidEmail: false,
      });
      return false;
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("Your email must be valid!");
      setIsValid({
        ...isValid,
        isValidEmail: false,
      });
      return false;
    }
    if (!phone) {
      toast.error("Phone is required!");
      setIsValid({
        ...isValid,
        isValidEmail: true,
        isValidPhone: false,
      });
      return false;
    }
    if (!password) {
      toast.error("Password is required!");
      setIsValid({
        ...isValid,
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: false,
      });
      return false;
    }
    if (password.length < 8) {
      toast.error("Your password at least 8 characters");
      setIsValid({
        ...isValid,
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: false,
      });
      return false;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Your password at least 1 character lowercase");
      setIsValid({
        ...isValid,
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: false,
      });
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Your password at least 1 character uppercase");
      setIsValid({
        ...isValid,
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: false,
      });
      return false;
    }
    if (password !== confPassword) {
      toast.error("Your password is not the same");
      setIsValid({
        ...isValid,
        isValidEmail: true,
        isValidPhone: true,
        isValidConfPassword: false,
      });
      return false;
    }

    return true;
  };
  const hanldeRegister = async () => {
    if (isValidInput()) {
      const res = await registerService(email, username, phone, password);
      if (+res.EC === 0) {
        toast.success(res.EM);
        navigate("/login");
        setIsValid({
          isValidEmail: true,
          isValidPhone: true,
          isValidPassword: true,
          isValidConfPassword: true,
        });
      }
      if (+res.EC === 1) {
        if (res.DT.isEmailExist) {
          setIsValid({
            ...isValid,
            isValidEmail: false,
          });
          toast.error(res.EM);
        } else {
          setIsValid({
            ...isValid,
            isValidEmail: true,
            isValidPhone: false,
          });
          toast.error(res.EM);
        }
      }
      if (+res.EC === -1) {
        toast.error(res.EM);
        return;
      }
    }
  };
  return (
    <RegisterStyle>
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
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                className={`${
                  isValid.isValidEmail ? "" : "is-invalid"
                } form-control`}
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone number: </label>
              <input
                type="text"
                name="phone"
                className={`${
                  isValid.isValidPhone ? "" : "is-invalid"
                } form-control`}
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                className={`form-control`}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                className={`${
                  isValid.isValidPassword ? "" : "is-invalid"
                } form-control`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Re-enter password: </label>
              <input
                type="password"
                className={`${
                  isValid.isValidConfPassword ? "" : "is-invalid"
                } form-control`}
                placeholder="Enter your re-password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>
            <button
              className=" btn btn-primary"
              type="submit"
              onClick={() => hanldeRegister()}
            >
              Register
            </button>
            <hr />
            <div className="text-center ">
              <button
                className="text-white btn btn-info"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </RegisterStyle>
  );
};

export default Register;
