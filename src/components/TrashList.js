import React from 'react';
import '../styles/TrashSchedule.css';

function TrashList({trashSchedules, district}) {
    // detail 필드가 하나라도 존재하는지 확인
    const hasDetail = trashSchedules.some(item => item.detail !== null);

    return (
    <div className="trash-areas">
        <h2>{district === "default" ? "전체구" : district} 배출일 정보</h2>
        <div className="trash-list" id="trash-list">
          <table>
            <thead>
              <tr>
                {district === "default" ? <th>자치구</th> : null}
                {hasDetail ? <th>구분</th> : null}
                <th>생활 쓰레기 배출일</th>
                <th>음식물 쓰레기 배출일</th>
                <th>폐비닐 배출일</th>
                <th>재활용 쓰레기 배출일</th>
                <th>배출시간</th>
                <th>홈페이지</th>
              </tr>
            </thead>
            <tbody>
                {trashSchedules.length > 0 ? (
                    trashSchedules.map((item, index) => (
                        <tr key={index}>
                            {district === "default" ? <td>{item.district}</td> : null}
                            {hasDetail ? <td>{item.detail}</td> : null}
                            <td>{item.household}</td>
                            <td>{item.foodGarbage}</td>
                            <td>{item.plastic}</td>
                            <td>{item.recycle}</td>
                            <td>{item.emissionTime}</td>
                            <td>
                                <a href={item.homepage} target="_blank" rel="noopener noreferrer">
                                    홈페이지로 이동
                                </a>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan="3">No TrashSchedule found.</td>
                    </tr>
                )}
            </tbody>
          </table>
        </div>
    </div>
    )
}

export default TrashList;