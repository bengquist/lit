SELECT *
FROM users u
JOIN posts p ON u.user_id = p.user_id
WHERE p.user_id = $1
ORDER BY p.timestamp DESC;