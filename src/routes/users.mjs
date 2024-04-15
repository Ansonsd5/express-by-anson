import { Router } from "express";
import { body, matchedData, query, validationResult } from "express-validator";

import { resolveIndexByUserId } from "../utils/middleware.mjs";
import { mockData } from "../utils/constant.mjs";



const router = Router();




router.get(
    "/api/users",
    query("filter")
      .notEmpty()
      .withMessage("Cant be empty")
      .isLength({ min: 3, max: 10 })
      .withMessage("Must be 3-10 char"),
    (req, res) => {
      const result = validationResult(req);
      console.log(result.errors);
  
      const {
        query: { filter, value },
      } = req;
      //when filter and value are undefined
  
      if (filter && value) {
        return res.send(mockData.filter((user) => user[filter].includes(value)));
      }
  
      return res.send(mockData);
    }
  );

  router.get("/api/users/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId))
      return res.status(400).send({ msg: "bad request ,Invalid Id" });
  
    const findUser = mockData.find((user) => user.id === parsedId);
    if (!findUser) return res.status(400).send({ msg: "User not found" });
    return res.send(findUser);
  });

  router.post("/api/users",
    [body("username")
      .notEmpty()
      .withMessage("payload cant be empty")
      .isString()
      .withMessage("Please enter a valid string"),
    body("displayname")
      .notEmpty()
      .withMessage("displayname cant be empty")
      .isString()
      .withMessage("Please enter a valid string")
      .isLength({ max: 32 })
      .withMessage("max length should be 32")],
    (request, response) => {
      const postresult = validationResult(request);
      console.log(postresult);
  
      if(!postresult.isEmpty()){
        return response.status(400).send({errors: postresult.array()})
      }
      const  data = matchedData(request);
      const newuser = { id: mockData[mockData.length - 1].id + 1, ...data };
      mockData.push(newuser);
      return response.status(201).send(mockData);
    }
  );

  router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
    
    const { body, findUser } = request;
    mockData[findUser] = { id: mockData[findUser].id, ...body };
    return response.status(201).send(mockData);
  });

  router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const { findUser } = request;
  
    mockData.splice(findUser);
    return response.status(200).send(mockData);
  });

 router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const { body, findUser } = request;
    mockData[findUser] = { ...mockData[findUser], ...body };
    return response.status(200).send(mockData);
  });


export default router;