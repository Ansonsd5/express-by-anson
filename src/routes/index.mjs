import { Router } from "express";
import userRoutes from '../routes/users.mjs';
import productRoutes from '../routes/products.mjs';
import auth from '../routes/auth.mjs';


const router = Router();
router.use(userRoutes);
router.use(productRoutes);
router.use(auth);



export default router;