-- Users page

-- Genres page

-- -- Load Genres table
SELECT * FROM Genres;

-- -- Add new Genre
INSERT INTO Genres (genre_name)
VALUES (:name);

-- -- Edit Genre
UPDATE Genres 
SET genre_name=:name 
WHERE genre_id=:id;

-- -- Delete Genre
DELETE Genres
WHERE genre_id=:id;



-- Locations page

-- -- Load Locations table
SELECT * FROM Locations;

-- -- Add new Location
INSERT INTO Locations (city, state, country)
VALUES (:city, :state, :country);

-- -- Edit Location
UPDATE Locations
SET city=:city, state=:state, country=:country
WHERE location_id=:id;

-- -- Delete Location
DELETE Locations
WHERE location_id=:id;



-- Companies page

-- -- Load Companies table
SELECT * FROM Companies
JOIN Locations ON Companies.location_id=Locations.location_id;

-- -- Add new Company
INSERT INTO Companies (company_name, location_id)
VALUES (:name, (SELECT location_id FROM Locations WHERE city=:city AND state=:state AND country=:country));

-- -- Edit Company
UPDATE Companies
SET company_name=:name, location_id=(SELECT location_id FROM Locations WHERE city=:city AND state=:state AND country=:country)
WHERE company_id=:id;

-- -- Delete Company
DELETE Companies
WHERE company_id=:id;



-- Platforms page

-- -- Load Platforms table
SELECT * FROM Platforms
JOIN Companies ON Platforms.company_id=Companies.company_id;

-- -- Add new Platform
INSERT INTO Platforms (platform_name, company_id)
VALUES (:name, (SELECT company_id FROM Companies WHERE company_name=:company_name));

-- -- Edit Platform
UPDATE Platforms
SET platform_name=:name, company_id=(SELECT company_id FROM Companies WHERE company_name=:company_name)
WHERE platform_id=:id;

-- -- Delete Platform
DELETE Platforms
WHERE platform_id=:id;

-- Games Queries
    -- Create: "Add Game to Database" form 
    -- Read: "Games" tab, loads all games
    -- Read: "Create/Edit Playthrough" form, filters based on title entered by User
    -- Update: "Edit Game in Database" form
    -- Delete: "Remove Game from Database" button on Games tab

-- Platforms Queries
    -- Read: "Platform List" page, loads all platforms
    -- Create: "Add Platform to Database" form on "Platform List" page
    -- Read: "Add Game to Database" and "Edit Game in Database" forms, selects all Platforms for dropdown 
    -- Read: "Games" tab, select all platforms for User to filter games
    -- Update: "Edit Platform in Database" form on "Platform List" page
    -- Delete: "Remove Platform from Database" button in "Platform List" page

-- Playthroughs Queries
    -- Read: "Home" page and "Playthroughs" tab, loads all Playthroughs for a User, shows active before finished, most recent first
    -- Create: "Start New Playthrough" form on "Home" page and "Playthroughs" tab?
    -- Update: "Edit Playthrough" form after clicking on a particular Playthrough
    -- Delete: "Delete Playthrough" button on a particular Playthrough

-- Sessions Queries
    -- Read: "Home" page, displays on top if there is currently an open/active Session
    -- Read: Playthrough card after selecting, lists all Sessions for that Playthrough
    -- Create: "Start New Session" button after selecting a Playthrough
    -- Update: "Edit Session" form
