import React from "react";

const ParkCard = ({ name }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
      }}
    >
      {name}
    </div>
  );
};

export default ParkCard;
