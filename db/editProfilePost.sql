UPDATE posts
SET comment = $2
WHERE post_id = $1;
SELECT *
FROM users u
JOIN posts p ON u.user_id = p.user_id
WHERE p.user_id = $3;