import { PtPredictPlayer, PtCard, PtPredict } from "../../types"

export function mapFirebaseSnapshotToPtPredicts(ptCards: PtCard[]) {
    return ptCards.map(ptCard => createPtPredict(ptCard))
}

function createPtPredict(ptCard: PtCard) {
    return {
        CardID: ptCard.CardID,
        PtPredicts: [
            {
                PtCardID: ptCard.PtCardID,
                CardID: ptCard.CardID,
                LiveUpdateID: ptCard.LiveUpdateID,
                CardTitle: ptCard.CardTitle,
                CardValue: ptCard.CardValue,
                Position: ptCard.Position,
            }
        ] as PtPredict[]
    } as PtPredictPlayer
}
