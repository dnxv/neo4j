// npm install --save neo4j-driver
// node example.js
var neo4j = require('neo4j-driver');
(async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = 'bolt://localhost:7687'
  const USER = 'neo4j'
  const PASSWORD = 'password'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))


    const query = 
    `MATCH p=(n:Person {name:"Jessica Thompson"})-[r:REVIEWED]->() 
    WHERE r.rating > 50
    RETURN p LIMIT 25`;

    const session = driver.session({database:"neo4j"});

    const result = await session.run(query);

    result.records.forEach(rec => {
        path = rec._fields[0]
        startNode = path["start"]
        endNode = path["end"]
        segments = path["segments"][0]["relationship"]["type"]
        summary = path["segments"][0]["relationship"]["properties"]["summary"]
        rating = path["segments"][0]["relationship"]["properties"]["rating"]["low"]

        console.log("start node: ", startNode["labels"], startNode["properties"])
        console.log("relationship: ", segments, "| summary: ", summary, "| rating: ", rating);
        console.log("end node: ", endNode["labels"], endNode["properties"]["title"], "| Tagline: ", endNode["properties"]["tagline"])
        console.log()
    });
    
    session.close();
    driver.close();
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
})();

 