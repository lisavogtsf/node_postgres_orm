// sample.js

function Book(){}

// Book.all = function(callback){
//   var results = [{title: "The Giver", author: "L.L."}, 
//     {title: "The Great Gatsby", author: "F. Scott Fitzgerald"}];

//   callback(results);
// }

// Books.all(function(books)){
//   console.log("I got some new books!!");
//   console.log(books);
// })

//////////////

Book.all = function(callback){
  setTimeout(function(){
  var results = [{title: "The Giver", author: "L.L."}, 
    {title: "The Great Gatsby", author: "F. Scott Fitzgerald"}];
  callback(results);
  }, 5000)
}

var toDoLater = function (bookTaco){
  console.log("I got new book tacos!");
  console.log(bookTaco);
};

Books.all(toDoLater)
// ){
//   console.log("I got some new books!!");
//   console.log(books);
// })