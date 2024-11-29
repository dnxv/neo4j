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
    `MATCH (n:Person {name: 'Keanu Reeves'})-[:ACTED_IN]->(m:Movie)
    RETURN n,m`;
    
    const session = driver.session({database:"neo4j"});

    const result = await session.run(query);

    // print actor only once
    first_rec = result.records[0]["_fields"][0]
    actor = {
        label: first_rec["labels"],
        name: first_rec["properties"]["name"],
        born: first_rec["properties"]["born"]["low"]
    };
    console.log(actor);
    console.log();

    // print movies
    result.records.forEach(rec => {
        movie = {
            label: rec._fields[1]["labels"],
            title: rec._fields[1]["properties"]["title"],
            tagline: rec._fields[1]["properties"]["tagline"],
            release_year: rec._fields[1]["properties"]["released"]["low"]
        }

        console.log("Movie node: ", movie);
    });

    session.close();
    driver.close();
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
})();

 