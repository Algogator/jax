var bodyParser = require('body-parser');
var db = require('../schema/db');
var user = require('../schema/model/user')
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

	app.post('/api/user/create', jsonParser, function(req, res){

		user.createAndSave(req.body.name, function(err, done){

			if(err){
				res.status = 400;
				res.send(err.toString());
				return;
			}
			res.status = 201;
			res.send(done);
			return;
		});
	});

	app.get('/api/user/findUser/:id', function(req, res){

		user.findByID(req.params.id, function(err, names){
			if (err){
				res.status = 400;
				res.send(err);
				return;
			}
			if(names && names.length > 0){
				res.status = 202;
				res.send(names);
				return;
			}
			else{
					user.findByname(req.params.id, function(err, names){

						if (err) {
							res.status = 400;
							res.send(err);
							return;
						}
						if(names && names.length > 0){
							res.status = 202;
							res.send(names);
							return;
						}
						else{
							res.status = 202;
							res.send("{Not Found}");
							return;
						}		
			});
		}


		});
	});
}