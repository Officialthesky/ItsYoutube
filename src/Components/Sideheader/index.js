import React from "react";
import "./index.css";
import { sideHeaderNavigation } from "./data";

const minimizesidebarstyle = {
  height: "10vh",
  fontFamily: "sans-serif",
  fontSize: "5px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "6vw",
};

export default function Sideheader({ minimizeSideHeader }) {
  return (
    <div className="sideHeader">
      {sideHeaderNavigation.map((nav, index) => {
        return (
          <React.Fragment key={index}>
            {minimizeSideHeader ? (
              <>
                {index === 0 ? (
                  <div
                    style={{
                      backgroundColor: "rgb(230, 230, 230)",
                      fontWeight: "600",
                    }}
                    key={index}
                    className="sideHeaderTopic"
                  >
                    <img alt="side navbar logo" src={nav.img} />
                    <p>{nav.title}</p>
                  </div>
                ) : (
                  <div key={index} className="sideHeaderTopic">
                    <img alt="side navbar logo" src={nav.img} />
                    <p>{nav.title}</p>
                  </div>
                )}
                {index === 3 ? (
                  <>
                    <div key={index} className="sideHeaderTopic"></div>
                    <div>
                      <hr></hr>
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <>
                {index < 5 && (
                  <div
                    style={minimizesidebarstyle}
                    key={index}
                    className="sideHeaderTopic"
                  >
                    <img
                      style={{ paddingLeft: "0px" }}
                      alt="side navbar logo"
                      src={nav.img}
                    />
                    <p style={{ fontSize: "10px", paddingLeft: "0px" }}>
                      {nav.title}
                    </p>
                  </div>
                )}
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
