import { PtCard, PtPredict, CardPrediction, PtCardPrediction } from '../src/types'
import PtPredictDataFormatter from '../src/lib/PtPredictDataFormatter'

const basePtCard = {
    CardID:0,
    CardTitle:'',
    CardValue:0,
    CardType:0,
    CardSubType:0,
    CardBadge:'',
    CardSeries:'',
    Year:0,
    Peak:'',
    Team:'',
    Franchise:'',
    FirstName:'',
    LastName:'',
    NickName:'',
    UniformNumber:0,
    DayOB:0,
    MonthOB:0,
    YearOB:0,
    Bats:0,
    Throws:0,
    Position:0,
    PitcherRole:0,
    Contact:0,
    Gap:0,
    Power:0,
    Eye:0,
    AvoidKs:0,
    BABIP:0,
    ContactvL:0,
    GapvL:0,
    PowervL:0,
    EyevL:0,
    AvoidKvL:0,
    BABIPvL:0,
    ContactvR:0,
    GapvR:0,
    PowervR:0,
    EyevR:0,
    AvoidKvR:0,
    BABIPvR:0,
    GBHitterType:0,
    FBHitterType:0,
    BattedBallType:0,
    Speed:0,
    StealRate:0,
    Stealing:0,
    Baserunning:0,
    Sacbunt:0,
    Buntforhit:0,
    Stuff:0,
    Movement:0,
    Control:0,
    pHR:0,
    pBABIP:0,
    StuffvL:0,
    MovementvL:0,
    ControlvL:0,
    pHRvL:0,
    pBABIPvL:0,
    StuffvR:0,
    MovementvR:0,
    ControlvR:0,
    pHRvR:0,
    pBABIPvR:0,
    Fastball:0,
    Slider:0,
    Curveball:0,
    Changeup:0,
    Cutter:0,
    Sinker:0,
    Splitter:0,
    Forkball:0,
    Screwball:0,
    Circlechange:0,
    Knucklecurve:0,
    Knuckleball:0,
    Stamina:0,
    Hold:0,
    GB:0,
    Velocity:0,
    ArmSlot:0,
    Height:0,
    InfieldRange:0,
    InfieldError:0,
    InfieldArm:0,
    DP:0,
    CatcherAbil:0,
    CatcherFrame:0,
    CatcherArm:0,
    OFRange:0,
    OFError:0,
    OFArm:0,
    PosRatingP:0,
    PosRatingC:0,
    PosRating1B:0,
    PosRating2B:0,
    PosRating3B:0,
    PosRatingSS:0,
    PosRatingLF:0,
    PosRatingCF:0,
    PosRatingRF:0,
    LearnC:0,
    Learn1B:0,
    Learn2B:0,
    Learn3B:0,
    LearnSS:0,
    LearnLF:0,
    LearnCF:0,
    LearnRF:0,
    era:0,
    MissionValue:0,
    limit:0,
    owned:0,
    brefid:'',
    date:0,
    LiveUpdateID:0,
    PtCardID:0,
} as PtCard

test('Simple data load with 2 cards, 2 predicts', () => {

    const PtCard1 = {
        ...basePtCard,
        PtCardID: 1,
        CardID: 1,
        LiveUpdateID: 1,
        CardTitle: "Bryce Harper, DH",
        CardValue: 95,
        Position: 10,
    }

    const PtCard2 = {
        ...basePtCard,
        PtCardID: 2,
        CardID: 1,
        LiveUpdateID: 2,
        CardTitle: "Bryce Harper, 1B",
        CardValue: 100,
        Position: 3,
    }

    const PtPredict1 = {
        PtPredictID: 'abcd',
        PtCardID: 1,
        CardID: 1,
        LiveUpdateID: 1,
        PredictedTier: 4,
    }

    const PtPredict2 = {
        PtPredictID: 'efgh',
        PtCardID: 2,
        CardID: 1,
        LiveUpdateID: 2,
        PredictedTier: 5,
    }

    const ptCards = [PtCard1, PtCard2];

    const formatter = new PtPredictDataFormatter(ptCards, [PtPredict1, PtPredict2]);
    const ptPredictPlayers = formatter.getCardPredictions();

    const ptPredictPlayer1 = ptPredictPlayers.find(player => player.CardID == PtCard1.CardID);
    
    expect(ptPredictPlayer1).toBeTruthy();
    expect(ptPredictPlayer1!.PtCardPredictions.length).toBe(ptCards.length);

    const harper1 = ptPredictPlayer1!.PtCardPredictions.find(p => p.PtCardID == PtCard1.PtCardID)
    const harper2 = ptPredictPlayer1!.PtCardPredictions.find(p => p.PtCardID == PtCard2.PtCardID)

    expect(harper1).toBeTruthy();
    expect(harper2).toBeTruthy();

    checkPtPredictPtCard(harper2!, PtCard2, PtPredict2);
    checkPtPredictPtCard(harper1!, PtCard1, PtPredict1);

});

test('Load two different cards, 1 with a missing predict', () => {

    const PtCard1 = {
        ...basePtCard,
        PtCardID: 1,
        CardID: 1,
        LiveUpdateID: 1,
        CardTitle: "Bryce Harper, DH",
        CardValue: 95,
        Position: 10,
    }

    const PtCard2 = {
        ...basePtCard,
        PtCardID: 2,
        CardID: 1,
        LiveUpdateID: 2,
        CardTitle: "Bryce Harper, 1B",
        CardValue: 100,
        Position: 3,
    }

    const PtCard3 = {
        ...basePtCard,
        PtCardID: 3,
        CardID: 2,
        LiveUpdateID: 1,
        CardTitle: "Trea Turner, SS",
        CardValue: 95,
        Position: 6,
    }

    const PtCard4 = {
        ...basePtCard,
        PtCardID: 4,
        CardID: 2,
        LiveUpdateID: 2,
        CardTitle: "Trea Turner, SS",
        CardValue: 92,
        Position: 6,
    }

    const PtPredict1 = {
        PtPredictID: 'abcd',
        PtCardID: 1,
        CardID: 1,
        LiveUpdateID: 1,
        PredictedTier: 4,
    }

    const PtPredict2 = {
        PtPredictID: 'efgh',
        PtCardID: 2,
        CardID: 1,
        LiveUpdateID: 2,
        PredictedTier: 5,
    }

    const PtPredict4 = {
        PtPredictID: 'asdfsd',
        PtCardID: 4,
        CardID: 2,
        LiveUpdateID: 2,
        PredictedTier: 3,
    }

    const ptCards = [PtCard1, PtCard2, PtCard3, PtCard4];

    const formatter = new PtPredictDataFormatter(ptCards, [PtPredict1, PtPredict2, PtPredict4]);
    const ptPredictPlayers = formatter.getCardPredictions();

    const ptPredictPlayer1 = ptPredictPlayers.find(player => player.CardID == PtCard3.CardID);
    
    expect(ptPredictPlayer1).toBeTruthy();
    expect(ptPredictPlayer1!.PtCardPredictions.length).toBe(2);

    const turnerNoPredict = ptPredictPlayer1!.PtCardPredictions.find(p => p.PtCardID == PtCard3.PtCardID)
    const turnerPredict = ptPredictPlayer1!.PtCardPredictions.find(p => p.PtCardID == PtCard4.PtCardID)

    expect(turnerNoPredict).toBeTruthy();
    expect(turnerPredict).toBeTruthy();

    checkPtPredictPtCard(turnerPredict!, PtCard4, PtPredict4);
    expect(turnerNoPredict!.PredictedTier).toBeFalsy();

})

function checkPtPredictPtCard (player: PtCardPrediction, ptCard: PtCard, ptPredict: PtPredict) {

    expect(player.CardID).toBe(ptCard.CardID);
    expect(player.PtPredictID).toBe(ptPredict.PtPredictID);
    expect(player.PtCardID).toBe(ptCard.PtCardID);
    expect(player.LiveUpdateID).toBe(ptCard.LiveUpdateID);
    expect(player.CardTitle).toBe(ptCard.CardTitle);
    expect(player.CardValue).toBe(ptCard.CardValue);
    expect(player.Position).toBe(ptCard.Position);
    expect(player.PredictedTier).toBe(ptPredict.PredictedTier);

}
