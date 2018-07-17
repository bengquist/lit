SELECT *
FROM likes
WHERE user_id = $1 and post_id = $2;