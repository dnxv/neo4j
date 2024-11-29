# Getting Started
```
# delete node models folder
# delete package-lock.json
# rebuild w/
npm install 


- open Neo4j Desktop
    - go to projects list: find your project or create new
    - start your DBMS (data base mgmt system)
    - *wait*
    - open w/ Neo4j Desktop
        - it'll say your username
        - bolt://localhost:<port>
    - stop DBMS project
- commands:
    - MATCH (n) RETURN n
        - shows all nodes
    - MATCH (n:Person {name: 'Keanu Reeves'})-[:ACTED_IN]->(m:Movie)
    RETURN n,m
        - shows movies Keanu acted in
    - MATCH p=(n:Person {name:"Jessica Thompson"})-[r:REVIEWED]->() 
    WHERE r.rating > 50
    RETURN p LIMIT 25
        - shows all movies Jess reviewed

- node app.js
- or
- run either 
    - node 1stQuery.js
    - node 2ndQuery.js
```