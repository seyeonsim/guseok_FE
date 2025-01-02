import { useEffect, useRef } from "react";

function List({ event, selectedEvent, onListClick }) {
    const listRefs = useRef({});
    

    useEffect(() => {
        if (selectedEvent?.no) {
            const ref = listRefs.current[selectedEvent.no];
            if (ref) {
                ref.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [selectedEvent]);


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
        <div style={{ overflowY: "auto", height: "70vh" }}>
            {/* event 배열을 순회하며 각 항목을 렌더링 */}
            {event.map((item) => (
                <div
                key={item.no}
                ref={(el) => (listRefs.current[item.no] = el)}
                style={{ 
                    display: "flex",
                    padding: '10px', margin: '10px',
                    cursor: 'pointer',
                    border: selectedEvent.no === item.no ? '2px solid red' : '1px solid #ccc'}}
                onClick={() => onListClick(item)}
                >
                    <div>
                        <img src={item.main_img} alt="" />
                    </div>
                    <div>
                        <strong>{item.title}</strong>
                        <p>{item.place}</p>
                    </div>
                </div>
            ))}
        </div>
        </>
     );
}

export default List;