var couchbase = require('couchbase');
var ottoman = require('ottoman');

var myCluster = new couchbase.Cluster('localhost:8091');
var myBucket = myCluster.openBucket('user');
ottoman.bucket = myBucket;

require('./model/user');

ottoman.ensureIndices(function(err){
	if (err) return console.error(err);
});