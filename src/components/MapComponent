import React from "react";

const MapComponent = ({parks}) => {
  return (
    <div
      style={{
        height: "100%",
        bakcgroundColor: "#f0f0f0"    
    }}>
      <h3>지도</h3>
      <ul>
        {parks.map((park) => (
          <li key={park.id}>{park.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MapComponent;