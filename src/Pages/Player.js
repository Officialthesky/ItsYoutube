import React,{ useState } from "react";
import Videoplayercontainer from "../Components/Videoplayercontainer";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Player() {
  const location = useLocation();
  const videoIdOfSearch = location.state.isSearch
    ? location.state.video.id.videoId
    : location.state.video.id;
  const videoInfo = location.state.video;
  console.log(location);
  // const {videoId} = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const saveNews = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchNavigate = () => {
    //pass two arguments one to navigate and other for state
    navigate(`/search/${searchQuery}`, {
      state: {
        searchQuery
      },
    });
  };

  return (
    <>
      <Header saveNews={saveNews}
        searchNavigate={searchNavigate}/>
      <Videoplayercontainer videoId={videoIdOfSearch} videoInfo={videoInfo} />
    </>
  );
}
