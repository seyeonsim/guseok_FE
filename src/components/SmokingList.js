import React from 'react';
import '../styles/SmokingArea.css';

function SmokingList({smokingAreas, onListClick}) {
    return(
      <div className="smoking-areas">
          {smokingAreas.length > 0 ? (
              smokingAreas.map((area, index) => (
                  <div 
                    key={index}
                    className="facility-card"
                    onClick={() => onListClick(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <p>📍 {area.address} {area.detail}</p>
                    <p>🚩 {area.open}</p>
                  </div>
                ))
              ) : (
                <div className="facility-info">
                  <p>No smoking areas found.</p>
                </div>
            )}
      </div>
    )
}

export default SmokingList;