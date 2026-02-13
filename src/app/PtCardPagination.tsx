import * as React from 'react';
import { AppContext } from "./AppContext";

export const PtCardPagination = () => {

    const context = React.useContext(AppContext);

    const totalPages = Math.ceil(context.ptCards.length / context.cardPage.PageSize);

    const setCardPage = (pageNumber: number) => {

        if (pageNumber >= 1 && pageNumber <= totalPages) {
            context.setCardPage({
                ...context.cardPage,
                CurrentPage: pageNumber,
                NavigationDirection: pageNumber - context.cardPage.CurrentPage > 0 ? "desc" : "asc",
            })
        }

    }

    const pageSelection = [...Array(totalPages).keys()].map((pageNumber) => {
        
        let styling = "pagination-option cursor-pointer flex-1 py-2 border border-gray-600 text-center font-bold rounded"

        if (pageNumber+1 === context.cardPage.CurrentPage) {
            styling += " bg-blue-800 text-white"
        }
        else {
            styling += " hover:bg-gray-200"
        }

        return <div key={pageNumber} className={styling} onClick={() => setCardPage(pageNumber+1)}><div>{pageNumber+1}</div></div>

    })

    const leftNavBtnEnabledFlag = context.cardPage.CurrentPage !== 1;
    const rightNavBtnEnabledFlag = context.cardPage.CurrentPage !== totalPages;

    const getNavBtnClass = (navBtnEnabledFlag: boolean) => {
        
        let className = "pagination-nav border border-gray-600 font-bold py-2 rounded"

        if (navBtnEnabledFlag) {
            className += ' cursor-pointer hover:bg-gray-200'            
        }
        else {
            className += ' bg-gray-400'
        }

        return className

    }

    return (
        <div className="flex">
            <div className="flex-4 text-right">{ <button className={getNavBtnClass(leftNavBtnEnabledFlag)} onClick={() => setCardPage(context.cardPage.CurrentPage-1)}>{"<"}</button>}</div> 
            { pageSelection }
            <div className="flex-4 text-left">{ <button className={getNavBtnClass(rightNavBtnEnabledFlag)} onClick={() => setCardPage(context.cardPage.CurrentPage+1)}>{">"}</button>}</div>
        </div>
    )
}