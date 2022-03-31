import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../../Key";

import "./index.css";
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Videoplayercontainer({ videoId, videoInfo }) {
  const [comments, setComments] = useState([]);
  //nextpagetoken used for  storing next page results
  const [nextPageToken, setNextPageToken] = useState("");
  const [loadMore, setLoadMore] = useState(true);
  const [recommendVideo, setRecommendVideo] = useState([]);
  const [
    nextPageTokenForRecommendedVideos,
    setNextPageTokenForRecommendedVideos,
  ] = useState("");

  const fetchComments = () => {
    axios({
      method: "GET",
      url: `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        setComments(res.data.items);
        setNextPageToken(res.data.nextPageToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMoreComments = () => {
    axios({
      method: "GET",
      url: `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&pageToken=${nextPageToken}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        // Here undefined means there is no next page results
        if (res.data.nextPageToken === undefined) {
          setLoadMore(false);
        }
        const updateComments = [...comments, ...res.data.items]; //Very Important this is,we call it spread operator
        //used for adding two arrays only
        setComments(updateComments);
        setNextPageToken(res.data.nextPageToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchRecommendVideos = () => {
    axios({
      method: "GET",
      url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${videoId}&videoType=any&maxResults=50&key=${API_KEY}&videoId=${videoId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        setRecommendVideo(res.data.items);
        console.log(res.data);
        setNextPageTokenForRecommendedVideos(res.data.nextPageToken);
        //   localStorage.setItem("videos", JSON.stringify(res.data.items));
      })
      .catch((error) => {
        console.log(error);
        // alert(error.response.data.error.message);
      });
  };

  const fetchMoreRecommendVideos = () => {
    console.log("hello");
    axios({
      method: "GET",
      url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${videoId}&videoType=any&pageToken=${nextPageTokenForRecommendedVideos}&maxResults=50&key=${API_KEY}&videoId=${videoId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.data.nextPageToken === undefined) {
          setLoadMore(false);
        }
        const updateRecommendedVideos = [...recommendVideo, ...res.data.items]; //Very Important this is,we call it spread operator

        setRecommendVideo(updateRecommendedVideos);
        setNextPageTokenForRecommendedVideos(res.data.nextPageToken);

        //   localStorage.setItem("videos", JSON.stringify(res.data.items));
      })
      .catch((error) => {
        console.log(error);
        // alert(error.response.data.error.message);
      });
  };

  const navigate = useNavigate();

  const navigateToPlayThisVideo = (video) => {
    navigate(`/player/${video.id.videoId}`, {
      state: {
        isSearch: true,
        video,
      },
    });

    window.location.reload();
  };

  useEffect(() => {
    fetchComments();
    fetchRecommendVideos();
  }, []);

  return (
    <div className="videoPlayerContainer">
      <div className="watchAndCommentsContainer">
        <div className="playingVideo">
          <iframe
            title="Youtube Video Play"
            width="980"
            height="500"
            frameBorder="0"
            allowFullScreen
            allow="autoplay"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          ></iframe>
          <div className="playingVideoInfo">
            <h6 className="playingVideoTitle">{videoInfo.snippet.title}</h6>
          </div>
          <hr></hr>
        </div>

        <div className="commentsColumn">
          <InfiniteScroll // here we used infinite scroll means results will come until it does not end.
            dataLength={comments.length} //This is important field to render the next data
            next={fetchMoreComments}
            hasMore={loadMore}
            loader={<div className="loader"></div>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more comments found</b>
              </p>
            }
          >
            {comments.map((video, index) => {
              return (
                <div
                  key={index}
                  className="authorNameAndCommentAndProfileImage"
                >
                  <div className="authorProfileImage">
                    <img
                      src={
                        video.snippet.topLevelComment.snippet
                          .authorProfileImageUrl
                      }
                      alt={
                        video.snippet.topLevelComment.snippet.authorDisplayName
                      }
                    />
                  </div>
                  <div className="authorNameAndCommentAndLikes">
                    <h6 className="authorDisplayName">
                      {video.snippet.topLevelComment.snippet.authorDisplayName}
                    </h6>

                    <p className="comment">
                      {video.snippet.topLevelComment.snippet.textOriginal}
                    </p>
                    <div className="likeOnCounts">
                      <p className="likeCount">
                        <AiOutlineLike />{" "}
                        {video.snippet.topLevelComment.snippet.likeCount}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
      <div className="recommendVideosContainer">
        <InfiniteScroll
          dataLength={recommendVideo.length} //This is important field to render the next data
          next={fetchMoreRecommendVideos}
          hasMore={loadMore}
          loader={<div className="loader"></div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more videos</b>
            </p>
          }
        >
          {recommendVideo.map((video, index) => {
            return (
              <div key={index} className="recommendVideosDisplay">
                <div className="recommendedVideoThumbnail">
                  <img
                    src={video.snippet?.thumbnails.medium.url}
                    onClick={() => navigateToPlayThisVideo(video)}
                  />
                  {/* (why question mark used ?) (ternary operator) snippet will check if there is thumbnail then go further otherwise don't show error show blank */}
                </div>
                <div className="recommendedVideoInfo">
                  <h6>{video.snippet?.title}</h6>
                  <p
                    className="channelName"
                    onClick={() => navigateToPlayThisVideo(video)}
                  >
                    {video.snippet?.channelTitle}
                  </p>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
