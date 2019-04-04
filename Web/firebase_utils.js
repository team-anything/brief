 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyBvuB5BfFnsnUJqgPtrLUyMxLtASNrwKSU",
     authDomain: "digizen-a55ed.firebaseapp.com",
     databaseURL: "https://digizen-a55ed.firebaseio.com",
     projectId: "digizen-a55ed",
     storageBucket: "digizen-a55ed.appspot.com",
     messagingSenderId: "70160889115"
 };
 firebase.initializeApp(config);

 var database = firebase.database();

 async function get_data(sources) {
     var articles = [];
     for (var i = 0; i < sources.length; i++) {
         var snapshot = await firebase.database().ref('bbc/').once('value')
         articles.push(snapshot.val());
     }
     return articles;
 }

 var get_result = async function () {
     var result = await get_data(["bbc","cnn"])
     console.log(result);
 };

 get_result();