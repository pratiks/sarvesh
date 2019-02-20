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
    uri: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
    method: 'GET',
    qs: { 
    location: '30.3076863,-97.8934848',
     radius: '1000',
     query: 'yoga',
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
  
  //  see "google/googleResponseSchema.json"  
  //  response comes back in the body.results
  // we still need to process this response object and get only the things we want! thats the next step.
  const results = googleResponse.body.results;   
  //check to see if results from Google API was not an empty array, we check the length of the array is not less than 1. 
   if (!results.length < 1){
     // call our internal functions to get the data we want
     const yogaCount = getCountOfYogaPlaces(results);
     const yogaPlaceMetaData = getYogaPlaceMetaData(results);
     console.log(yogaPlaceMetaData); 
     // send back to our Server route.
     return { count: yogaCount, yogaPlaceMetaData: yogaPlaceMetaData }

   } else {
      // if google API returned nothing ( an empty array, we still have to send our server route a valid response ).
     return { count: 0, yogaPlaceMetaData: [] }
   }


  }catch(err){
   return err;
  }

};

/* 

  Controller Business Logic Private Functions

We do not export these functions as this is only for the controller to use internally within this modules. 

*/

// returns the number of yoga studios found.
const getCountOfYogaPlaces = function(results) {
  return results.length;
};



// returns names from original results object from google.
const getYogaPlaceMetaData = function (results){
  let currentYogaPlace = {};
  let metadataArray = [];
  console.log(results)
  // iterate the array, combing thru each item [ {item}, {item}, {item}, {item} ]
  // push items we want to the new array we created in this function, then at the end, return that array
  for(let i=0;i<results.length;i++){
    // assign the variable we defined as empty object the current element
    currentYogaPlace = results[i];

    // set this value as a default for the detail_url incase the site does not have one.  We change it later if they do.
    let detail_url = "http://www.google.com";
    
    
    // For each iteration, get the items we want.  
    
    const name = currentYogaPlace.name;
   
    // check if this key exists in the object, it is not required.
    if(currentYogaPlace.hasOwnProperty('photos')) {
      const photos = currentYogaPlace.photos[0];
      let detailArray = photos.html_attributions;
      detail_url = detailArray[0];
    } 
    
    const ratings = currentYogaPlace.ratings;
    const address = currentYogaPlace.formatted_address;
    
    // pushing a new object to an array each time
    metadataArray.push({ name: name, ratings: ratings, address: address, detail_url: detail_url })
  }
  
  return metadataArray;
}




module.exports = { getYogaPlacesInAustinHandler }