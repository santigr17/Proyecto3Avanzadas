const Graph = require("../baseGrafos/databaseGraph")
        
exports.migrate = function(req, res){
    const session = Graph.session();
    try {
        const resultPromise = session.run(
            'CREATE (a:Product {name: $name}) RETURN a',
            {name: 'Jabon'}
            );
            
            resultPromise.then(result => {
            session.close();
            
            const singleRecord = result.records[0];
            const node = singleRecord.get(0);
            res.json(node);
            console.log(node.properties.name);
            
            // on application exit:
            driver.close();
            });

    } catch (error) {
        res.send(error)
    }
        
        

}