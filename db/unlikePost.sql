DELETE FROM likes WHERE post_id = $1 AND user_id = $2;
UPDATE posts
SET likes = likes - 1
WHERE post_id = $1;