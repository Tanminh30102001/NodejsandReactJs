import React from "react";
import styled from "styled-components";
const FooterStyle = styled.footer`
  div {
    background-color: rgba(0, 0, 0, 0.05);
    p {
      margin-bottom: 0 !important;
    }
  }
`;
const Footer = () => {
  return (
    <FooterStyle className="mt-3 text-center bg-light text-lg-star">
      <div className="p-3 text-center">
        <p className="text-dark">© 2022 Copyright: Dang Linh</p>
      </div>
    </FooterStyle>
  );
};

export default Footer;
