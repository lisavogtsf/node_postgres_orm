var Person = require('./person');

var Models = {};

Models.Person = Person;

// // create function--working
// var noob = {firstname: "Windsay", lastname: "Wohan"};
// Models.Person.create(noob, function(err, noobPerson){
// console.log(noobPerson);
// });


// // all function--working 
// Models.Person.all(function(err, people){
//   // logs all database elements
//   console.log(people);
// });

// // findBy function--working
// Models.Person.findBy('firstname', 'Blim', function(err, foundPerson){
//   console.log("Found: ", foundPerson);
// });

// update function--working
// findby and update
// find passes a foundPerson object into update
// then update sets 
// Models.Person.findBy("id", 4, function(err, person){
//   console.log("found", person);
//   person.update({firstname: "Sam", lastname: "Spade"}, function(err, person){
//     console.log("UPDATED:", person)
//   });
// })

// // destroy function--not working
// // original function
// Person.prototype.destroy = function(){
//   db.query("", [this.id], function(err, res) {
//     callback(err)
//   });
// }







module.exports = Models;