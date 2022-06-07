
-- Genres page

    -- Load Genres table
    SELECT * FROM Genres;

    -- Add new Genre
    `
        INSERT INTO Genres (genre_name) 
        VALUES ('${genre_name['input-genrename']}');
    `

    -- Edit Genre
    
    `
        UPDATE Genres 
        SET genre_name='${genre_name}' 
        WHERE genre_id='${genre_id}';
    `

    -- Delete Genre
    `DELETE FROM Genres WHERE genre_id='${genre_id}'`



-- Locations page

    -- Load Locations table
    SELECT * FROM Locations;

    -- Add new Location
    `
        INSERT INTO Locations (city,state,country) 
        VALUES ('${city}','${state}', '${country}');
    `

    -- Edit Location
    `
        UPDATE Locations
        SET city='${city}', state='${state}', country='${country}'
        WHERE location_id=${location_id};
    `

    -- Delete Location
    `
        DELETE FROM Locations
        WHERE location_id=${location_id};
    `



-- Companies page

    -- Load Companies table
    `
        SELECT Companies.company_id AS 'Company ID', Companies.company_name AS 'Company Name', 
        CONCAT_WS(', ', Locations.city, Locations.state, Locations.country) AS 'Location',
        Locations.location_id AS 'Location ID'
        FROM Companies JOIN Locations on Companies.location_id=Locations.location_id;
    `

    -- Load Locations for Add Company dropdown
    `
        SELECT location_id, CONCAT_WS(', ', city, state, country) AS 'Location' 
        FROM Locations;
    `

    -- Add new Company
    `
        INSERT INTO Companies (company_name, location_id)
        VALUES ('${company_name}', '${location_id}');
    `

    -- Edit Company
    `
        UPDATE Companies
        SET company_name='${company_name}', location_id='${location_id}'
        WHERE company_id=${company_id};
    `
    -- Delete Company
   `
        DELETE FROM Companies
        WHERE company_id=${company_id};
    `



-- Platforms page

    -- Load Platforms table
    `
        SELECT Platforms.platform_id AS 'Platform ID', Platforms.platform_name AS 'Platform Name', 
        Companies.company_name AS 'Company', Companies.company_id AS 'Company ID'
        FROM Platforms JOIN Companies ON Platforms.company_id=Companies.company_id
        ORDER BY Platforms.platform_id ASC;
    `

    -- Load Company data for Add Platform dropdown
    `SELECT company_id, company_name FROM Companies;`

    -- Add new Platform
    `
        INSERT INTO Platforms (platform_name, company_id) 
        VALUES ('${addPlatformName}', '${addCompanyId}');
    `
    -- Edit Platform
    `
        UPDATE Platforms
        SET platform_name='${platform_name}', company_id=${company_id}
        WHERE platform_id=${platform_id};
    `

    -- Delete Platform
    `
        DELETE FROM Platforms
        WHERE platform_id=${platform_id};
    `



-- Games page

    -- Load Games table
    `
        SELECT Games.game_id AS 'Game ID', Games.game_title AS 'Game Title', Games.game_summary AS 'Game Summary', 
        DATE_FORMAT(Games.release_date, "${readableDate}") AS 'Release Date', 
        DATE_FORMAT(Games.release_date, "${htmlDate}") AS htmlDate,
        Companies.company_name AS 'Company', Genres.genre_name AS 'Genre', 
        GROUP_CONCAT(Platforms.platform_name ORDER BY Platforms.platform_name ASC SEPARATOR ', ') AS 'Platforms'
        FROM Games LEFT JOIN GamesPlatforms ON Games.game_id=GamesPlatforms.game_id
        LEFT JOIN Platforms ON GamesPlatforms.platform_id=Platforms.platform_id
        LEFT JOIN Companies ON Games.company_id=Companies.company_id
        LEFT JOIN Genres ON Games.genre_id=Genres.genre_id
        ${filterQuery}
        GROUP BY Games.game_id;
    `
    -- SOURCES CITED:
    -- The above uses syntax found from tutorialspoint.com, written by Chandu yadav. This can be found here. https://www.tutorialspoint.com/combining-multiple-rows-into-a-comma-delimited-list-in-mysql
    -- This query creates a concatenated column that is used to list out all platform_ids for a particular game separated by commas. 
    -- Within each concatenated cell, the platform_ids are sorted in ascending order using an ORDER BY clause.
    -- The column is aliased as "Platforms".
    -- This makes it easier to read, rather than having a separate row for each Game/Platform combination.

    -- Load filter options depending on dropdown selection. 
    `SELECT ${id}, ${name} FROM ${table};`

    -- Set ${filterQuery} based on filter selection (for Genres or Companies), to be used in main load games query
    `WHERE Games.${attribute}="${value}"`

    -- Set ${filterQuery} based on filter selection (for Platforms), to be used in main load games query
    `WHERE GamesPlatforms.platform_id=${value}`

    -- Load Company options for adding new Game
    SELECT company_name FROM Companies;

    -- Load Genre options for adding new Game
    SELECT genre_id, genre_name FROM Genres;

    -- Load Platform options for adding new Game
    SELECT platform_name FROM Platforms;

    -- Add new Game
    `
        INSERT INTO Games (game_title, game_summary, release_date, company_id, genre_id)
        VALUES ("${game_title}", "${game_summary}", "${release_date}", 
        (SELECT company_id FROM Companies WHERE company_name="${company_name}"), 
        (SELECT genre_id FROM Genres WHERE genre_name="${genre_name}"));
    `

    -- Insert GamePlatform: To be used in a JS loop to create the appropriate number of GamesPlatforms selected
    `
        INSERT INTO GamesPlatforms (game_id, platform_id)
        VALUES (${game_id}, 
            (SELECT platform_id FROM Platforms WHERE platform_name="${platform_name}")
        );
    `

    -- Edit Game
    `
        UPDATE Games
        SET game_title="${game_title}", game_summary="${game_summary}", release_date="${release_date}", 
            company_id=(SELECT company_id FROM Companies WHERE company_name="${company_name}"), 
            genre_id=(SELECT genre_id FROM Genres WHERE genre_name="${genre_name}")
        WHERE game_id=${game_id};    
    `

    -- Will use Javascript to determine which GamesPlatforms need to be added and which need to be removed after each edit.
    -- Assuming we have a list of GamesPlatforms to delete, and another list of GamesPlatforms to insert. Will use following 
    -- queries in a loop to handle all of the updates.

    -- Get current GamesPlatforms for current Game (for figuring out which to add or delete)
    `
        SELECT Platforms.platform_name AS platform_name
        FROM GamesPlatforms JOIN Platforms ON GamesPlatforms.platform_id=Platforms.platform_id
        WHERE GamesPlatforms.game_id=${game_id};
    `

    -- Insert GamePlatform: same query as above for adding new Game
    `
        INSERT INTO GamesPlatforms (game_id, platform_id)
        VALUES (${game_id}, (SELECT platform_id FROM Platforms WHERE platform_name="${platform_name}"));
    `

    -- Delete GamePlatform
    `
        DELETE FROM GamesPlatforms
        WHERE game_id=${game_id} AND platform_id=(SELECT platform_id FROM Platforms WHERE platform_name="${platform_name}");
    `

    -- Delete Game. GamesPlatforms entries will automatically be CASCADED.
    `
        DELETE FROM Games
        WHERE game_id=${game_id};
    `



-- Playthroughs page

    -- Load all existing Playthroughs (Playthroughs Page) (using multiple time formats for HTML display)
    `
        SELECT Playthroughs.playthrough_id AS 'Playthrough ID', DATE_FORMAT(Playthroughs.start_timestamp, '${readableTimestamp}') AS 'Start Timestamp',
        DATE_FORMAT(Playthroughs.start_timestamp, '${htmlDateTime}') AS playthroughStartHtml,
        DATE_FORMAT(Playthroughs.finish_timestamp, '${readableTimestamp}') AS 'Finish Timestamp', 
        DATE_FORMAT(Playthroughs.finish_timestamp, '${htmlDateTime}') AS playthroughFinishHtml,
        Users.user_id AS 'User ID', Users.username AS 'Username',
        Games.game_id AS 'Game ID', Games.game_title AS 'Game Title'
        FROM Playthroughs JOIN Users ON Playthroughs.user_id = Users.user_id
        JOIN Games ON Playthroughs.game_id = Games.game_id
        ORDER BY Playthroughs.playthrough_id ASC;
    `

    -- Load Users for dropdowns
    SELECT user_id, username AS 'Username' FROM Users;

    -- Load Games for dropdowns
    SELECT game_id, game_title AS 'Game Title' FROM Games;

    -- Begin (Add) New Playthrough
    `
        INSERT INTO Playthroughs (start_timestamp, user_id, game_id)
        VALUES ('${start_timestamp}', (SELECT user_id FROM Users WHERE username = '${username}'), 
        (SELECT game_id FROM Games WHERE game_title='${game_title}'));
    `
    -- Edit Playthrough (also used for Finish Playthrough button)
    `
        UPDATE Playthroughs
        SET ${updateString}
        WHERE playthrough_id='${playthrough_id}';
    `

    -- Delete Playthrough
    `
        DELETE FROM Playthroughs
        WHERE playthrough_id=${playthrough_id};
    `



-- Sessions (Playthroughs page)

    -- Load all existing Sessions (Playthroughs page) and include summary column of number of hours played.
    `
        SELECT session_id, TIMESTAMPDIFF(HOUR, session_start, session_end) AS 'Time Played', 
        DATE_FORMAT(session_start, '${readableTimestamp}') AS session_start,
        DATE_FORMAT(session_start, '${htmlDateTime}') AS sessionStartHtml, 
        DATE_FORMAT(session_end, '${readableTimestamp}') AS session_end, 
        DATE_FORMAT(session_end, '${htmlDateTime}') AS sessionEndHtml,
        playthrough_id FROM Sessions;
    `
    -- Start New Session
    `
        INSERT INTO Sessions (session_start, playthrough_id)
        VALUES ('${data['input-session-start']}', '${data['input-playthrough-id']}');
    `

    -- Edit Session
    `
        UPDATE Sessions
        SET ${updateString}
        WHERE session_id='${session_id}';
    `

    -- Delete Session
    `
        DELETE FROM Sessions
        WHERE session_id=${session_id};
    `



-- Users page

    -- Load Users
    SELECT * FROM Users;

    -- Add new User
    `
        INSERT INTO Users (first_name,last_name, username,email) 
        VALUES (    '${data['input-user-fname']}','${data['input-user-lname']}', 
                    '${data['input-username']}', '${data['input-user-email']}'
        );
    `
    -- Edit User
    `
        UPDATE Users
        SET first_name='${first_name}', last_name='${last_name}', username='${username}', email='${email}'
        WHERE user_id=${user_id};
    `

    -- Delete User on Profile page
    `
        DELETE FROM Users
        WHERE user_id=${user_id};
    `