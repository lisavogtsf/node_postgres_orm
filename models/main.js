var Person = require('./person');

var Models = {};

Models.Person = Person;

var tim = {firstname: "Tim", lastname: "Licata"};
Models.Person.create(tim, function(err, person){
  console.log("add instructor to db");
});

Models.Person.all(function(err, people){
  // logs empty array []
  console.log(people);
});

// Models.Person.findBy("id", 1, function(err, person){
//   console.log("found", person);
//   person.update({firstname: "sam", lastname: "creek"}, function(err, person){
//     console.log("UPDATED:", person)
//   });
// })

module.exports = Models;