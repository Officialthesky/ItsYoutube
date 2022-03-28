import React from "react";
import "./index.css";
import { tagNames } from "./data";

export default function Tagcontainer({ minimizeSideHeader, tagHandler }) {
  const filteredData = (tags) => {
    tagHandler(tags);
  };

  return (
    <div
      className="tagContainer"
      style={{ width: !minimizeSideHeader && "94vw" }}
    >
      <hr></hr>

      {tagNames.map((tags, index) => {
        const isActive = index === 0;
        return (
          <div key={index} className="tags">
            <p
              onClick={() => filteredData(tags)}
              style={
                isActive ? { backgroundColor: "black", color: "white" } : {}
              }
            >
              {tags.tagName}
            </p>
          </div>
        );
      })}
    </div>
  );
}
