import React from "react";
import Videoplayercontainer from "../Components/Videoplayercontainer";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";



export default function Player() {
  const location = useLocation();
  console.log(location);
  const videoIdOfSearch = location.state.id;
    // const {videoId} = useParams();
  return (
    <>
      <Header />
      <Videoplayercontainer videoId={videoIdOfSearch}  />
    </>
  );
}
