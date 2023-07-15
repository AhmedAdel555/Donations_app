import { Request, Response, NextFunction } from "express";
import db from "../util/database"
import User from "../models/userModel"
import ServerError from "../interfaces/serverError";

// create user
export const create = async (req : Request, res:Response, next: NextFunction) => {
  try{
    const connection = await db.connect()
    const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) 
                  values ($1, $2, $3, $4, $5) 
                  returning id , email, user_name, first_name, last_name`
    const result = await connection.query(sql, [
      req.body.email,
      req.body.user_name,
      req.body.first_name,
      req.body.last_name,
      req.body.password,
    ])
    connection.release()
    const user:User =  result.rows[0];
    res.status(200).json({
      message: "user created succesfuly",
      user: user
    })
  }catch(error){
    next(error)
  }
}

