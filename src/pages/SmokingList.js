import React from 'react';
import '../styles/SmokingArea.css';

function SmokingList({smokingAreas}) {
    return(
      <div className="smoking-areas">
          {smokingAreas.length > 0 ? (
              smokingAreas.map((area, index) => (
                  <div key={index} className="facility-card">
                    <p>📍 {area.address} {area.detail}</p>
                    <p>🚩 {area.open}</p>
                  </div>
                ))
              ) : (
                <div className="facility-info">
                  <p>No smoking areas found.</p>
                </div>
            )}
        {/* <div className="smoking-list">
          <table>
            <thead>
              <tr>
                <th>주소</th>
                <th>상세 주소</th>
                <th>시설형태</th>
              </tr>
            </thead>
            <tbody>
              {smokingAreas.length > 0 ? (
                smokingAreas.map((area, index) => (
                  <tr key={index}>
                    <td>{area.address}</td>
                    <td>{area.detail}</td>
                    <td>{area.open}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No smoking areas found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}
      </div>
    )
}

export default SmokingList;