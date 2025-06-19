export const getUserPredictsScript = (
    tierFilter: number[],
    teamFilter: number[],
    divisionFilter: number[],
    leagueFilter: number[],
    onlyRookiesFilter: boolean,
    onlyLastYearsAllstars: boolean,
    onlyLastYearsAwardWinners: boolean,
    pageCount: number,
    pageSize: number,
    userID: string,
) => `
    SELECT pt.PtCardID,pt.CardID,pt.LiveUpdateID,pt.CardTitle,pt.CardValue,pt.Position,pr.PredictedTier,pr.UserID
    FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY pt.CardID DESC) rn, pt.PtCardID
        FROM PtCard pt
        JOIN Player p ON pt.CardID = p.CardID 
        JOIN Division d ON p.TeamID = d.TeamID
        JOIN League l ON l.LeagueID = d.LeagueID
        WHERE 1=1
        ${tierFilter.length !== 0 ? `AND pt.tier IN (${tierFilter.join(',')})` : ''}
        ${teamFilter.length !== 0 ? `AND p.TeamID IN (${teamFilter.join(',')})` : ''}
        ${divisionFilter.length !== 0 ? `AND d.DivisionID IN (${divisionFilter.join(',')})` : ''}
        ${leagueFilter.length !== 0 ? `AND d.LeagueID IN (${leagueFilter.join(',')})` : ''}
        ${onlyRookiesFilter ? `AND p.IsRookieFlag` : ''}
        ${onlyLastYearsAllstars ? `AND p.IsLastYearAllstarFlag` : ''}
        ${onlyLastYearsAwardWinners ? `AND p.IsLastYearAwardWinnerFlag` : ''}
    ) ptCardPage
    JOIN PtCard pt ON ptCardPage.PtCardID = pt.PtCardID 
    JOIN PtCardPredict pr ON ptCardPage.PtCardID = pr.PtCardID
    WHERE rn BETWEEN (${((pageCount-1)*pageSize)+1},${((pageCount)*pageSize)})
    AND pr.UserID = '${userID}'
    ORDER BY pt.CardID ASC, pt.LiveUpdateID DESC;
`

export const insertUserPredictsScript = (
    ptCardID: number,
    predictedTier: number,
    userID: string,
) => `
    INSERT INTO PtCardPredict (PtCardID,Tier,UserID) VALUES (${ptCardID},${predictedTier},'${userID}');
`

export const updateUserPredictsScript = (
    ptCardPredictID: number,
    predictedTier: number,
) => `
    UPDATE PtCardPredict SET PredictedTier = ${predictedTier} WHERE PtCardPredictID = ${ptCardPredictID}
`