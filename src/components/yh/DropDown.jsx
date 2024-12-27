import React from "react";

const DropDown = ({ districts, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)} style={{ padding: "10px", marginBottom: "20px" }}>
      <option value="">전체 지역</option>
      {districts.map((district, index) => (
        <option key={index} value={district}>
          {district}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
