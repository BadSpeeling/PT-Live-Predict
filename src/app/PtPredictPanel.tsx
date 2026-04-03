import * as React from 'react';
import { AppContext } from './AppContext'
import { PtCardListFilter } from './PtCardListFilter'
import { PtCardPagination } from './PtCardPagination'
import { GetPtCardPredictsRequest, GetPtCardPredictsResponse, GetPtCardResultingTierRequest, GetPtCardResultingTierResponse, CallServer, GridMode, Tier } from '../types'
import { PtCardPrediction } from './PtCardPrediction'
import { PtCardResultingTier } from './PtCardResultingTier'
import { toast, ToastContainer } from 'react-toastify';
import { GridStatus } from './GridStatus'
import { liveUpdates } from '../types/data'

export const PtPredictPanel = () => {

    const context = React.useContext(AppContext);

    React.useEffect(() => {
      if (context.pageState.GridMode === GridMode.PtCard) {
        if (context.pageState.CallServer === CallServer.GetStandard) {          
            handleCardLoad(true);
        }
        else if (context.pageState.CallServer === CallServer.GetPaginated) {   
            handleCardLoad(false);
        }
      }
      else if (context.pageState.GridMode === GridMode.ResultingTier) {
        if (context.pageState.CallServer === CallServer.GetStandard) {          
            handlePtCardResultingTierLoad(true);
        }
        else if (context.pageState.CallServer === CallServer.GetPaginated) {   
            handlePtCardResultingTierLoad(false);
        }
      }
    }, [context.pageState.CallServer])
    
    const getLoadedData = () => {
      switch (context.pageState.GridMode) {
        case GridMode.PtCard:
          return context.ptCardsPrediction;
        case GridMode.ResultingTier:
          return context.ptCardsResultingTier;
      }
    }

    const loadedData = getLoadedData();

    const getLastPtCardID = () => {
      if (loadedData === null || loadedData.Cards.length === 0) {
        return null;
      }
      else {
        return context.cardPage.NavigationDirection === "asc" ? loadedData.Cards[0].PtCardID : loadedData.Cards[loadedData.Cards.length-1].PtCardID;
      }
    }

    const getPageState = () => {
      switch (context.pageState.CallServer) {
        case CallServer.GetStandard:
          return {
            ...context.cardPage,
            CurrentPage: 1,
          };
        case CallServer.GetPaginated:
          return {
            ...context.cardPage,
            CurrentPage: context.cardPage.CurrentPage + (context.cardPage.NavigationDirection === 'desc' ? 1 : -1),
          };
        default:
          return context.cardPage;
      }
    }

    const handleCardLoad = async (ignoreLastPtCardID: boolean) => {
        const queryLiveUpdateID = context.currentLiveUpdateID;
        const options = {
          method: "POST",
          headers: {
              'Content-Type':"application/json"
          },
          body: JSON.stringify({
            TeamFilter: context.ptCardFilters.selectedTeam.value ? context.ptCardFilters.selectedTeam.value : null,
            TierFilter: context.ptCardFilters.selectedTier.value ? parseInt(context.ptCardFilters.selectedTier.value) : null,
            NameFilter: context.ptCardFilters.enteredName.FirstName && context.ptCardFilters.enteredName.LastName ? context.ptCardFilters.enteredName : null,
            LiveUpdateID: queryLiveUpdateID,
            NavigationDirection: context.cardPage.NavigationDirection,
            LastPtCardID: !ignoreLastPtCardID ? getLastPtCardID() : null,
            PageSize: context.cardPage.PageSize,
          } as GetPtCardPredictsRequest)
        }
        context.setIsLoading(true);
        const getCardPredictions = await fetch('/api/pt-card-predicts', options)
        
        if (getCardPredictions.status === 200) {
            
          const getPtCardPredictsResponse = (await getCardPredictions.json()) as GetPtCardPredictsResponse

          const liveUpdate = liveUpdates.find(liveUpdate => liveUpdate.LiveUpdateID === queryLiveUpdateID)!;

          context.setPtCardsPrediction({            
            Cards: getPtCardPredictsResponse.PtCards,
            CardTotal: getPtCardPredictsResponse.PtCardCount,
            LiveUpdate: liveUpdate,
          });  
          context.setCardPage(getPageState());

        }
        else {
          toast('Could not load cards!');
        }
        context.setIsLoading(false);
        context.setPageState({
          ...context.pageState,
          CallServer: CallServer.None,
        });

    }

    const handlePtCardResultingTierLoad = async (ignoreLastPtCardID: boolean) => {
        const queryLiveUpdateID = parseInt(context.ptCardFilters.selectedLiveUpdate.value);
        const options = {
          method: "POST",
          headers: {
              'Content-Type':"application/json"
          },
          body: JSON.stringify({
            TeamFilter: context.ptCardFilters.selectedTeam.value ? context.ptCardFilters.selectedTeam.value : null,
            TierFilter: context.ptCardFilters.selectedTier.value ? parseInt(context.ptCardFilters.selectedTier.value) : null,
            NameFilter: context.ptCardFilters.enteredName.FirstName && context.ptCardFilters.enteredName.LastName ? context.ptCardFilters.enteredName : null,
            LiveUpdateID: queryLiveUpdateID,
            NavigationDirection: context.cardPage.NavigationDirection,
            LastPtCardID: !ignoreLastPtCardID ? getLastPtCardID() : null,
            PageSize: context.cardPage.PageSize,
          } as GetPtCardResultingTierRequest)
        }
        context.setIsLoading(true);
        const getCardPredictions = await fetch('/api/pt-cards-resulting-tier', options)
        
        if (getCardPredictions.status === 200) {
            
          const getPtCardResultingTierResponse = (await getCardPredictions.json()) as GetPtCardResultingTierResponse

          const liveUpdate = liveUpdates.find(liveUpdate => liveUpdate.LiveUpdateID === queryLiveUpdateID)!;

          context.setPtCardsResultingTier({            
            Cards: getPtCardResultingTierResponse.PtCardsResultingTier,
            CardTotal: getPtCardResultingTierResponse.PtCardCount,
            LiveUpdate: liveUpdate,
          });
          context.setCardPage(getPageState());       

        }
        else {
          toast('Could not load cards!');
        }

        context.setIsLoading(false);
        context.setPageState({
          ...context.pageState,
          CallServer: CallServer.None,
        });

    }

    const getCardsBody = () => {

      switch (context.pageState.GridMode) {
        case GridMode.PtCard:
          return context.ptCardsPrediction?.Cards.map((ptCard) => <PtCardPrediction ptCardPrediction={ptCard} key={ptCard.PtCardID} />);
        case GridMode.ResultingTier:
          return context.ptCardsResultingTier?.Cards.map((ptCardResultingTier) => <PtCardResultingTier ptCardResultingTier={ptCardResultingTier} key={ptCardResultingTier.PtCardID} />) 
      }

    }

    const totalPages = Math.ceil((loadedData?.CardTotal ?? 0) / context.cardPage.PageSize);

    return (
      <>
        { context.isLoading ? <div className="fixed loader-wrapper"><div className="loader"></div></div> : <></>}
        <ToastContainer />
        <WelcomePanel />   
        <PtCardListFilter />            
        {  
          (loadedData && <div>
            {<GridStatus hasDataFlag={loadedData.CardTotal > 0} liveUpdate={loadedData.LiveUpdate}/>}
            <div className="flex flex-wrap justify-around">
              {getCardsBody()}
            </div>
          </div>)
        }
        { totalPages > 1 && <PtCardPagination totalPages={totalPages}/> }
      </>
    )

}

const WelcomePanel = () => {

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

const NoCardsPanel = () => {
  return <div><span>No cards could be loaded, check your filters.</span></div>
}