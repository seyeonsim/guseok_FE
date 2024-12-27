function List({event}) {
    return ( 
        <>
        {/* 
        * 카테고리 category
        * 기간 event_date
        * 이미지 main_img
        * 기관 주소 org_link
        * 제목 title
        * 유/무료 isFree
        * 장소 place
        * 이용 연령 use_trgt
        
        */}
        <div style={{ overflowY: "auto" }}>
            {/* event 배열을 순회하며 각 항목을 렌더링 */}
            {event.map((item) => (
                <div key={item.no} style={{ padding: '10px', margin: '10px', cursor: 'pointer', border: '1px solid #ccc'}}>
                    <strong>{item.title}</strong>
                    <p>{item.place}</p>
                </div>
            ))}
        </div>
        </>
     );
}

export default List;