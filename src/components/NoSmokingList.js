import React from 'react';
import '../styles/SmokingArea.css';

function SmokingList({nosmokingAreas, onListClick}) {
    return(
      <div className="smoking-areas">
          {nosmokingAreas.length > 0 ? (
              nosmokingAreas.map((area, index) => (
                  <div 
                    key={index}
                    className="facility-card"
                    onClick={() => onListClick(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <p>📍 {area.address}</p>
                    <p>범위: {area.scope}</p>
                    <p>🧾 위반 과태료: {Number(area.fine).toLocaleString()} 원</p>
                    <p>지정 근거명: {area.statute}</p>
                  </div>
                ))
              ) : (
                <div className="facility-info">
                  <p>No No-smoking areas found.</p>
                </div>
            )}
      </div>
    )
}

export default SmokingList;