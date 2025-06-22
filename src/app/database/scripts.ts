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
	WITH LatestLiveUpdate AS (
		SELECT MAX(LiveUpdateID) val FROM LiveUpdate
	)
   SELECT pr.PtCardPredictID,pt.PtCardID,pt.CardID,pt.LiveUpdateID,pt.CardTitle,pt.CardValue,pt.Position,pr.PredictedTier,pr.UserID
    FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY pt.CardID ASC) rn, pt.CardID, pt.PtCardID
        FROM PtCard pt
        JOIN DivisionMember d ON pt.Team = d.Team
		JOIN LatestLiveUpdate lu ON pt.LiveUpdateID = lu.val
        WHERE 1=1
        ${tierFilter.length !== 0 ? `AND pt.tier IN (${tierFilter.join(',')})` : ''}
        ${teamFilter.length !== 0 ? `AND p.TeamID IN (${teamFilter.join(',')})` : ''}
        ${divisionFilter.length !== 0 ? `AND d.DivisionID IN (${divisionFilter.join(',')})` : ''}
        ${leagueFilter.length !== 0 ? `AND d.LeagueID IN (${leagueFilter.join(',')})` : ''}
        ${onlyRookiesFilter ? `AND p.IsRookieFlag` : ''}
        ${onlyLastYearsAllstars ? `AND p.IsLastYearAllstarFlag` : ''}
        ${onlyLastYearsAwardWinners ? `AND p.IsLastYearAwardWinnerFlag` : ''}
    ) ptCardPage
    JOIN PtCard pt ON ptCardPage.CardID = pt.CardID 
    LEFT JOIN PtCardPredict pr ON ptCardPage.PtCardID = pr.PtCardID
    WHERE 1=1
    AND rn BETWEEN ${((pageCount-1)*pageSize)+1} AND ${((pageCount)*pageSize)}
    AND IFNULL(pr.UserID,'') = ''
    ORDER BY pt.CardID ASC, pt.LiveUpdateID DESC;
`

export const insertUserPredictsScript = (
    ptCardID: number,
    predictedTier: number,
    userID: string,
) => `
    INSERT INTO PtCardPredict (PtCardID,PredictedTier,UserID) VALUES (${ptCardID},${predictedTier},'${userID}');
`

export const updateUserPredictsScript = (
    ptCardPredictID: number,
    predictedTier: number,
) => `
    UPDATE PtCardPredict SET PredictedTier = ${predictedTier} WHERE PtCardPredictID = ${ptCardPredictID}
`