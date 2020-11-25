// const express = require("express");
// const path = require("path");
// const PORT = process.env.PORT || 5000;
// const { Pool } = require("pg");
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// express()
//   .use(express.static(path.join(__dirname, "public")))
//   .set("views", path.join(__dirname, "views"))
//   .set("view engine", "ejs")
//   .get("/", (req, res) => res.render("index"))
//   .get("/db", async (req, res) => {
//     try {
//       const client = await pool.connect();
//       const result = await client.query("SELECT * FROM test_table");
//       const results = { results: result ? result.rows : null };
//       res.render("pages/db", results);
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   })
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static("express"));
// default URL for website
app.use("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug("Server listening on port " + port);
