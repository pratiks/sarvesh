/**

This is the Controller logic.  

Controllers are where all the business logic is handled.  Server routes will call functions found here ( also known as handlers ) to handle
our business needs, then respond back to the client that called it ( a website, or another API ).

**/

// external dependency, you can see the path does not have a ./ which means it is something that exists in the "node_modules" directory.
// type: "node_modules package.json npm" in google
const rp = require('request-promise');



/** Create our Request Options To Google API: See API GET Request */
  const options = {
    resolveWithFullResponse: true,
    uri: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    method: 'GET',
    qs: { location: '30.3076863,-97.8934848',
     radius: '500',
     types: 'yoga',
     key: `${process.env.API_KEY}`
   },
    json: true
};

/** Google API Handler aka Controller: Fetch Austin Yoga Places Using Google API **/
const getYogaPlacesInAustinHandler = async function () {
try{
  // we are making the request to Google here and awaiting the response.
  const googleResponse =  await rp(options);
  console.log(options);
  // the response comes back as an object
  const resultsObject = googleResponse.body.results;
  return resultsObject;
}catch(err){
 return err;
}
   
};

/* 

  Controller Business Logic Private Functions

We do not export these functions as this is only for the controller to use internally within this modules. 

*/


// returns names from original results object from google.
const getYogaPlacesNames = function (results){

  for(yogaPlaces in results){}
  
}




module.exports = { getYogaPlacesInAustinHandler }