import React, { useState } from "react";

import Pagenation from "react-js-pagination";


const Paging = () => {
    const [page,setPage]=useState(1);
    const handlePageChange = (page)=>{
        setPage(page);
    };


    return(
        <Pagenation>
            activePage={page}
            itemsCountPerPage ={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
        </Pagenation>
    );


};
export default Paging;