Firebase.enableLogging(true);
/*var f = new Firebase('https://chrome-sample.firebaseio-demo.com/');

f.transaction(function(curr) {
  if (isNaN(parseFloat(curr)))
    return 1; // initialize to 1.
  else
    return curr + 1; // increment.
}, function() {
    // Once the transaction has completed, update the UI (and watch for updates).
    f.on('value', function(s) {
      document.getElementById('contents').innerHTML = s.val();
    });
  });
*/

// TODO: Replace with your Firebase app
var myFirebaseApp = "chrome-reflect";

// Reference to the entry object in your Firebase
var entry = new Firebase("https://" + myFirebaseApp + ".firebaseio.com/entry");

// Save a new entry to the database, using the input in the form
var submitEntry = function () {

  // Get input values from each of the form elements
  //var title = $("#talkTitle").val();
  //var presenter = $("#talkPresenter").val();
  var content = $("#entryContent").val();

  // Push a new entry to the database using those values
  entry.push({
    //"title": title,
    //"presenter": presenter,
    "content": content
  });
};

// Get the single most recent entry from the database and
// update the table with its values. This is called every time the child_added
// event is triggered on the entry Firebase reference, which means
// that this will update EVEN IF you don't refresh the page. Magic.
entry.limitToLast(1).on('child_added', function(childSnapshot) {
  // Get the recommendation data from the most recent snapshot of data
  // added to the recommendations list in Firebase
  entry = childSnapshot.val();

  // Update the HTML to display the recommendation text
  //$("#title").html(recommendation.title)
  //$("#presenter").html(recommendation.presenter)
  $("#content").html(entry.content)

  // Make the link actually work and direct to the URL provided
  //$("#link").attr("href", recommendation.link)
});

// When the window is fully loaded, call this function.
// Note: because we are attaching an event listener to a particular HTML element
// in this function, we can't do that until the HTML element in question has
// been loaded. Otherwise, we're attaching our listener to nothing, and no code
// will run when the submit button is clicked.
$(window).load(function () {

  // Find the HTML element with the id recommendationForm, and when the submit
  // event is triggered on that element, call submitRecommendation.
  $("#entryForm").submit(submitEntry);

});