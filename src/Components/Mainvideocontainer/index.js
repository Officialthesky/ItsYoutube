import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../Key";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Mainvideocontainer({ searchQuery }) {
  const [mostPopularVideos, setMostPopularVideos] = useState([]);
  const [newPageTokenForHome, setNewPageTokenForHome] = useState("");
  const [loadMore, setLoadMore] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideosInstart = () => {
      axios({
        method: "GET",
        url: `https://youtube.googleapis.com/youtube/v3/videos?q=${searchQuery}&part=snippet&maxResults=200&regionCode=IN&chart=mostPopular&key=${API_KEY}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          setMostPopularVideos(res.data.items);
          setNewPageTokenForHome(res.data.nextPageToken);
        })
        .catch((error) => {
          console.log(error);
          // alert(error.response.data.error.message);
        });
    };
    fetchVideosInstart();
  }, []);

  const fetchMoreVideosInstart = () => {
    axios({
      method: "GET",
      url: `https://youtube.googleapis.com/youtube/v3/videos?q=${searchQuery}&part=snippet&maxResults=200&pageToken=${newPageTokenForHome}&regionCode=IN&chart=mostPopular&key=${API_KEY}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.data.nextPageToken === undefined) {
          setLoadMore(false);
        }
        // localStorage.setItem("videos", JSON.stringify(res.data.items));
        const updatedMoreSearchVideos = [...mostPopularVideos, ...res.data.items];
        setMostPopularVideos(updatedMoreSearchVideos);
        setNewPageTokenForHome(res.data.nextPageToken);
      })
      .catch((error) => {
        console.log(error);
        // alert(error.response.data.error.message);
      });
  };
  const navigateToPlayThisVideo = (video) => {
    navigate(`/player/${video.id}`, {
      state: {
        isSearch: false,
        video,
      },
    });
  };

  return (
    <div className="mainVideoContainer">
      <InfiniteScroll // here we used infinite scroll means results will come until it does not end.
        dataLength={mostPopularVideos.length} //This is important field to render the next data
        next={fetchMoreVideosInstart}
        hasMore={loadMore}
        loader={<div className="loaderforHomePage"></div>}
      >
        <hr></hr>
        <div className="videoRow">
          {mostPopularVideos?.map((video, index) => {
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
      </InfiniteScroll>
    </div>
  );
}
