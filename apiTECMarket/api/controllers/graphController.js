const Graph = require("../baseGrafos/databaseGraph")
const fs = require('fs');
const json2csv = require('json2csv').parse;
var mongoose = require("mongoose");
product = mongoose.model("Product");

const fieldsProduct = ['Code','Name','Description','Price']

exports.migrate = async function(req, res){
    try {
        var m = await save2csv();
        res.send(m);       
    } catch (error) {
        res.send(error.message)   
    }


}

function save2csv(){
    product.find({},{ _id: 0, __v: 0 }).lean().exec(function (err, products) {
        if(err)
            throw err
        else {
            console.log('products length')
            console.log(products.length)
            if(products.length){
                let csv;
                try {
                    console.log(products)
                    csv = json2csv(products, {fieldsProduct});
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
}