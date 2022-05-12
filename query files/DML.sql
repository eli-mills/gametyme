-- Genres page

    -- Load Genres table
    SELECT * FROM Genres;

    -- Add new Genre
    INSERT INTO Genres (genre_name)
    VALUES (:genre_name);

    -- Edit Genre
    UPDATE Genres 
    SET genre_name=:genre_name 
    WHERE genre_id=:genre_id;

    -- Delete Genre
    DELETE Genres
    WHERE genre_id=:genre_id
    AND genre_name=:genre_name;



-- Locations page

    -- Load Locations table
    SELECT * FROM Locations;

    -- Add new Location
    INSERT INTO Locations (city, state, country)
    VALUES (:city, :state, :country);

    -- Edit Location
    UPDATE Locations
    SET city=:city, state=:state, country=:country
    WHERE location_id=:location_id;

    -- Delete Location
    DELETE Locations
    WHERE location_id=:location_id
    AND city=:city
    AND state=:state
    AND country=:country;



-- Companies page

    -- Load Companies table
    SELECT * FROM Companies;

    -- Add new Company
    INSERT INTO Companies (company_name, location_id)
    VALUES (:company_name, :location_id);

    -- Edit Company
    UPDATE Companies
    SET company_name=:company_name, location_id=:location_id
    WHERE company_id=:company_id;

    -- Delete Company
    DELETE Companies
    WHERE company_id=:company_id
    AND company_name=:company_name;



-- Platforms page

    -- Load Platforms table
    SELECT * FROM Platforms;

    -- Add new Platform
    INSERT INTO Platforms (platform_name, company_id)
    VALUES (:platform_name, (SELECT company_id FROM Companies WHERE company_name=:company_name));

    -- Edit Platform
    UPDATE Platforms
    SET platform_name=:platform_name, company_id=(SELECT company_id FROM Companies WHERE company_name=:company_name)
    WHERE platform_id=:platform_id;

    -- Delete Platform
    DELETE Platforms
    WHERE platform_id=:platform_id
    AND platform_name=:platform_name;



-- Games page

    -- Load Games table
    SELECT Games.game_id AS 'Game ID', Games.game_title AS 'Game Title', Games.game_summary AS 'Game Summary', Games.release_date AS 'Release Date', 
    Companies.company_name AS 'Company', Genres.genre_name AS 'Genre', 
    GROUP_CONCAT(Platforms.platform_name ORDER BY Platforms.platform_name ASC SEPARATOR ', ') AS 'Platforms'
    FROM Games JOIN GamesPlatforms ON Games.game_id=GamesPlatforms.game_id
    JOIN Platforms ON GamesPlatforms.platform_id=Platforms.platform_id
    JOIN Companies ON Games.company_id=Companies.company_id
    JOIN Genres ON Games.genre_id=Genres.genre_id
    GROUP BY Games.game_id;
    -- SOURCES CITED:
    -- The above uses syntax found from tutorialspoint.com, written by Chandu yadav. This can be found here. https://www.tutorialspoint.com/combining-multiple-rows-into-a-comma-delimited-list-in-mysql
    -- This query creates a concatenated column that is used to list out all platform_ids for a particular game separated by commas. 
    -- Within each concatenated cell, the platform_ids are sorted in ascending order using an ORDER BY clause.
    -- The column is aliased as "Platforms".
    -- This makes it easier to read, rather than having a separate row for each Game/Platform combination.

    -- Load filter options depending on dropdown selection. :table = name of table, :table_id = name of PK attribute, :table_name = name of 
    -- name/title attribute.
    SELECT :table_id, :table_name FROM :table; 

    -- Search Games based on chosen filter. :table_id = name of id attribute, :row_id = actual value of selected row's PK ID
    SELECT * FROM Games
    WHERE :table_id = :row_id;

    -- Load Company options for adding new Game
    SELECT company_id, company_name FROM Companies;

    -- Load Genre options for adding new Game
    SELECT genre_id, genre_name FROM Genres;

    -- Load Platform options for adding new Game
    SELECT platform_id, platform_name FROM Platforms;

    -- Add new Game
    INSERT INTO Games (game_title, game_summary, release_date, company_id, genre_id)
    VALUES (:game_title, :game_summary, :release_date, 
        (SELECT company_id FROM Companies WHERE company_name=:company_name), 
        (SELECT genre_id FROM Genres WHERE genre_name=:genre_name)
    );

    -- Insert GamePlatform: To be used in a JS loop to create the appropriate number of GamesPlatforms selected
    INSERT INTO GamesPlatforms (game_id, platform_id)
    VALUES (:game_id, :platform_id);

    -- Edit Game
    UPDATE Games
    SET game_title=:game_title, game_summary=:game_summary, release_date=:release_date, 
        company_id=(SELECT company_id FROM Companies WHERE company_name=:company_name),
        genre_id=(SELECT genre_id FROM Genres WHERE genre_name=:genre_name)
    WHERE game_id=:game_id;

    -- Will use Javascript to determine which GamesPlatforms need to be added and which need to be removed after each edit.
    -- Assuming we have a list of GamesPlatforms to delete, and another list of GamesPlatforms to insert. Will use following 
    -- queries in a loop to handle all of the updates.

    -- Insert GamePlatform: same query as above for adding new Game

    -- Delete GamePlatform
    DELETE GamesPlatforms
    WHERE game_id=:game_id AND platform_id=:platform_id;

    -- Delete Game. GamesPlatforms entries will automatically be CASCADED.
    DELETE Games
    WHERE game_id=:game_id;



-- Playthroughs page

    -- Load all existing Playthroughs (Playthroughs Page)
    SELECT * FROM Playthroughs;

    -- Begin (Add) New Playthrough
    INSERT INTO Playthroughs (start_timestamp, user_id, game_id)
    VALUES (NOW(), :user_id, (SELECT game_id FROM Games WHERE game_title=:game_title));

    -- Edit Playthrough
    UPDATE Playthroughs
    SET start_timestamp=:start_timestamp, finish_timestamp=:finish_timestamp, game_id=(SELECT game_id FROM Games WHERE game_title=:game_title)
    WHERE playthrough_id=:playthrough_id;

    -- Finish Playthrough button
    UPDATE Playthroughs
    SET finish_timestamp=NOW()
    WHERE playthrough_id=:playthrough_id;

    -- Delete Playthrough
    DELETE Playthroughs
    WHERE playthrough_id=:playthrough_id
    AND game_id = (SELECT game_id FROM Games WHERE game_title=:game_title)
    AND start_timestamp=:start_timestamp
    AND finish_timestamp=:finish_timestamp;



-- Sessions (Playthroughs page)

    -- Load all existing Sessions (Playthroughs page) and include summary column of number of hours played.
    SELECT session_id, TIMESTAMPDIFF(HOUR, session_start, session_end) AS 'Time Played', session_start, session_end, playthrough_id FROM Sessions;

    -- Start New Session
    INSERT INTO Sessions (session_start, playthrough_id)
    VALUES (NOW(), :playthrough_id);

    -- Edit Session
    UPDATE Sessions
    SET session_start=:session_start, session_end=:session_end
    WHERE session_id=:session_id;

    -- Delete Session
    DELETE Sessions
    WHERE session_id=:session_id
    AND session_start=:session_start
    AND session_end=:session_end;



-- Users page

    -- Load User info on login
    SELECT * FROM Users WHERE email=:email;

    -- Add new User
    INSERT INTO Users (first_name, last_name, username, email)
    VALUES (:first_name, :last_name, :username, :email);

    -- Update User info on Profile page
    UPDATE Users
    SET first_name=:first_name, last_name=:last_name, username=:username, email=:email
    WHERE user_id=:user_id;

    -- Delete User on Profile page
    DELETE Users
    WHERE user_id=:user_id
    AND username=:username
    AND email=:email;

    

-- Home page
    -- Load active Playthroughs (Home Page): Display active Playthroughs for current User
    SELECT * FROM Playthroughs
    WHERE user_id=:user_id AND finish_timestamp IS NULL;

    -- Load finished Playthroughs (Home Page): Display finished Playthroughs for current User
    SELECT * FROM Playthroughs
    WHERE user_id=:user_id AND finish_timestamp IS NOT NULL;

    -- (Add Playthrough query is the same as Playthroughs page)