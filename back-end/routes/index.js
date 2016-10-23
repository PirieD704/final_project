var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost:27017/game';
// var Account = require('../models/accounts');
// mongoose.connect(mongoUrl);

// include bcrypt to store hashed pass
// var bcrypt = require('bcrypt-nodejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next){
	Account.findOne(
		{username: req.body.username},
		function(error, document){
			if(document != null){
				res.json({name: 'nameTaken'});
			}else{
				if(req.body.password != req.body.password2){
					res.json({
						message: 'passmatch'
					});
				}else{
					var accountToAdd = new Account({
						username: req.body.username,
						password: bcrypt.hashSync(req.body.password),
						email: req.body.email,
					});

					accountToAdd.save(function(error, documentAdded){
						console.log(error);
						if(error){
							res.json({
								message: 'errorAdding'
							})
						}else{
							res.json({
								message: 'added',
								username: req.body.username,
							});
						}
					});
				}				
			}
		})
});

module.exports = router;
