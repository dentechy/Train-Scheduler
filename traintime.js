//Initialize Firebase

var config = {
  apiKey: "AIzaSyAT_2U3FEabJCScoOzZmjGoViOt6nKq9Jo",
  authDomain: "trains-8cfd2.firebaseapp.com",
  databaseURL: "https://trains-8cfd2.firebaseio.com",
  storageBucket: "gs://trains-8cfd2.appspot.com"
};

firebase.initializeApp(config);

var trainData = firebase.database();

//Code below adds train to firebase
$("#add-train-btn").on("click", function() {

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "year").format("X");
  var frequency = $("#frequency-input").val().trim();

  var newTrain = {

    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  trainData.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(firstTrain);
  console.log(newTrain.frequency);

  alert("Train was added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

  return false;
});

//More firebase

trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapShot.val());

  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  //Calculations for arrivals
  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
  var tMinutes = tFrequency - tRemainder;

  //Arrival time 
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  console.log(tMinutes);
  console.log(tArrival);
  console.log(moment().format("hh:mm A"));
  console.log(tArrival);
  console.log(moment().format("X"));

  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});
