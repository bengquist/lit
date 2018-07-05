INSERT INTO posts (uri, artist_name, artist_albums, genre, user_id) VALUES ($1, $2, $3, 'Genre', $4);
SELECT *
FROM users u
JOIN posts p ON u.user_id = p.user_id;