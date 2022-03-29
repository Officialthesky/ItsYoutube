import React from "react";
import Sideheader from "../Sideheader";
import Container from "../Container";
import Searchcontainer from "../Searchcontainer";
import "./index.css";

export default function SideheaderandContainer({
  minimizeSideHeader,
  hideContainer,
  hideSearchcontainer,
  data,
}) {
  return (
    <div className="sideHeaderAndContainer">
      <Sideheader minimizeSideHeader={minimizeSideHeader} />
      {hideContainer ? null : (
        <Container minimizeSideHeader={minimizeSideHeader} />
      )}

      {hideSearchcontainer ? null : (
        <Searchcontainer data={data} minimizeSideHeader={minimizeSideHeader} />
      )}
    </div>
  );
}
