import { Router } from "express";
import userRoutes from '../routes/users.mjs';
import productRoutes from '../routes/products.mjs';


const router = Router();
router.use(userRoutes);
router.use(productRoutes);



export default router;