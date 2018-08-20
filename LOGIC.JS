
 
 // Initialize Firebase
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyB4lU8J14Aqp8pBhnGGZ-d_JPQ8n79boEQ",
    authDomain: "my-first-proj-37324.firebaseapp.com",
    databaseURL: "https://my-first-proj-37324.firebaseio.com",
    projectId: "my-first-proj-37324",
    storageBucket: "my-first-proj-37324.appspot.com",
    messagingSenderId: "154683175180"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

  $("#addDataButton").on("click", function(){

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain =moment( $("#firstTrain").val().trim(),'HH:mm').subtract(10,"years").format("x");
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name : trainName,
        destination : destination,
        firstTrain : firstTrain,
        frequency : frequency
    }

    trainData.ref().push(newTrain);


    console.log(trainName)
    console.log(destination)
        console.log(firstTrain);
        console.log(frequency)

        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
    return false;
  })
  
  trainData.ref().on("child_added", function(snapshot){
      var name = snapshot.val().name;
      var destination = snapshot.val().destination;
      var frequency = snapshot.val().frequency;
      var firstTrain = snapshot.val().firstTrain;

      var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
      var minutes = frequency - remainder;
        var arrival = moment().add(minutes,"m").format("hh:mm A");
        console.log(remainder);
        console.log(minutes);
        console.log(arrival);

        $("#trainTable > tBody").append("<tr><td>" + name +
                                         "<td><td>" + destination + 
                                         "<td><td>" + frequency +   
                                         "<td><td>" + arrival +  
                                         "<td><td>" + minutes +  "</td></tr>" );

  })
