import * as React from 'react';
import { AppContext } from './AppContext'
import { PtCardListFilter } from './PtCardListFilter'
import { PtCardPagination } from './PtCardPagination'
import { GetPtCardPredictsResponse } from '../types'
import { PtCard } from './PtCard'
import { sortPtCardList } from './lib/pt-card-helper'
import { toast, ToastContainer } from 'react-toastify';

export const PtPredictPanel = () => {

    const context = React.useContext(AppContext);

    React.useEffect(() => {
      if (context.selectedTeam.value) {
        handleCardLoad();
      }
    }, [context.selectedTeam])

    const handleCardLoad = async () => {
        const options = {
          method: "POST",
          headers: {
              'Content-Type':"application/json"
          },
          body: JSON.stringify({
            TeamFilter: context.selectedTeam.value,
            LatestLiveUpdateID: context.currentLiveUpdateID,
          })
        }
        const getCardPredictions = await fetch('/api/pt-card-predicts', options)
        
        if (getCardPredictions.status === 200) {
            const getPtCardPredictsResponse = (await getCardPredictions.json()) as GetPtCardPredictsResponse

            if (getPtCardPredictsResponse.PtCards.length > 0) {
            
              const sortedCardPredictions = sortPtCardList(getPtCardPredictsResponse.PtCards)
              context.setPtCards(sortedCardPredictions)
              context.setCardPage({
                ...context.cardPage,
                CurrentPage: 1,
              })

            }

        }
        else {
          toast('Could not load cards!');
        }
    }

    const cardsBody = context.ptCards.slice((context.cardPage.CurrentPage-1) * context.cardPage.PageSize, (context.cardPage.CurrentPage) * context.cardPage.PageSize).map((ptCard, index) => {
      return (
        <PtCard ptCard={ptCard} key={ptCard.CardID} /> 
      );
    });

    const showPaginationFlag = Math.ceil(context.ptCards.length / context.cardPage.PageSize) > 1

    return (
        <div>
            <ToastContainer />
            <WelcomePanel />   
            <PtCardListFilter />            
            <div>
              <div className="flex flex-wrap justify-around">
                  {cardsBody}
              </div>
            </div>
            { showPaginationFlag && <PtCardPagination /> }
        </div>        
    )

}

export const WelcomePanel = () => {

  return (
    <div className="welcome-text my-4">
      <p className="mb-2 text-xl">
        Welcome to PT Live Predicting!
      </p>
      <p className="mb-2">
        This is a website about predicting which Perfect Team cards will have their tier promoted or demoted in an upcoming Live Update.
      </p>
      <p className="mb-2">
        To get started, select a team to view their live cards.
      </p>
      <p className="mb-2">
        Once looking at a team navigate to a card for which you would like to make a prediction. Select the card tier under a card to which you think the card will be promoted or demoted. 
      </p>
    </div>
  )

}