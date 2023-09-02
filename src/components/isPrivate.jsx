import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";

function IsPrivate({ children }) {
  //grabbing information from the context (from the frig)
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  //If the page is still loading, then return a p tag until the data arrives
  if (isLoading) {
    return <p>Loading...</p>;
  }
  //If the data has arrived and the user is still not logged IN, then redirect to the login page
  if (!isLoggedIn) {
    navigate("/login");
  }

  // ELse... return the child component.
  //Everything was ok

  return <div>{children}</div>;
}

export default IsPrivate;