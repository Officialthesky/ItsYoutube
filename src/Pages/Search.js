import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import SideheaderandContainer from "../Components/SideheaderandContainer";
import axios from "axios";

// export const API_KEY = "AIzaSyAxKOdWEkF7FPBZUSumtCTjbjHQxhwesYc";
import { API_KEY } from "../Components/Header";

export default function Search() {
  const location = useLocation();
  //returns the location to any component
  //To get the second argument we pass with useNavigate
  const searchQuery = location.state.searchQuery;

  const [data, setData] = useState([]); //data we get after search



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
        console.log("here",res.data.items);
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
      <Header />
      <SideheaderandContainer  hideContainer={true} hideSearchcontainer={false} data={data}/>
    </React.Fragment>
  );
}
