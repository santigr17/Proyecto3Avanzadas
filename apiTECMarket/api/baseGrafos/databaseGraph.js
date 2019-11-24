const user = 'neo4j';
const password = '1234';
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://localhost:11020', neo4j.auth.basic(user, password));


exports.createProduct = function (code, name, description, price)
{
    const session = driver.session();
    try {
        const resultPromise = session.run(
            'CREATE (a:Product {\
                name: $name,\
                code: $code\
                description: $descrip\
                price: $price }) RETURN a',
            {   
                name: name,
                code:code,
                descrip:description,
                price:price}
            );
            
            resultPromise.then(result => {
            session.close();
            
            const singleRecord = result.records[0];
            const node = singleRecord.get(0);
            console.log(node.properties.name);
            
            // on application exit:
            driver.close();
            return "Correct";
            });

    } catch (error) {
        return (error.message)
    }    

}

// module.exports  = driver;

