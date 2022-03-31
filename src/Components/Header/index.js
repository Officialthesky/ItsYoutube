import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardVoice } from "react-icons/md";
import { RiVideoAddLine } from "react-icons/ri";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IconContext } from "react-icons";
import { FaChromecast } from "react-icons/fa";

export default function Header({ toggleSideBar, saveNews, searchNavigate }) {
  const toggle = () => {
    toggleSideBar();
  };
  const saveTheNews = (e) => {
    saveNews(e);
  };
  const navigateToSearchPage = () => {
    searchNavigate();
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
          onChange={(e) => saveTheNews(e)}
        />
        <IconContext.Provider value={{ size: 24, className: "searchClick" }}>
          <div
            className="searchClickBox"
            onClick={() => navigateToSearchPage()}
          >
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
