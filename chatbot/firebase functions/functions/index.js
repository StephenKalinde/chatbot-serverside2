const functions = require('firebase-functions');
var admin=require("firebase-admin");

admin.initializeApp(functions.config().firebase);

//database firestore
var firestore= admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


//on request function (read/write)
exports.webhook = functions.https.onRequest((request, response) => {
    /*log*/
    console.log("request.body.result.parameters: ", request.body.result.parameters);

    /*parameters */
    let params= request.body.result.parameters;


    /*adding to database*/
    firestore.collection('PEOPLE').add(params)
        .then(()=>{
            response.send({
                speech: 'saved'
            });
        })
        .catch((e =>{

            /*log*/
            console.log("error",e);

            response.send({
                speech:'something went wrong in the database'
            });
        }))


});
