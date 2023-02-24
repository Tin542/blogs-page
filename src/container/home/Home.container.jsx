import React from "react";
import HomeComponent from "../../components/home/Home.component";
import { Post } from '../../data/post';

const HomeContainer = () => {

  return (
    <>
      <HomeComponent data={Post}/>
    </>
  );
};
export default HomeContainer;
