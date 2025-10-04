import * as React from 'react';
import { AppContext } from "./AppContext";

export const PtCardPagination = () => {

    const context = React.useContext(AppContext);

    const totalPages = Math.ceil(context.cardPredictions.length / context.cardPage.PageSize);

    const setCardPage = (pageNumber: number) => {
        context.setCardPage({
            ...context.cardPage,
            CurrentPage: pageNumber,
        })
    }

    const pageSelection = [...Array(totalPages).keys()].map((pageNumber) => <span onClick={() => setCardPage(pageNumber+1)}>{pageNumber+1}</span>)

    return (
        <div>
            <button onClick={() => setCardPage(context.cardPage.CurrentPage-1)}>Prev</button>
            {pageSelection}
            <button onClick={() => setCardPage(context.cardPage.CurrentPage+1)}>Next</button>
        </div>
    )
}