import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import HomeBanner from "./HomeBanner";
import HomeFeature from "./HomeFeature";
import HomeNewest from "./HomeNewest";

const HomePageStyle = styled.div``;

const HomePage = () => {
  useEffect(() => {
    document.title = "CinemaPlus Blogging";
  }, []);
  return (
    <HomePageStyle>
      <HomeBanner></HomeBanner>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>
    </HomePageStyle>
  );
};

export default HomePage;
