var Person = require('./person');

var Models = {};

Models.Person = Person;

// var noob = {firstname: "Mala", lastname: "Kalla"};
// Models.Person.create(noob, function(err, person){
// });

Models.Person.all(function(err, people){
  // logs all database elements
  console.log(people);
});


// Models.Person.findBy("id", 1, function(err, person){
//   console.log("found", person);
//   person.update({firstname: "sam", lastname: "creek"}, function(err, person){
//     console.log("UPDATED:", person)
//   });
// })

// non-functioning findBy
// Models.Person.findBy("firstname", 'Slim', function(err, person){
//   console.log("Found: ", person);
// });

// Person.prototype.update = function(params, callback){ id: 32,
//     firstname: 'Lala Lala',
//     lastname: 'Walla Walla',
//     created_at: Thu Jul 24 2014 19:38:54 GMT-0700 (PDT) };



module.exports = Models;