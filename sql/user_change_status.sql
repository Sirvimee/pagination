SELECT * FROM pagination.user;
SET SQL_SAFE_UPDATES = 0;
UPDATE user SET status = 'BANNED' WHERE (id % 2 = 0);
UPDATE user SET status = 'BANNED' WHERE (id > 40 AND id < 28);
UPDATE user SET status = 'ACTIVE' WHERE (id % 2 != 0);

DELETE FROM user WHERE id > 100;

UPDATE user SET image_url = CONCAT('https://randomuser.me/api/portraits/men/', FLOOR(RAND() * 100), '.jpg');

SELECT FLOOR(RAND() * 100);