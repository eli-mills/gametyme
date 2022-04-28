INSERT INTO Locations (city, state, country)
VALUES ('Tokyo', NULL, 'Japan'),
('Kyoto', NULL, 'Japan'),
('Irvine', 'California', 'United States');

INSERT INTO Companies (company_name, location_id)
VALUES ('FromSoftware', (SELECT location_id FROM Locations WHERE city='Tokyo' AND country='Japan') ),
('Nintendo', (SELECT location_id FROM Locations WHERE city='Kyoto' AND country='Japan') ),
('Blizzard', (SELECT location_id FROM Locations WHERE city='Irvine' AND country='United States' AND state='California') );

INSERT INTO Genres (genre_name)
VALUES ('action'),
('adventure'),
('shooter');

-- Platform companies

INSERT INTO Locations (city, state, country)
VALUES ('Redmond', 'Washington', 'United States');	-- Microsoft

INSERT INTO Companies (company_name, location_id)
VALUES ('Sony', (SELECT location_id FROM Locations WHERE city='Tokyo' AND country='Japan') ),
('Microsoft', (SELECT location_id FROM Locations WHERE city='Redmond' AND country='United States' AND state='Washington'));

INSERT INTO Platforms (platform_name, company_id)
VALUES ('Switch', (SELECT company_id FROM Companies WHERE company_name='Nintendo') ),
('PC', (SELECT company_id FROM Companies WHERE company_name='Microsoft') ),
('Playstation 4', (SELECT company_id FROM Companies WHERE company_name='Sony') ),
('Playstation 5', (SELECT company_id FROM Companies WHERE company_name='Sony') ),
('Xbox One', (SELECT company_id FROM Companies WHERE company_name='Microsoft') ),
('Xbox Series X|S', (SELECT company_id FROM Companies WHERE company_name='Microsoft') );