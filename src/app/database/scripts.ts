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
    sessionID: string,
) => `
	WITH LatestLiveUpdate AS (
		SELECT MAX(LiveUpdateID) val FROM LiveUpdate
	)
   SELECT pr.PtCardPredictID,pt.PtCardID,pt.CardID,pt.LiveUpdateID,pt.CardTitle,pt.CardValue,pt.Position,pr.PredictedTier
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
    LEFT JOIN PtCardPredict pr ON pt.PtCardID = pr.PtCardID
    LEFT JOIN Account a ON pr.AccountID = a.AccountID
    LEFT JOIN Session s ON a.AccountID = s.AccountID AND s.SessionID = '${sessionID}'
    WHERE 1=1
    AND rn BETWEEN ${((pageCount-1)*pageSize)+1} AND ${((pageCount)*pageSize)}
    ORDER BY pt.CardID ASC, pt.LiveUpdateID DESC;
`

export const insertUserPredictsScript = (
    ptCardID: number,
    predictedTier: number,
    sessionID: string,
) => `
    INSERT INTO PtCardPredict (PtCardID,PredictedTier,AccountID)
    SELECT ${ptCardID},${predictedTier},a.AccountID
    FROM Account a
    JOIN Session s ON a.AccountID = s.AccountID
    WHERE SessionID = '${sessionID}'
`

export const updateUserPredictsScript = (
    ptCardID: number,
    predictedTier: number,
    sessionID: string
) => `
    UPDATE PtCardPredict
    SET PredictedTier = ${predictedTier}
    WHERE PtCardID = ${ptCardID} AND AccountID = (
        SELECT a.AccountID
        FROM Account a
        JOIN Session s ON a.AccountID = s.AccountID
        WHERE s.SessionID = '${sessionID}'
    )
`

export const getAccountScript = (
    authenticatedUserID: string
) => `
    SELECT AccountID,DisplayName FROM Account WHERE AuthenticatedUserID = '${authenticatedUserID}'
`

export const getAccountBySessionScript = (
    sessionID: string
) => `
    SELECT a.DisplayName
    FROM Session s
    JOIN Account a ON s.AccountID = a.AccountID
    WHERE s.SessionID = '${sessionID}'
`

export const insertAccountScript = (
    authenticatedUserID: string
) => `
    INSERT INTO Account (AuthenticatedUserID,DisplayName) VALUES ('${authenticatedUserID}','New User')
`

export const updateAccountDisplayNameScript = (
    authenticatedUserID: string,
    displayName: string
) => `
    UPDATE Account SET DisplayName = '${displayName}' WHERE AuthenticatedUserID = '${authenticatedUserID}'
`

export const getSession = (
    sessionID: string
) => `
    SELECT 1 FROM Session WHERE SessionID = '${sessionID}'
`

export const insertSession = (
    sessionID: string,
    accountID: number
) => `
    INSERT INTO Session (SessionID,AccountID) VALUES ('${sessionID}', ${accountID})
`