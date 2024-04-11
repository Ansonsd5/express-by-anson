import express, { json, request, response } from "express";

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 3000;

const mockData = [
  { id: 1, username: "Anson", displayname: "Ansonsd" },
  { id: 2, username: "Rolson", displayname: "Rolsonsd" },
  { id: 3, username: "Josten", displayname: "Jostensd" },
  { id: 4, username: "Renol", displayname: "Renolms" },
];

const loggingMiddleware = (request,response,next) =>{
  console.log(`${request.method} - ${request.url}`);
  //here we can have complex logic
  next();

}
app.use(loggingMiddleware);//this middleware availabel for all the routes below this;

app.get("/", (req, res) => {
  res.status(201).send(`<h1>Welcome to my page have a great time</h1>`);
});

app.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  //when filter and value are undefined

  if (filter && value) {
    return res.send(mockData.filter((user) => user[filter].includes(value)));
  }

  return res.send(mockData);
});

app.use((req,res,next)=>{
console.log(`This middleware will only available for routes which are below this `);
next();
})
//we can have multiple middleware like this order of invocing the MW matters

app.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId))
    return res.status(400).send({ msg: "bad request ,Invalid Id" });

  const findUser = mockData.find((user) => user.id === parsedId);
  if (!findUser) return res.status(400).send({ msg: "User not found" });
  return res.send(findUser);
});

app.get("/api/products", (request, response) => {
  response.send([
    { id: 33434, prod_name: "samsung", discription: "high end mobile phone" },
    { id: 3114, prod_name: "Nokia", discription: "high end nokia" },
    { id: 22434, prod_name: "motoG", discription: "high end motog" },
  ]);
});

app.post("/api/users", (request, response) => {
  console.log("called");
  const { body } = request;
  const newuser = { id: mockData[mockData.length - 1].id + 1, ...body };
  console.log(newuser);
  mockData.push(newuser);
  return response.status(201).send(mockData);
});

app.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);

  const findUser = mockData.findIndex((user) => user.id === parsedId);

  if (findUser === -1) return response.sendStatus(404);

  mockData[findUser] = { id: parsedId, ...body };

  return response.status(201).send(mockData);
});

app.patch("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const paredId = parseInt(id);

  if (isNaN(paredId)) return response.sendStatus(400);

  const findAlterIndex = mockData.findIndex((user) => user.id === paredId);
  if (findAlterIndex === -1) return response.statusCode(404);

  mockData[findAlterIndex] = { ...mockData[findAlterIndex], ...body };
  return response.status(200).send(mockData);
});

app.delete("/api/users/:id", (request, response) => {
  const {
    params: { id },
  } = request;

  const paredId = parseInt(id);

  if(isNaN(paredId)) return response.status(400);

  const findeIndex = mockData.findIndex((user) => user.id === paredId);

  if(findeIndex === -1) return response.status(404);

  mockData.splice(findeIndex);
  return response.status(200).send(mockData);
})

app.listen(PORT, () => {
  console.log(`Sever started at port ${PORT}`);
});
