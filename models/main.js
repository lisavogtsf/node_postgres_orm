var Person = require('./person');

var Models = {};

Models.Person = Person;

// test files for person.js SQL methods


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


// // update function--working
// // findby and update
// // findBy passes a foundPerson object into update
// // then update sets 
// Models.Person.findBy("id", 45, function(err, person){
//   // console.log("found", person);
//   person.update({firstname: "Sean", lastname: "Grey"}, function(err, person){
//     // console.log("UPDATED:", person)
//   });
// })


// destroy function -- working
// use find to feed in a person

// Models.Person.findBy("id", 57, function(err, person){
//   console.log("found for destruction", person);
//   person.destroy(function(err, res){
//     console.log("DELETED:", person)
//   });
// })

module.exports = Models;