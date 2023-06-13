import express, {Application, Request, Response} from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from 'express-rate-limit';

// create the server
const app = express();

// json middleware
app.use(express.json);
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
  })
);

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Hello World ❤"
    });
});

// start the server
app.listen(3000);

export default app ;