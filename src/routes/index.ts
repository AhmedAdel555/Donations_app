import { Router } from "express";
import userRouter from "./apis/user";

const routers = Router();

routers.use('/user', userRouter);

export default routers;