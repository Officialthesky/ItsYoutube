import "../styles.css";
import Header from "../Components/Header";
import SideheaderandContainer from "../Components/SideheaderandContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [minimizeSideHeader, setMinimizeSideHeader] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
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
  };

  const toggleSideBar = () => {
    setMinimizeSideHeader(!minimizeSideHeader);
  };

  return (
    <div className="App">
      <Header
        toggleSideBar={toggleSideBar}
        saveNews={saveNews}
        searchNavigate={searchNavigate}
      />
      <SideheaderandContainer
        minimizeSideHeader={minimizeSideHeader}
        hideContainer={false}
        hideSearchcontainer={true}
        searchQuery={searchQuery}
      />
    </div>
  );
}
