import express, {Application, Request, Response} from "express"

const app = express()

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Hello World ❤"
    })
})

app.listen(3000)

export default app