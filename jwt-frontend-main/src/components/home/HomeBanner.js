import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const HomeBannerStyle = styled.div`
  min-height: 500px;
  padding: 40px 0;
  /* margin-bottom: 40px; */
  /* background-image: linear-gradient(to right bottom, #6bdefc, #2f80ed); */
  background: url("../../../banner-image.png") no-repeat center center;
  background-size: cover;
  .banner {
    width: 100%;
    height: 100%;
    .banner-content {
      margin-top: 50px;
      max-width: 600px;
      .banner-heading {
        background: linear-gradient(90deg, #262443 0, #2a99d5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-bottom: 10px;
        font-size: 50px;
        margin-bottom: 20px;
      }
      .banner-desc {
        font-size: 25px;
        line-height: 1.75;
        margin-bottom: 40px;
      }
      .banner-btn {
        background: linear-gradient(90deg, #64b3f4, #c2e59c);
      }
    }
  }
`;
const HomeBanner = () => {
  const navigate = useNavigate();
  return (
    <HomeBannerStyle>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">CinemaPlus Blogging</h1>
            <p className="banner-desc">Blog sharing and more...</p>
            <button
              className="btn banner-btn"
              onClick={() => navigate("/posts")}
            >
              Read now
            </button>
          </div>
        </div>
      </div>
    </HomeBannerStyle>
  );
};

export default HomeBanner;
