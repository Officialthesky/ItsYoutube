import React from "react";
import Videoplayercontainer from "../Components/Videoplayercontainer";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Player() {
  const location = useLocation();
  const videoIdOfSearch = location.state.isSearch
    ? location.state.video.id.videoId
    : location.state.video.id;
  const videoInfo = location.state.video;
  console.log(location);
  // const {videoId} = useParams();
  return (
    <>
      <Header />
      <Videoplayercontainer videoId={videoIdOfSearch} videoInfo={videoInfo} />
    </>
  );
}
