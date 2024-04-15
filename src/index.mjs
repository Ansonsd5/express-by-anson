import express from "express";
import router from "./routes/index.mjs";


const app = express();

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(201).send(`<h1>Welcome to my page have a great time</h1>`);
});


app.listen(PORT, () => {
  console.log(`Sever started at port ${PORT}`);
});
