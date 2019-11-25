const json2csv = require('json2csv').parse;

const Graph = require("../baseGrafos/databaseGraph")
const fs = require('fs');

var mongoose = require("mongoose");

product = mongoose.model("Product");
client = mongoose.model('Client');
market = mongoose.model('Market');

const fieldsProduct = ['Code','Name','Description','Price'];
const fieldsClient = ['Identification','Name','Telephone','Email','Birthday','Username'];
const fieldsMarket = ['Code','Name','Latitude','Longitude','Address','Description'];

exports.migrate = function(req, res){

    try {
        var m =  migration();
        res.send(m);       
    } catch (error) {
        res.send(error.message)   
    }


}

async function migration(){
    // Product migration to products.csv
    product.find({ _id: 0, __v: 0 }).lean().exec(function (err, products) {
        if(err)
            throw err
        else {
            console.log('products length')
            console.log(products.length)
            if(products.length){
                let csv;
                try {
                    console.log(products)
                    csv = json2csv(products[0], {fieldsProduct});
                } catch (error) {
                    console.log("Converting error");
                    throw error;
                }
                fs.writeFile('products.csv', csv, function (err) {
                    if (err) {
                        throw err;
                    }
                    else {
                        return 'Success!';
                    }
                });
            }
            else
                return 'Empty Collection';
            
        }
    })

    // Client migration to clients.csv
    client.find({ _id: 0, __v: 0, Password:0 }).lean().exec(function (err, clients) {
        if(err)
            throw err
        else {
            console.log('clients length')
            console.log(clients.length)
            if(clients.length){
                let csv;
                try {
                    console.log(clients)
                    csv = json2csv(clients, {fieldsClient});
                } catch (error) {
                    console.log("Converting error");
                    throw error;
                }
                fs.writeFile('clients.csv', csv, function (err) {
                    if (err) {
                        throw err;
                    }
                    else {
                        return 'Success!';
                    }
                });
            }
            else
                return 'Empty Collection';
            
        }
    })

    // Client migration to markets.csv
    client.find({ _id: 0, __v: 0, Products:0, Orders:0 }).lean().exec(function (err, markets) {
        if(err)
            throw err
        else {
            console.log('markets length')
            console.log(markets.length)
            if(clients.length){
                let csv;
                try {
                    console.log(markets)
                    csv = json2csv(clients, {fieldsClient});
                } catch (error) {
                    console.log("Converting error");
                    throw error;
                }
                fs.writeFile('clients.csv', csv, function (err) {
                    if (err) {
                        throw err;
                    }
                    else {
                        return 'Success!';
                    }
                });
            }
            else
                return 'Empty Collection';
            
        }
    })
    
}


exports.history = function(req, res){
    const session = Graph.driver.session();
    let cliente = req.params.client
    const cypher =
    `MATCH (:Client{Identification:${cliente}}) --> (os:Order) WITH os MATCH (os)-[r1:HAS]->(p:Product) RETURN os,p`;
    session.run(cypher)
    .then(result => {
        jsonResult = [];
        if(result.records)
            result.records.map(record =>{
                var tempProduct = {
                    Code:record.get("p")["properties"]["Code"]["low"],
                    Name:record.get("p")["properties"]["Name"]
                }
                const orderCode = record.get("os")["properties"]["Code"]["low"]
                var tempOrder = jsonResult.find(function(order) {
                    return order.Code === orderCode;
                });
                if(!tempOrder){
                    console.log("ADDING ORDER")    
                    tempOrder = {
                        Code: orderCode,
                        State: record.get("os")["properties"]["State"],
                        Products: []
                    }
                    jsonResult.push(tempOrder)
                }
                tempOrder.Products.push(tempProduct)
                console.log(jsonResult)
            } );



        res.json(jsonResult);
    })
    .catch(error=>{
        console.log(error)
        res.status(500).send(error.message);
    })
    .then( ()=>{ session.close() } );
}

exports.top5 = function(req, res){
    const session = Graph.driver.session();
    const cypher =
    'MATCH (m:Market)\
    RETURN m.Name, size( (m)-[:REGISTER]-() ) AS num\
    ORDER BY num DESC\
    LIMIT 5';

    session.run(cypher)
        .then (result => {
            jsonResult = [];
            if(result.records && result.records.length>0)
                result.records.map(record => {
                    temp = {
                        Name : record.get("m.Name"),
                        Count : record.get("num")['low']
                    }
                    jsonResult.push(temp)
                } )
            res.json(jsonResult);
        } )
        .catch(e=>{
            console.log(e)
            res.status(500).send(e.message);
        } )
        .then(()=>{
            session.close()
        } )
        .then(()=>{
            session.close()
        } );
}

exports.withorders = function(req, res){
    const session = Graph.driver.session();
    const cypher = "MATCH (m:Market) WHERE (m)-[:REGISTER]->() RETURN m";
    session.run(cypher)
    .then(result => {
        jsonResult = [];
        // console.log(result.records)
        if(result.records)
            result.records.map(record =>{
                tempMarket = {
                    Code:record.get("m")["properties"]["Code"]["low"],
                    Name:record.get("m")["properties"]["Name"]
                }
                jsonResult.push(tempMarket)
            } );



        res.json(jsonResult);
    })
    .catch(error=>{
        console.log(error)
        res.status(500).send(error.message);
    })
    .then( ()=>{ session.close() } );
} 


exports.clientsincommon = function(req, res){
    const session = Graph.driver.session();
    let cliente = req.params.client
    const cypher =
    `
    MATCH (:Client{Identification:${cliente}}) --> (os:Order)
    WITH os
    MATCH (os) <-- (ms:Market)
    WITH ms
    MATCH (ms) --> (os2:Order)
    WITH os2
    MATCH (os2) <-- (cs:Client)
    WHERE cs.Identification <> ${cliente}
    RETURN cs
    `;
    session.run(cypher)
    .then(result => {
        jsonResult = [];
        if(result.records)
            result.records.map(record =>{
                var tempClient = {
                    Identification:record.get("cs")["properties"]["Identification"]["low"],
                    Name:record.get("cs")["properties"]["Name"]
                }
                jsonResult.push(tempClient)
            } );



        res.json(jsonResult);
    })
    .catch(error=>{
        console.log(error)
        res.status(500).send(error.message);
    })
    .then( ()=>{ session.close() } );
}

exports.productsincommon = function(req, res){
    const session = Graph.driver.session();
    let cliente = req.params.client
    const cypher =
    `
    MATCH (:Client{Identification:${cliente}}) --> (os:Order)
    WITH os
    MATCH (os) <-- (ms:Market)
    WITH ms
    MATCH (ms) --> (os2:Order)
    WITH os2
    MATCH (os2) --> (ps:Product)
    RETURN DISTINCT ps
    `;
    session.run(cypher)
    .then(result => {
        jsonResult = [];
        if(result.records)
            result.records.map(record =>{
                var tempProduct = {
                    Code:record.get("ps")["properties"]["Code"]["low"],
                    Name:record.get("ps")["properties"]["Name"]
                }
                jsonResult.push(tempProduct)
            } );
        res.json(jsonResult);
    })
    .catch(error=>{
        console.log(error)
        res.status(500).send(error.message);
    })
    .then( ()=>{ session.close() } );
}
