import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import "./index.css";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardVoice } from "react-icons/md";
import { RiVideoAddLine } from "react-icons/ri";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IconContext } from "react-icons";
import { FaChromecast } from "react-icons/fa";
import axios from "axios";
// export const API_KEY = "AIzaSyDrvLWLx-tKd0VN1Au-uak6V_zEkiiiYyM";
export const API_KEY = "AIzaSyAxKOdWEkF7FPBZUSumtCTjbjHQxhwesYc";
// export const API_KEY = "AIzaSyCcG_elmQt2JmQ-HuYobx8UcgyWesNOhOA";

export default function Header({ toggleSideBar }) {
  const toggle = () => {
    toggleSideBar();
  };


  const [searchQuery, setSearchQuery] = useState("");

  const saveNews = (e) => {
    setSearchQuery(e.target.value);
  };

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
          localStorage.setItem("videos", JSON.stringify(res.data.items));
        })
        .catch((error) => {
          console.log(error,"ye hai error");
          // alert(error.response.data.error.message);
        });
    };
    fetchVideosInstart();
  }, []);

 

  const searchNavigate = () => {
//pass two arguments one to navigate and other for state 
    navigate(`/search/${searchQuery}`,{
      state:{
        searchQuery
      }
    });
  };

  return (
    <header>
      {/* Header logo and sideheader menu part with classname logo */}
      <div className="logo">
        {/* Hamburger menu */}
        <IconContext.Provider value={{ size: 20, className: "hamburgerMenu" }}>
          <div onClick={toggle}>
            <AiOutlineMenu />
          </div>
        </IconContext.Provider>
        <Link to="/">
          {" "}
          <img
            className="youtubeLogo"
            alt="youtube"
            src="https://exchange4media.gumlet.io/news-photo/109829-108730-youtube.jpg?format=webp&w=750&dpr=1.0"
          />
        </Link>
      </div>
      {/* searchbar part  */}
      <div className="searchBar">
        <input
          placeholder="Search"
          type="text"
          spellCheck="false"
          onChange={saveNews}
        />
        <IconContext.Provider value={{ size: 24, className: "searchClick" }}>
          <div className="searchClickBox" onClick={searchNavigate}>
            <IoIosSearch />
          </div>
        </IconContext.Provider>
        {/* Voice feature  */}
        <IconContext.Provider value={{ size: 20, className: "voiceRecording" }}>
          <div className="voiceIcon">
            <MdKeyboardVoice />
          </div>
        </IconContext.Provider>
      </div>
      <div className="rightHeader">
        <IconContext.Provider value={{ size: 20, className: "addVideo" }}>
          <div>
            <RiVideoAddLine />
          </div>
        </IconContext.Provider>
        <IconContext.Provider value={{ size: 20, className: "dotMenu" }}>
          <div>
            <BsGrid3X3Gap />
          </div>
        </IconContext.Provider>
        <IconContext.Provider value={{ size: 20, className: "chromeCast" }}>
          <div>
            <FaChromecast />
          </div>
        </IconContext.Provider>

        <IconContext.Provider
          value={{ size: 20, className: "notificationBell" }}
        >
          <div>
            <BsBell />
          </div>
        </IconContext.Provider>

        <div className="profilePhoto">
          <img
            alt="profile"
            src="https://yt3.ggpht.com/ytc/AKedOLTYYiBFMYFq25NUYsXulSXsYz0yTLI3HwAI227qWg=s68-c-k-c0x00ffffff-no-rj"
          />
        </div>
      </div>
    </header>
  );
}
