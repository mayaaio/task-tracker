import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()
const test = process.env.MONGODB_TEST

console.log('test ', test)

const connectionString = process.env.MONGODB_URI

const client = new MongoClient(connectionString);

const loadDB = async () => {
    let conn
    try {
        conn = await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } catch(e) {
        console.log(e);
      } 
    
    return conn.db("task-tracker")
}

export default loadDB