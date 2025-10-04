import * as React from 'react';
import { AppContext } from './AppContext'
import { PtCardListFilter } from './PtCardListFilter'
import { PtCardPagination } from './PtCardPagination'
import { GetPtCardPredictsResponse } from '../types'
import { PtCard } from './PtCard'

export const PtPredictPanel = () => {

    const context = React.useContext(AppContext);

    React.useEffect(() => {
        handleCardLoad();
    }, [context.selectedTeam])

    const handleCardLoad = async () => {
        const options = {
          method: "POST",
          headers: {
              'Content-Type':"application/json"
          },
          body: JSON.stringify({
            TeamFilter: context.selectedTeam.map((team) => team.value),
            LatestLiveUpdateID: 6,
          })
        }
        const getCardPredictions = await fetch('/api/pt-card-predicts', options)
        
        if (getCardPredictions.status === 200) {
            const getPtCardPredictsResponse = (await getCardPredictions.json()) as GetPtCardPredictsResponse
            context.setCardPredictions(getPtCardPredictsResponse.CardPredictions)
        }
        else {
          alert('Could not load cards!')
        }
    }

    const cardsBody = context.cardPredictions.slice((context.cardPage.CurrentPage-1) * context.cardPage.PageSize, (context.cardPage.CurrentPage) * context.cardPage.PageSize).map((cardPrediction, index) => {
      return (
        <PtCard cardPrediction={cardPrediction} key={index} /> 
      );
    });

    return (
        <div>   
          <div className="rounded-md bg-white px-20 py-4 my-8 w-4/5 m-auto">
            <div className="font-serif">PT Live Predicting</div>
            <div>            
                <PtCardListFilter />
                <PtCardPagination />
                <div>
                    {cardsBody}
                </div>
            </div>
          </div>
        </div>        
    )

}