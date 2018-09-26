import React from 'react';


const style = {
    position: 'fixed',
    left: 0,
    right:0,
    top: 0,
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 1000
}
const InvesmentDetail = ({match}) => {

    return (
        <div style={style}>{match.params.id}</div>
    )
}
export default InvesmentDetail;