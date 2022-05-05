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
    WHERE genre_id=:genre_id;



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
    WHERE location_id=:location_id;



-- Companies page

    -- Load Companies table
    SELECT * FROM Companies
    JOIN Locations ON Companies.location_id=Locations.location_id;

    -- Add new Company
    INSERT INTO Companies (company_name, location_id)
    VALUES (:company_name, (SELECT location_id FROM Locations WHERE city=:city AND state=:state AND country=:country));

    -- Edit Company
    UPDATE Companies
    SET company_name=:company_name, location_id=(SELECT location_id FROM Locations WHERE city=:city AND state=:state AND country=:country)
    WHERE company_id=:company_id;

    -- Delete Company
    DELETE Companies
    WHERE company_id=:company_id;



-- Platforms page

    -- Load Platforms table
    SELECT * FROM Platforms
    JOIN Companies ON Platforms.company_id=Companies.company_id;

    -- Add new Platform
    INSERT INTO Platforms (platform_name, company_id)
    VALUES (:platform_name, (SELECT company_id FROM Companies WHERE company_name=:company_name));

    -- Edit Platform
    UPDATE Platforms
    SET platform_name=:platform_name, company_id=(SELECT company_id FROM Companies WHERE company_name=:company_name)
    WHERE platform_id=:platform_id;

    -- Delete Platform
    DELETE Platforms
    WHERE platform_id=:platform_id;



-- Games Queries

    -- Load Games table: lists games based on given filter. Can choose which attribute to filter by.
    SELECT * FROM Games 
    WHERE :attribute = :value;

    -- Add new Game
    INSERT INTO Games (game_title, game_summary, release_date, company_id, genre_id)
    VALUES (:game_title, :game_summary, :release_date, 
        (SELECT company_id FROM Companies WHERE company_name=:company_name), 
        (SELECT genre_id FROM Genres WHERE genre_name=:genre_name)
    );

    -- Edit Game
    UPDATE Games
    SET game_title=:game_title, game_summary=:game_summary, release_date=:release_date, 
        company_id=(SELECT company_id FROM Companies WHERE company_name=:company_name),
        genre_id=(SELECT genre_id FROM Genres WHERE genre_name=:genre_name)
    WHERE game_id=:game_id;

    -- Delete Game
    DELETE Games
    WHERE game_id=:game_id;



-- Playthroughs Queries

    -- Load active Playthroughs (Home Page): Display active Playthroughs for current User
    SELECT Playthroughs.playthrough_id, Playthroughs.start_timestamp, Playthroughs.finish_timestamp, Games.game_title
    FROM Playthroughs JOIN Games
    ON Playthroughs.game_id=Games.game_id
    WHERE Playthroughs.user_id=:user_id AND finish_timestamp IS NULL;

    -- Load finished Playthroughs (Home Page): Display finished Playthroughs for current User
    SELECT Playthroughs.playthrough_id, Playthroughs.start_timestamp, Playthroughs.finish_timestamp, Games.game_title
    FROM Playthroughs JOIN Games
    ON Playthroughs.game_id=Games.game_id
    WHERE Playthroughs.user_id=:user_id AND finish_timestamp IS NOT NULL;

    -- Load all existing Playthroughs (Playthroughs Page)
    SELECT Playthroughs.playthrough_id, Playthroughs.start_timestamp, Playthroughs.finish_timestamp, Games.game_title
    FROM Playthroughs JOIN Games
    ON Playthroughs.game_id=Games.game_id;

    -- Add New Playthrough
    INSERT INTO Playthroughs (start_timestamp, user_id, game_id)
    VALUES (NOW(), :user_id, (SELECT game_id FROM Games WHERE game_title=:game_title));

    -- Edit Playthrough
    UPDATE Playthroughs
    SET start_timestamp=:start_timestamp, finish_timestamp=:finish_timestamp, game_id=(SELECT game_id FROM Games WHERE game_title=:game_title)
    WHERE playthrough_id=:playthrough_id;

    -- Delete Playthrough
    DELETE Playthroughs
    WHERE playthrough_id=:playthrough_id;



-- Sessions Queries
    -- Read: "Home" page, displays on top if there is currently an open/active Session
    -- Read: Playthrough card after selecting, lists all Sessions for that Playthrough
    -- Create: "Start New Session" button after selecting a Playthrough
    -- Update: "Edit Session" form
