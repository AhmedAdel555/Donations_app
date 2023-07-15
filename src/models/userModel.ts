import db from "../util/database"
class User{
  id? : string ;
  email :string ;
  user_name :string ;
  first_name :string ;
  last_name :string ;
  password :string ;

  constructor(email:string, user_name :string , first_name :string , last_name :string , password :string){
      this.email = email;
      this.user_name = user_name;
      this.first_name = first_name;
      this.last_name = last_name;
      this.password = password;
  }
  // create user
  public static async createUser(user:User): Promise<User>{
    try{
      const connection = await db.connect()
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) 
                    values ($1, $2, $3, $4, $5) 
                    returning id , email, user_name, first_name, last_name`
      const result = await connection.query(sql, [
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        user.password,
      ])
      connection.release()
      return result.rows[0]
    }catch(error){
      throw new Error((error as Error).message);
    }
  }

  // get users
  public static async getAllUsers(): Promise<User[]>{
    try{
      const connection = await db.connect()
      const sql = `select id , email, user_name, first_name, last_name from users`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    }catch(error){
      throw new Error((error as Error).message);
    }
  }

  // get users
  public static async getSingleUser(id: string): Promise<User[]>{
    try{
      const connection = await db.connect()
      const sql = `select id , email, user_name, first_name, last_name from users where is = $1`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    }catch(error){
      throw new Error((error as Error).message);
    }
  }
}

export default User;