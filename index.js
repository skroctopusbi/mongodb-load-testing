//require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
// const documents = require('./canvas.courses.json')
const fs = require('fs');

const uri = "mongodb+srv://mongodbuser:mongodbuser@dedicated-server.pzay9.mongodb.net/?retryWrites=true&w=majority&appName=Dedicated-server"

const fetchByMongoClient = async () => {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    //console.log('~~~~MongoClient~~~~')
    //console.time('Total Time')
    //console.time('Time to Connect')
    //console.log('Connected')
    //console.timeEnd('Time to Connect')

    const db = client.db("canvas");

    //console.time('Time to Ping admin db')
    await client.db("admin").command({ ping: 1 });
    //console.timeEnd('Time to Ping admin db')

    const collection = db.collection('submissions');
    //console.time('MongoClient QueryTime')
    // const documents = await collection.find({"user._id":{
    //   $gte: "6300",
    //   $lte: "6480"
    // }}).toArray();
    const documents = await collection.find({"courseId":"345"}).toArray();
    //console.timeEnd('MongoClient QueryTime')
    //console.log('No of documents received:',documents.length)
    //console.timeEnd('Total Time')
    await client.close();
  } catch (error) {
    throw error
  } finally {
    //await client.close();
  }
}

const fetchmanyClients = async () => {
    console.time('MongoClient QueryTime')
    for(let i=0;i<1;i++){
        promises = []
        for(let i=0;i<400;i++){
            promises.push(fetchByMongoClient())
        }
        await Promise.all(promises).catch(async(e) => {
            console.log(e); 
            //await client.close();
        })
        //await client.close();
    }
    console.timeEnd('MongoClient QueryTime')
}
fetchmanyClients()
//fetchByMongoClient()
