const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/testDatabase';

// Create a new MongoClient instance
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    
    const result = await client.db("tradingCards").collection("cards").insertOne({
      name: "Charizard",
      series: "Base Set",
      manufacturer: "Nintendo",
      yearReleased: 1999,
      condition: "Mint",
      price: 150
    });
    console.log(`New card added with the following id: ${result.insertedId}`);
    
    const cards = await client.db("tradingCards").collection("cards").find({}).toArray();
    console.log(cards);
  } catch (err) {
      console.error(err.stack);
  } finally {
      await client.close();
  }
}
run().catch(console.dir);