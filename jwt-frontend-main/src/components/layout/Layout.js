import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Nav from "../navigation/Nav";

const Layout = () => {
  return (
    <div className="layout-page">
      <Nav></Nav>
      <div className="layout-main">
        <div className="layout-children">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
