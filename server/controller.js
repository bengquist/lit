module.exports = {
  getAllPosts: (req, res, next) => {
    const db = req.app.get("db");

    db.getAllPosts().then(posts => {
      res.status(200).send(posts);
    });
  },

  addToProfile: (req, res, next) => {
    const db = req.app.get("db");

    const { album, artist, uri } = req.body;

    db.addToProfile([uri, artist, album]).then(posts => {
      res.status(200).send(posts);
    });
  },

  deleteFromProfile: (req, res, next) => {
    const db = req.app.get("db");

    const { id } = req.params;
    console.log(req.params);

    db.deleteFromProfile([id]).then(posts => {
      res.status(200).send(posts);
    });
  }
};
