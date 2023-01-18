import React from "react";
import HomeComponent from "../../components/home/Home.component";
import { Post } from '../../data/post';

const HomeContainer = () => {

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  return (
    <>
      <HomeComponent data={Post} onChange={onChange}/>
    </>
  );
};
export default HomeContainer;
