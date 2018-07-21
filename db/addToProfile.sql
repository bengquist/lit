INSERT INTO posts (uri, user_id, comment, artist_name) VALUES ($1, $2, $3, $4);
SELECT *
FROM users u
JOIN posts p ON u.user_id = p.user_id;