import { Router } from "express";

import jwt from 'jsonwebtoken';
import { secret } from "../utils/constant.mjs";
import { authenticateToken } from "../utils/middleware.mjs";


 
const route = Router();

const users = [
    {
        username: "anson",
        password: 'pass123',
    }
];


route.post('/api/auth',(req,res)=>{
    const { username, password } = req.body;
    const user = users.find(person => person.username === username && person.password === password);
    if(!user){
       return  res.status(401).json({error : "Unauthorized" })
    }
    const token = jwt.sign({ username : user.username}, secret);

    res.json({token});

});


route.get('/api/resources', authenticateToken, (req, res) => {
    res.json({ message: 'Access Granted' });
});

export default route;