import express from "express";
import loadDB from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// login
router.get('/login', async(req, res) => {
  const db = await loadDB()
  let collection = await db.collection("users");
  let result = await collection.findOne({name: req.query.name});
  res.send(result);
})

// signup
router.post('/signUp', async(req, res) => {
  const db = await loadDB()
  let collection = await db.collection("users");
  let result = await collection.insertOne({name: req.query.name});
  res.json(result);
})

// get all tasks for a given user
router.get("/getTasks", async (req, res) => {
    if(!req.query.owner) {
      return []
    }
    var sort = {};
    sort[req.query.sortKey] = req.query.asc === 'true' ? 1 : -1;
    const db = await loadDB()
    let collection = await db.collection("tasks");
    let results = await collection.aggregate(
      [
        { $match : { owner : req.query.owner } },
         { $sort : sort }
      ]
    ).toArray();
    res.json(results);
  });

// create a new task
router.post("/createNewTask", async(req, res) => {
  const db = await loadDB()
  let collection = await db.collection("tasks");
  const newTask = {
    owner: req.body.owner,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    duedate: req.body.duedate
  }
  const result = await collection.insertOne(newTask);
  res.json(result)
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
});

// edit a task
router.put("/editTask", async(req, res) => {
  const db = await loadDB()
  let collection = await db.collection("tasks");
  const filter = { _id: new ObjectId(String(req.query._id)) };
  const updateDoc = {
    $set: req.body,
  };
  const result = await collection.updateOne(filter, updateDoc, { upsert: true })
  if (result.acknowledged) {
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`)
    res.json(result)
  } else {
    console.log("No documents matched the query. Changed 0 documents.");
  }
})

// delete  a task
router.delete("/deleteTask", async(req, res) => {
  const db = await loadDB()
  let collection = await db.collection("tasks");
  const result = await collection.deleteOne({ "_id": new ObjectId(String(req.query._id))})
  if (result.deletedCount === 1) {
    console.log("Successfully deleted one document.");
    res.json(result)
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }
})


export default router