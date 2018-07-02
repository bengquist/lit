module.exports = {
  getAllPosts: (req, res, next) => {
    const db = req.app.get("db");

    db.query("SELECT * FROM posts").then(posts => {
      res.status(200).send(posts);
    });
  }
};
