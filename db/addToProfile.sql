INSERT INTO posts (uri, user_id, comment) VALUES ($1, $2, $3);
SELECT *
FROM users u
JOIN posts p ON u.user_id = p.user_id;