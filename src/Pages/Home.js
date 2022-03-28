import "../styles.css"
import Header from "../Components/Header";
import SideheaderandContainer from "../Components/SideheaderandContainer"
import { useState } from "react";

export default function Home() {
  const [minimizeSideHeader, setMinimizeSideHeader] = useState(true);
  const toggleSideBar = () => {
    setMinimizeSideHeader(!minimizeSideHeader);
  };
  return (
    <div className="App">
      <Header toggleSideBar={toggleSideBar} />
      <SideheaderandContainer minimizeSideHeader={minimizeSideHeader} hideContainer={false} hideSearchcontainer={true}/>
    </div>
  );
}


