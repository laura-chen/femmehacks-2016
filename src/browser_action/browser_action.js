Firebase.enableLogging(true);

var myFirebaseApp = "chrome-reflect";

// Reference to your entire Firebase database
var myFirebase = new Firebase("https://" + myFirebaseApp + ".firebaseio.com/");

// Get a reference to the recommendations object of your Firebase.
// Note: this doesn't exist yet. But when we write to our Firebase using
// this reference, it will create this object for us!
var entries = myFirebase.child("entries);

// Push our first recommendation to the end of the list and assign it a
// unique ID automatically.
entries.push({
    "title": "The danger of a single story",
    "date": "2/6/16",
    "content": "https://www.ted.com/talks/chimamanda_adichie_the_danger_of_a_single_story"
});

//var f = new Firebase('https://chrome-sample.firebaseio-demo.com/');

// TODO: Replace with your Firebase app
var myFirebaseApp = "chrome-reflect";

// Reference to the entries object in your Firebase
var entries = new Firebase("https://" + myFirebaseApp + ".firebaseio.com/entries");

// Save a new recommendation to the database, using the input in the form
var submitEntry = function () {

  // Get input values from each of the form elements
  var title = $("#entryTitle").val();
  var date = $("#entryDate").val();
  var content = $("#entryContent").val();

  // Push a new recommendation to the database using those values
  entries.push({
    "title": title,
    "date": date,
    "content": content
  });
};

// Get the single most recent recommendation from the database and
// update the table with its values. This is called every time the child_added
// event is triggered on the recommendations Firebase reference, which means
// that this will update EVEN IF you don't refresh the page. Magic.
entries.limitToLast(1).on('child_added', function(childSnapshot) {
  // Get the recommendation data from the most recent snapshot of data
  // added to the recommendations list in Firebase
  entry = childSnapshot.val();

  // Update the HTML to display the recommendation text
  $("#title").html(entry.title)
  $("#date").html(entry.date)
  $("#content").html(entry.content)

  // Make the link actually work and direct to the URL provided
  $("#link").attr("href", entry.link)
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

entries.transaction(function(curr) {
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
