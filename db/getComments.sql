SELECT c.comment, u.username, u.profile_img, c.timestamp, c.user_id, c.comment_id
FROM comments c
JOIN users u ON c.user_id = u.user_id
WHERE c.post_id = $1
ORDER BY c.timestamp ASC;