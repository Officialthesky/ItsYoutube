import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_KEY } from "../Key";
import Header from "../Components/Header";
import SideheaderandContainer from "../Components/SideheaderandContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Search() {
  const location = useLocation();
  //returns the location to any component
  //To get the second argument we pass with useNavigate
  const [searchQuery, setSearchQuery] = useState(location.state.searchQuery);
  const [data, setData] = useState([]); //data we get after search
  const [newPageTokenForSearch, setNewPageTokenForSearch] = useState("");
  const [loadMore, setLoadMore] = useState(true);
  
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

    fetchSearchVideos()
  };

  const [minimizeSideHeader, setMinimizeSideHeader] = useState(true);
  const toggleSideBar = () => {
    setMinimizeSideHeader(!minimizeSideHeader);
  };

  const fetchSearchVideos = () => {
    axios({
      method: "GET",
      url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=200&key=${API_KEY}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        setData(res.data.items);
        setNewPageTokenForSearch(res.data.nextPageToken);
        //   localStorage.setItem("videos", JSON.stringify(res.data.items));
      })
      .catch((error) => {
        console.log(error);
        // alert(error.response.data.error.message);
      });
  };

  const fetchMoreSearchVideos = () => {
    axios({
      method: "GET",
      url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=200&pageToken=${newPageTokenForSearch}&key=${API_KEY}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.data.nextPageToken === undefined) {
          setLoadMore(false);
        }
        const updatedMoreSearchVideos = [...data, ...res.data.items];
        setData(updatedMoreSearchVideos);
        setNewPageTokenForSearch(res.data.nextPageToken);

        //   localStorage.setItem("videos", JSON.stringify(res.data.items));
      })
      .catch((error) => {
        console.log(error);
        // alert(error.response.data.error.message);
      });
  };

  useEffect(() => {
    fetchSearchVideos();
  }, []);

  return (
    <React.Fragment>
      <Header toggleSideBar={toggleSideBar}  saveNews={saveNews}
        searchNavigate={searchNavigate}/>
      <SideheaderandContainer
        hideContainer={true}
        hideSearchcontainer={false}
        data={data}
        minimizeSideHeader={minimizeSideHeader}
        fetchMoreSearchVideos={fetchMoreSearchVideos}
        loadMore={loadMore}
        searchQuery={searchQuery}
      />
    </React.Fragment>
  );
}
