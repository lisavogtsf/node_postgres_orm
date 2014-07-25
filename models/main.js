var Person = require('./person');

var Models = {};

Models.Person = Person;

var noob = {firstname: "Windsay", lastname: "Wohan"};
Models.Person.create(noob, function(err, noobPerson){
console.log(noobPerson);
});


// working all function
// Models.Person.all(function(err, people){
//   // logs all database elements
//   console.log(people);
// });

// non-functioning findBy
// Models.Person.findBy('firstname', 'Mary', function(err, foundPerson){
//   console.log("Found: ", foundPerson);
//   // console.log("query is: WHERE " + key + "=$1",[val]);
// });




// findby and update
// Models.Person.findBy("id", 32, function(err, person){
//   console.log("found", person);
//   person.update({firstname: "sam", lastname: "creek"}, function(err, person){
//     console.log("UPDATED:", person)
//   });
// })



// Person.prototype.update = function(params, callback){ id: 32,
//     firstname: 'Lala Lala',
//     lastname: 'Walla Walla',
//     created_at: Thu Jul 24 2014 19:38:54 GMT-0700 (PDT) };



module.exports = Models;