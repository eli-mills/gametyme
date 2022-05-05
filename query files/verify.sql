-- Use whenever making changes to Schema or sample data to verify correct changes.

-- Locations
SELECT * FROM Locations;


-- Genres
SELECT * FROM Genres;


-- Companies
SELECT Companies.company_id, Companies.company_name, Locations.city, Locations.state, Locations.country
FROM Companies JOIN Locations
ON Companies.location_id=Locations.location_id;


-- Platforms
SELECT Platforms.platform_id, Platforms.platform_name, Companies.company_name
FROM Platforms JOIN Companies
ON Platforms.company_id=Companies.company_id;


-- Games
SELECT Games.game_id, Games.game_title, Games.game_summary, Games.release_date, 
GROUP_CONCAT(Platforms.platform_name ORDER BY Platforms.platform_name ASC SEPARATOR ', ') AS 'Platforms'
FROM Games JOIN GamesPlatforms ON Games.game_id=GamesPlatforms.game_id
JOIN Platforms ON GamesPlatforms.platform_id=Platforms.platform_id
GROUP BY Games.game_id;


-- Users
SELECT * FROM Users;


-- Playthroughs
SELECT Playthroughs.playthrough_id, Playthroughs.start_timestamp, Playthroughs.finish_timestamp, Users.username, Games.game_title
FROM Playthroughs JOIN Users ON Playthroughs.user_id=Users.user_id
JOIN Games ON Playthroughs.game_id=Games.game_id;


-- Sessions
SELECT Sessions.session_id, Sessions.session_start, Sessions.session_end, Users.username, Games.game_title, Playthroughs.start_timestamp
FROM Sessions JOIN Playthroughs ON Sessions.playthrough_id=Playthroughs.playthrough_id
JOIN Users ON Playthroughs.user_id=Users.user_id
JOIN Games ON Playthroughs.game_id=Games.game_id;