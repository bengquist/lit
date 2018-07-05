INSERT INTO users (email, username, profile_img) VALUES ($1, $2, $3);
SELECT * FROM users WHERE email = $1;