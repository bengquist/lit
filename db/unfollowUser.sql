DELETE FROM user_friends
WHERE user_id = $1 AND friend_id = $2;