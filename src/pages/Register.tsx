import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as userRegister } from "../api/auth";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [passwordValidateError, setPasswordValidateError] = useState("");
  const [responseError, setResponseError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");
    setFullnameError("");

    // Fullname validation
    if ("" === fullname) {
      setFullnameError("Please enter your full name");
      return;
    }
    if (fullname.length < 5 || fullname.length > 25) {
      setFullnameError(
        "Full name not valid. It should contain at least 5 characters"
      );
      return;
    }

    // Email validation
    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    // Password Validation
    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    // check if contains at least 1 character, 1 number, 1 symbol and 8-24 characters in total
    const passwordRegex =
      /^(?=.*[a-z]?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,24}$/;

    if (passwordRegex.test(password)) {
      setPasswordError(
        "The password must contain at least 1 number and 1 special character"
      );
      return;
    }

    if (password !== validatePassword) {
      setPasswordValidateError("Passwords does not match.");
      return;
    }

    const res = await userRegister(fullname, email, password);

    if (res.id) {
      window.alert("Success Registration");
      navigate("/login");
    } else {
      setResponseError(res.message);
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Register</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={fullname}
          placeholder="Enter your fullname here"
          onChange={(ev) => setFullname(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{fullnameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          type="password"
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={validatePassword}
          type="password"
          placeholder="Please repeat your password here"
          onChange={(ev) => setValidatePassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordValidateError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Register"}
        />
      </div>
      <br />
      <label className="errorLabel">{responseError}</label>
    </div>
  );
};

export default Register;
