
/* This is where your your third-party libs are defined.  
You get these using npmjs.com */
// express is a well-known server in NodeJS 
const express = require('express');
const server = express();

// Leaving an empty line, you define your own libs, modules you are importing from next.
const controller = require('./controller');


// This is something called middleware, don't worry about this.
server.use(express.static('public'));
server.set('view engine', 'ejs');


// THIS IS DECLARING YOUR SERVERS ROUTES
server.get('/', async function(incomingRequest, serverResponse) {
  let results;
  
  try{
    // call our handler to peform our business logic, don't do it at the server level. 
    results = await controller.getYogaPlacesInAustinHandler();
  // this is how you we things in our log console window
    console.log(results);
  serverResponse.render('index',{results: results});
  } catch(err){
      serverResponse.render('index', {results: err.message});
     console.log(err);
  }
  

});

// THIS IS WHERE YOUR SERVER STARTS!
const app = server.listen(process.env.PORT, function() {
  console.log('Your server is listening on port ' + app.address().port);
});

