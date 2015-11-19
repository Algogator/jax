var db = require('./../db.js');
var ottoman = require('ottoman');

var UserModel = ottoman.model('User', {
	uid: {type: 'string', auto: 'uuid', readonly:true},
	name: 'string'
}, {
	index: {
		findByID: {
			type: 'refdoc',
			by: 'uid'
		},
		findByname: {
			by: 'name',
			type: 'refdoc'
		}
	}
});

UserModel.createAndSave = function(name, done){
	this.create({
		name: name
	}, done);
}

module.exports = UserModel;