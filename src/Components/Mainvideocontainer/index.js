import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Mainvideocontainer({ selectedTag }) {
  const [myFilteredData, setMyFilteredData] = useState([]);

  const fetchVideosFromLocalStorage = JSON.parse(
    localStorage.getItem("videos")
  );
  
  useEffect(() => {
    setMyFilteredData(fetchVideosFromLocalStorage);
  }, [fetchVideosFromLocalStorage]);

  const navigate = useNavigate();

  const navigateToPlayThisVideo = (video) => {
    navigate(`/player/${video.id}`,{
      state:{
        isSearch:false,
        video
      }
    });
  };

  return (
    <div className="mainVideoContainer">
      <hr></hr>
      <div className="videoRow">
        {myFilteredData?.map((video, index) => {
          return (
            <div className="videoInfo" key={index}>
              <div className="videoPlayer">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  onClick={() => navigateToPlayThisVideo(video)}
                  // we need whole thing about video so passing video 
                />
              </div>
              <div className="channelLogoAndInfo">
                <div className="channelLogo">
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.channelTitle}
                  />
                </div>
                <div className="channelInfo">
                  <div className="channelDescription">
                    <p onClick={() => navigateToPlayThisVideo(video)}>
                      {video.snippet.title}
                    </p>
                  </div>
                  <div className="channelName">
                    <p>{video.snippet.channelTitle}</p>
                  </div>
                  <div className="viewsAndUploadTime">
                    {/* <p className="views">{video.snippet.videoId}</p> */}
                    <span> . </span>
                    {/* <p className="uploadTime">{video.snippet.videoId}</p> */}
                  </div>
                  {/* <p style={{ color: "red" }}>{video.tag}</p> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
