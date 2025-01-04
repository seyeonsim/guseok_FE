import React from 'react';
import '../styles/SmokingArea.css';

function SmokingNav({Title, districts, selectedDistrict, onDistrictChange, onReset}) {
    return(
      <div className="nav-container">
        <h2>{Title} 정보</h2>
        <div className="select-list">
          {/* <p>구를 선택하세요 </p> */}
          <form className="nav-left">
            <select
              name="districts"
              id="district"
              value={selectedDistrict}
              onChange={(e) => onDistrictChange(e.target.value)} // 선택된 값에 따라 추가 작업 수행
            >
              <option className="dropdown-option" value="default">✔️ 지역</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>{district}</option>
              ))}
            </select>
          </form>
          <div className="nav-right">
            <button type="submit" onClick={onReset}>🔄 초기화</button>
          </div>
        </div>
      </div>
    )
}

export default SmokingNav;