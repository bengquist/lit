INSERT INTO likes (user_id, post_id) VALUES ($2, $1);
UPDATE posts
SET likes = likes + 1
WHERE post_id = $1;