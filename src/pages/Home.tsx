import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  const onButtonClickRegister = () => {
    navigate("/register");
  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? "Log out" : "Log in"}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
      {!loggedIn ? (
        <div className={"buttonContainer"}>
          <input
            className={"inputButton"}
            type="button"
            onClick={onButtonClickRegister}
            value="Register"
          />
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Home;
