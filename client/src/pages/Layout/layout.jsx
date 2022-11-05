import React from "react";
import Body from "../Body/body";
import Navbar from "../../components/Navbar/index";
import Footer from "../../components/Footer/index";
import "./style.css";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
};

export default Layout;
