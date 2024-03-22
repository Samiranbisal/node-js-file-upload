const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const port = 8000;

// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./Upload");
  },
  filename: function (req, file, cd) {
    return cd(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/Upload", upload.single("ProfilImage"), (req, resp) => {
  console.log(req.body);
  console.log(req.file);
  return resp.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
