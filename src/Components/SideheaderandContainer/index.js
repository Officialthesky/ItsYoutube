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
  fetchMoreSearchVideos,
  loadMore,
  searchQuery,
}) {
  return (
    <div className="sideHeaderAndContainer">
      <Sideheader minimizeSideHeader={minimizeSideHeader} />
      {hideContainer ? null : (
        <Container
          minimizeSideHeader={minimizeSideHeader}
          searchQuery={searchQuery}
        />
      )}

      {hideSearchcontainer ? null : (
        <Searchcontainer
          data={data}
          minimizeSideHeader={minimizeSideHeader}
          fetchMoreSearchVideos={fetchMoreSearchVideos}
          loadMore={loadMore}
        />
      )}
    </div>
  );
}
