import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";


export default function Searchcontainer({ data}) {
  //data as a props
  const navigate = useNavigate();


  const navigateToPlayThisVideo = (id) => {
    // navigate(`/player/${id}`);
    console.log("withsearch ",id);
    navigate(`/player/${id.videoId}`,{
      state:{
        id:id.videoId
      }
    });
  };

  return (
    <div className="searchVideoContainer">
      <div className="searchideoRow">
        <hr></hr>
        {/* //same data we have to map because we have to show this on search container  */}
        {data.map((video, index) => {
          return (
            <div className="videoInformation" key={index}>
              <div className="videoThumbnail">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  onClick={() => navigateToPlayThisVideo(video.id)}
                />
              </div>
              <div className="LogoAndInfoOfChannel">
                <div className="videoTitle">
                  <p onClick={() => navigateToPlayThisVideo(video.id)}>
                    {video.snippet.title}
                  </p>
                </div>

                <div className="viewsAndUploadTimeOfVideo">
                  {/* <p className="views">{video.statistics.viewCount}</p> */}
                  <span> . </span>
                  <p className="uploadTime">{video.Uploadtime}</p>
                </div>

                <div className="channelLogoAndName">
                  <div className="channelLogo">
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.channelTitle}
                    />
                  </div>
                  <div className="channelName">
                    <p>{video.snippet.channelTitle}</p>
                  </div>
                </div>
                <div className="videoDescription">
                  <p>{video.snippet.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
