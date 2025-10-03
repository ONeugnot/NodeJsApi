const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const crypto = require("crypto");
const fs = require("fs");

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  fs.readFile("src/usersData.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.post("/signup", (req, res) => {
  const { mdp } = req.body;
  const AOOhashedInput = crypto.createHash("sha256").update(mdp).digest("hex");
  console.log("Mot de passe entré (hashé) :", hashedInput);

  fs.readFile("src/usersData.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erreur serveur");
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      console.error(parseErr);
      return res.status(500).send("Erreur parsing JSON");
    }

    const hashedStored = crypto
      .createHash("sha256")
      .update(users.credentials.mdp)
      .digest("hex");

    if (hashedStored === AOOhashedInput) {
      res.status(200).send(users);
    } else {
      res.status(401).send("Mauvais mot de passe");
    }
  });
});

server.listen(3000, () => {
  console.log("app lancé");
});
