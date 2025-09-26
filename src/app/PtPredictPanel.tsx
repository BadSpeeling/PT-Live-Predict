import * as React from 'react';
import { AppContext } from './AppContext'
import { PtCardListFilter } from './PtCardListFilter'
import { CardPrediction } from '../types'
import { PtCard } from './PtCard'

export const PtPredictPanel = () => {

    const context = React.useContext(AppContext);

    React.useEffect(() => {
        handleCardLoad();
    }, [])

    const handleCardLoad = async () => {
        const options = {
        method: "POST",
        headers: {
            'Content-Type':"application/json"
        },
        body: JSON.stringify({})
        }
        const getCardPredictions = await fetch('/api/pt-card-predicts', options)
        
        if (getCardPredictions.status === 200) {
            const cardPredictions = (await getCardPredictions.json()) as CardPrediction[]
            context.setCardPredictions(cardPredictions)
        }
        else {
          alert('Could not load cards!')
        }
    }

    const cardsBody = context.cardPredictions.map((card, index) => {
      return (
        <PtCard card={card} key={index} index={index} /> 
      );
    });

    return (
        <div>   
          <div className="rounded-md bg-white px-20 py-4 my-8 w-4/5 m-auto">
            <div className="font-serif">PT Live Predicting</div>
            <div>            
                <PtCardListFilter />
                <div>
                    {cardsBody}
                </div>
            </div>
          </div>
        </div>        
    )

}