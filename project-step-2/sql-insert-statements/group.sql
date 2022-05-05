INSERT INTO Users (first_name, last_name, username, email)
VALUES ('Eren', 'Yeager', 'Titan','fightme@gmail.com'),
('Mikasa', 'Ackerman', 'Erennn', 'ackerman@gmail.com'),
('Link', 'Zelda', 'Korok', 'zelda@gmail.com');

INSERT INTO Games (game_title, game_summary, release_date, company_id, genre_id)
VALUES ('Elden Ring', 'This is an open world dark souls like game where you also die a lot', '2022-02-25',
(SELECT company_id FROM Companies WHERE company_name = 'FromSoftware'), (SELECT genre_id FROM Genres WHERE genre_name = 'action' )),
('The Legend of Zelda: Breath of the Wild', 'This is an open world zelda game where you hunt koroks', '2017-03-03',
(SELECT company_id FROM Companies WHERE company_name = 'Nintendo'), (SELECT genre_id FROM Genres WHERE genre_name = 'adventure' )),
('Overwatch', 'This is a multiplayer shooting game where everyone needs healing too much', '2016-05-24',
(SELECT company_id FROM Companies WHERE company_name = 'Blizzard'), (SELECT genre_id FROM Genres WHERE genre_name = 'shooter' ));

INSERT INTO Playthroughs (start_timestamp, finish_timestamp, user_id, game_id)
VALUES ('2022-01-04 02:15:01', NULL, (SELECT user_id FROM Users WHERE username = 'Titan'),  (SELECT game_id FROM Games WHERE game_title = 'Elden Ring')),
('2021-11-01 01:30:40', '2022-01-12 10:24:10',(SELECT user_id FROM Users WHERE username = 'Erennn'), (SELECT game_id FROM Games WHERE game_title = 'Overwatch')),
('2020-05-20 04:20:32', '2020-12-01 10:02:01',(SELECT user_id FROM Users WHERE username = 'Korok'), (SELECT game_id FROM Games WHERE game_title = 'The Legend of Zelda: Breath of the Wild'));

INSERT INTO Sessions (time_played, session_timestamp, playthrough_id)
VALUES (10, '2020-12-11 11:01:03',(SELECT Playthroughs.playthrough_id FROM Playthroughs INNER JOIN Users ON Playthroughs.user_id = Users.user_id WHERE Users.username='Korok')),
(1, '2022-02-01 02:02:13',(SELECT Playthroughs.playthrough_id FROM Playthroughs INNER JOIN Users ON Playthroughs.user_id = Users.user_id WHERE Users.username='Erennn')),
(5, '2022-04-11 05:09:23',(SELECT Playthroughs.playthrough_id FROM Playthroughs INNER JOIN Users ON Playthroughs.user_id = Users.user_id WHERE Users.username='Titan'));

INSERT INTO GamesPlatforms (game_id, platform_id)
VALUES
( (SELECT game_id FROM Games WHERE game_title='Elden Ring'), (SELECT platform_id FROM Platforms WHERE platform_name='PC') ),
( (SELECT game_id FROM Games WHERE game_title='Elden Ring'), (SELECT platform_id FROM Platforms WHERE platform_name='Playstation 4') ),
( (SELECT game_id FROM Games WHERE game_title='Elden Ring'), (SELECT platform_id FROM Platforms WHERE platform_name='Playstation 5') ),
( (SELECT game_id FROM Games WHERE game_title='Elden Ring'), (SELECT platform_id FROM Platforms WHERE platform_name='Xbox One') ),
( (SELECT game_id FROM Games WHERE game_title='Elden Ring'), (SELECT platform_id FROM Platforms WHERE platform_name='Xbox Series X|S') ),
( (SELECT game_id FROM Games WHERE game_title='The Legend of Zelda: Breath of the Wild'), (SELECT platform_id FROM Platforms WHERE platform_name='Switch') ),
( (SELECT game_id FROM Games WHERE game_title='Overwatch'), (SELECT platform_id FROM Platforms WHERE platform_name='Switch') ),
( (SELECT game_id FROM Games WHERE game_title='Overwatch'), (SELECT platform_id FROM Platforms WHERE platform_name='PC') ),
( (SELECT game_id FROM Games WHERE game_title='Overwatch'), (SELECT platform_id FROM Platforms WHERE platform_name='Playstation 4') ),
( (SELECT game_id FROM Games WHERE game_title='Overwatch'), (SELECT platform_id FROM Platforms WHERE platform_name='Xbox One') );