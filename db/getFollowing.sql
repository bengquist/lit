SELECT DISTINCT friend_id
FROM user_friends
WHERE user_id = $1;