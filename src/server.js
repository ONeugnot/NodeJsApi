const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const crypto = require("crypto");
app.use(cors());
app.use(express.json());

const user = [
  {
    name: "olivier",
    mdp: crypto.createHash("sha256").update("dadadada").digest("hex"),
  },
  {
    name: "daris",
    mdp: crypto.createHash("sha256").update("daran").digest("hex"),
  },
];

app.get("/users", (req, res) => {
  res.send(user);
});

app.post("/signup", (req, res) => {
  const { mdp } = req.body;
  const hashedInput = crypto.createHash("sha256").update(mdp).digest("hex");
  console.log(hashedInput, mdp);
  
   const foundUser = user.find((u) => u.mdp === hashedInput);

   if (foundUser) {
    res.status(200).send({
      projet: 'chase game',
      creation: '21/10/2024 '
    })
   }else {
    res.status(401).send("Mauvais mot de passe")
   }

});
server.listen(3000, () => {
  console.log("listening on localhost:3000");
});
