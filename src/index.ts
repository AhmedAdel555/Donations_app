import express, {Application, Request, Response, NextFunction} from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from 'express-rate-limit';
import ServerError from "./interfaces/serverError";
import dotenv from "dotenv";
import routers from "./routes"
dotenv.config()
// create the server
const app = express();

// json middleware
app.use(express.json());
// security middleware
app.use(helmet());
// log middleware
app.use(morgan("common"));
// rate limit requests
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message : "many requests in 1 minutes"
  })
);

app.use((req : Request, res: Response , next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization');
  next();
})

app.use("/api", routers);

app.use((req : Request, res: Response) => {
    res.status(404).json({message: "Page not found"});
})

app.use((error: ServerError , req : Request, res: Response , next: NextFunction) => {
    const errorMessage = error.message || "whoops!! some thing went wrong in server";
    const errorStatus = error.status || 500;
    res.status(errorStatus).json({message: errorMessage})
})

// start the server
app.listen(process.env.Port, () => {
  console.log(process.env)
  console.log(process.env.PORT)
});

export default app;