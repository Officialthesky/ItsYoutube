import React, { useState } from "react";
import Mainvideocontainer from "../Mainvideocontainer";
import Searchcontainer from "../Searchcontainer";
import Tagcontainer from "../Tagcontainer";
import "./index.css";

export default function Container({ minimizeSideHeader }) {
  const [selectedTag, setSelectedTag] = useState("all");

  const tagHandler = (e) => {
    if (e.tagName === "All") {
      setSelectedTag("all");
    } else {
      setSelectedTag(e.tagName);
    }
  };
  return (
    <div className="container" style={{ width: !minimizeSideHeader && "94vw" }}>
      <hr></hr>

      <Tagcontainer
        tagHandler={tagHandler}
        minimizeSideHeader={minimizeSideHeader}
      />
      <Mainvideocontainer selectedTag={selectedTag} />

      <hr></hr>
    </div>
  );
}
