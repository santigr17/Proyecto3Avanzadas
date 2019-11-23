const user = 'neo4j';
const password = '1234';
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://localhost:11020', neo4j.auth.basic(user, password));
module.exports  = driver;

