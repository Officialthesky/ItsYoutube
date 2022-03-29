import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Searchcontainer({ data, minimizeSideHeader }) {
  //data as a props
  const navigate = useNavigate();

  const navigateToPlayThisVideo = (video) => {
    // navigate(`/player/${id}`);
    navigate(`/player/${video.id.videoId}`, {
      state: {
        isSearch: true,
        video,
      },
    });
  };

  return (
    <div
      className="searchVideoContainer"
      style={{ width: !minimizeSideHeader && "94vw" }}
    >
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
                  onClick={() => navigateToPlayThisVideo(video)}
                />
              </div>
              <div className="LogoAndInfoOfChannel">
                <div className="videoTitle">
                  <p onClick={() => navigateToPlayThisVideo(video)}>
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
