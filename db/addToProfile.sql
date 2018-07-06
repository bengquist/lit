INSERT INTO posts (uri, user_id) VALUES ($1, $2);
SELECT *
FROM users u
JOIN posts p ON u.user_id = p.user_id;