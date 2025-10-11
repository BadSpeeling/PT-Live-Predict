import * as React from 'react';
import { AppContext } from "./AppContext";

export const PtCardPagination = () => {

    const context = React.useContext(AppContext);

    const totalPages = Math.ceil(context.cardPredictions.length / context.cardPage.PageSize);

    const setCardPage = (pageNumber: number) => {

        if (pageNumber >= 1 && pageNumber <= totalPages) {
            context.setCardPage({
                ...context.cardPage,
                CurrentPage: pageNumber,
            })
        }

    }

    const pageSelection = [...Array(totalPages).keys()].map((pageNumber) => {
        
        let styling = "cursor-pointer flex-1 mx-6 px-2 border border-gray-600 text-center font-bold py-2 rounded"

        if (pageNumber+1 === context.cardPage.CurrentPage) {
            styling += " bg-blue-800 text-white"
        }
        else {
            styling += " hover:bg-gray-200"
        }

        return <span key={pageNumber} className={styling} onClick={() => setCardPage(pageNumber+1)}>{pageNumber+1}</span>

    })

    const showLeftNavBtn = context.cardPage.CurrentPage !== 1;
    const showRightNavBtn = context.cardPage.CurrentPage !== totalPages;

    return (
        <div className="flex">
            { showLeftNavBtn && <div className="flex-1 text-right"><button className="cursor-pointer border border-gray-600 hover:bg-gray-200 font-bold py-2 px-4 rounded" onClick={() => setCardPage(context.cardPage.CurrentPage-1)}>{"<"}</button></div> }
            <div className="flex-1"><div className="items-center flex">{pageSelection}</div></div>
            { showRightNavBtn && <div className="flex-1 text-left"><button className="cursor-pointer border border-gray-600 hover:bg-gray-200 font-bold py-2 px-4 rounded" onClick={() => setCardPage(context.cardPage.CurrentPage+1)}>{">"}</button></div> }
        </div>
    )
}