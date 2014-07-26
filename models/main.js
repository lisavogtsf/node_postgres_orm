var Person = require('./person');

var Models = {};

Models.Person = Person;



// // destroy tests
// var terry = {firstname: 'Terry', lastname: 'Vogt'};

// Models.Person.create(terry, function(err, tv){
//   console.log("create TV", tv);
//   tv.destroy();
//   console.log("destroyed? ", tv);
// });



// destroy tests
// use find to feed in a person

Models.Person.findBy("id", 57, function(err, person){
  console.log("found for destruction", person);

  person.destroy(function(err, res){
    console.log("DELETED:", person)
  });
})





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

// 

// // update function--working
// // findby and update
// // find passes a foundPerson object into update
// // then update sets 
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