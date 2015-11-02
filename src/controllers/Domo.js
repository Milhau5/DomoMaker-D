var _ = require('underscore');
var models = require('../models');

var Domo = models.Domo;

var makerPage = function(req, res) {

  Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs) {

    if(err) {
      console.log(err);
      return res.status(400).json({error: 'An error occurred'});
    }

    res.render('app', {csrfToken: req.csrfToken(), domos: docs});
  });

};

var makeDomo = function(req, res) {

  if(!req.body.name || !req.body.age) {
    return res.status(400).json({error: "RAWR! Name, age, and weight ARE are required"});
  }

  var domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
    weight: req.body.weight
  };

  var newDomo = new Domo.DomoModel(domoData);

//saves the object in a database
  newDomo.save(function(err){
    if(err) {
      console.log(err);
      return res.status(400).json({error: 'An error occured'});
    }

    res.json({redirect: '/maker'});
  });

};

/*var deleteDomo = function(req, res) {
  //delete a 'domoData' JSON object
  //.remove from the database......a mongoose query
  //use ids

   //this should remove a domo from the id of the current user
   //this might actually get rid of all of them, though
   //db.domos.remove({}), where 'domos' is the collection, could use findByIdAndRemove with err,docs
  Domo.DomoModel.remove({_id: }, function(err) {
    if(err) {
      //console.log(err);
      res.json(err);
    }


else{
    //redirect after all is said and done
    //res.json({redirect: '/maker'}); //maker?
    res.redirect('/maker');
  }
  });

};*/

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
//module.exports.deleteDomo = deleteDomo;
