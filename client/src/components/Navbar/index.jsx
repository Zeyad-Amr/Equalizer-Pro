import React, { useContext } from "react";
import "./style.css";
import Spinner from "react-bootstrap/Spinner";
import { AppContext } from "../../contexts/index";
const Navbar = () => {
  const { loading } = useContext(AppContext);
  return (
    <nav>
      <div className="brand">
        <i className="material-symbols-rounded logo">equalizer</i>
        <a href="/">Equalizer Pro</a>
      </div>
      {loading ? (
        <div className="spinner">
          <Spinner
            as="span"
            animation="border"
            role="status"
            variant="primary"
            aria-hidden="true"
          />
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
