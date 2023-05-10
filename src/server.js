const express = require("express");
const songRouter = require("./routers/songRouter");

// create an express app and use JSON
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 7777;

app.use("/songs", songRouter);

// start listening
app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);
