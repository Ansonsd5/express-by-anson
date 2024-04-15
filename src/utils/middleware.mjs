import { mockData } from "./constant.mjs";

export const resolveIndexByUserId = (request, response, next) => {
    const {
      params: { id },
    } = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);
  
    const findUser = mockData.findIndex((user) => user.id === parsedId);
  
    if (findUser === -1) return response.sendStatus(404);
    request.findUser = findUser;
    console.log("findUser",findUser);
    next();
  };

  