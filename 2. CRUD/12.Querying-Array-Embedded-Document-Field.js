const mongoose = require('mongoose');
const { Schema } = mongoose;

//mongoose.connect("mongodb://localhost:27017/training");
//support multi-connection
var mongooseConnection = mongoose.createConnection(
  'mongodb://localhost:27017/training'
);

// 1. Create Schema
var ArraySchema = new Schema({
  item: String,
  instock: Schema.Types.Mixed
});

// 2. Compile Schema
var ArrayModel = mongooseConnection.model('Array', ArraySchema);

var arrDocuments = [
  {
    item: 'journal',
    instock: [{ warehouse: 'A', qty: 5 }, { warehouse: 'C', qty: 15 }]
  },
  { item: 'notebook', instock: [{ warehouse: 'C', qty: 5 }] },
  {
    item: 'paper',
    instock: [{ warehouse: 'A', qty: 60 }, { warehouse: 'B', qty: 15 }]
  },
  {
    item: 'planner',
    instock: [{ warehouse: 'A', qty: 40 }, { warehouse: 'B', qty: 5 }]
  },
  {
    item: 'postcard',
    instock: [{ warehouse: 'B', qty: 15 }, { warehouse: 'C', qty: 35 }]
  }
];

async function run() {
  await ArrayModel.insertMany(arrDocuments)
    .then(function(doc) {
      console.log('success Insert!');
    })
    .catch(err => console.log(err));

  await ArrayModel.find({ 'instock.qty': { $lte: 20 } })
    .then(function(doc) {
      console.log(doc);
      console.log(
        'Document Fetched! - Specify a Query Condition on a Field Embedded in an Array of Documents'
      );
    })
    .catch(err => console.log(err));
}

run();

/* 
-----------------------------------------------
This code has been Written By Gun Gun Febrianza
Need Help ? Advice ? or Ask Question hit me at:
gungunfebrianza@gmail.com

Dont Hesitate to connect with me on social media:
Facebook: www.facebook.com / papabitcoin
Twitter: @daddybitcoin
Instagram: mas.ggun */
