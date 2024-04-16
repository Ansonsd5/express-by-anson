import { Router } from "express";
import { latencyBetweenReqRes } from "../utils/middleware.mjs";

const router = Router();

router.get("/api/products",latencyBetweenReqRes, (request, response) => {
    response.send([
      { id: 33434, prod_name: "samsung", discription: "high end mobile phone" },
      { id: 3114, prod_name: "Nokia", discription: "high end nokia" },
      { id: 22434, prod_name: "motoG", discription: "high end motog" },
    ]);
  });

  export default router;

