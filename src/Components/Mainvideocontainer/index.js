import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Mainvideocontainer({ selectedTag }) {
  const [myFilteredData, setMyFilteredData] = useState([]);

  const fetchVideosFromLocalStorage = JSON.parse(
    localStorage.getItem("videos")
  );
  // console.log(fetchVideosFromLocalStorage);
  useEffect(() => {
    // const fltData = videoPlayerInfo.filter(
    //   (item, index) => item?.tag === selectedTag?.toLowerCase()
    // );
    // if (selectedTag === "all") {
    //   setMyFilteredData(videoPlayerInfo);
    // } else {
    //   setMyFilteredData(fltData);
    // }

    setMyFilteredData(fetchVideosFromLocalStorage);
  }, [fetchVideosFromLocalStorage]);

  const navigate = useNavigate();

  const navigateToPlayThisVideo = (id) => {
    navigate(`/player/${id}`,{
      state:{
        id
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
                  onClick={() => navigateToPlayThisVideo(video.id)}
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
                    <p onClick={() => navigateToPlayThisVideo(video.id)}>
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
