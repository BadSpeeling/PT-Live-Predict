import * as React from 'react';
import { AppContext } from './AppContext'
import { PtCardListFilter } from './PtCardListFilter'
import { PtCardPagination } from './PtCardPagination'
import { GetPtCardPredictsResponse } from '../types'
import { PtCard } from './PtCard'
import { sortPtCardList } from './lib/pt-card-helper'

export const PtPredictPanel = () => {

    const context = React.useContext(AppContext);

    React.useEffect(() => {
      if (context.selectedTeam.length > 0) {
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
            TeamFilter: context.selectedTeam.map((team) => team.value),
            LatestLiveUpdateID: context.currentLiveUpdateID,
          })
        }
        const getCardPredictions = await fetch('/api/pt-card-predicts', options)
        
        if (getCardPredictions.status === 200) {
            const getPtCardPredictsResponse = (await getCardPredictions.json()) as GetPtCardPredictsResponse
            const sortedCardPredictions = sortPtCardList(getPtCardPredictsResponse.CardPredictions)
            context.setCardPredictions(sortedCardPredictions)
        }
        else {
          alert('Could not load cards!')
        }
    }

    const cardsBody = context.cardPredictions.slice((context.cardPage.CurrentPage-1) * context.cardPage.PageSize, (context.cardPage.CurrentPage) * context.cardPage.PageSize).map((cardPrediction, index) => {
      return (
        <PtCard cardPrediction={cardPrediction} key={cardPrediction.CardID} /> 
      );
    });

    const showPaginationFlag = Math.ceil(context.cardPredictions.length / context.cardPage.PageSize) > 1

    return (
        <div>
            <WelcomePanel />   
            <PtCardListFilter />            
            <div>
                {cardsBody}
            </div>
            { showPaginationFlag && <PtCardPagination /> }
        </div>        
    )

}

export const WelcomePanel = () => {

  return (
    <div className="my-4">
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