import { mockData, secret } from "./constant.mjs";
import jwt from 'jsonwebtoken';

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

  export const latencyBetweenReqRes = (req, res, next) => {
    const start = Date.now();
    let finish = 0;
    let close = 0;
  
    console.log(`${req.method} ${req.url} at ${start}`);
  
    res.on('finish', () => {
      finish = Date.now();
      const latency = finish - start;
      console.log(`Request for ${req.url} completed in ${latency}ms`);
    });
  
    res.on('close', () => {
      close = Date.now();
      const latency = close - start;
      console.log(`Connection closed for ${req.url} after ${latency}ms`);
      
    });

    
  
    next();
  }




  export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    const token =authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};
  