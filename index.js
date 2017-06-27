// Here You can type your custom JavaScript...
var TIMEOUT_IN_SECS = 5 * 60
var TEMPLATE = '<h1>Ты вне реальности уже <span id="timer-minutes">00</span> мин. <span id="timer-seconds">00</span> сек.</h1>'

// adds HTML tag to current page
var timerContainer = document.createElement('div')
timerContainer.setAttribute("style", "position:fixed; background-color:black; left: 10px; top: 30px; padding: 3px; z-index: 10000;")
var bodyTag = document.body
bodyTag.insertBefore(timerContainer, bodyTag.firstChild)
timerContainer.innerHTML = TEMPLATE

function getTimestampInSecs(){
  var timestampInMilliseconds = new Date().getTime()
  return Math.round(timestampInMilliseconds/1000)
}

function padZero(number){
  return ("00" + String(number)).slice(-2);
}

var ShowQuote = function(){
  $.ajax(
  {
    dataType : "jsonp",
    jsonp : "jsonp",
    url : "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=ru",
    error : function(data) {
      alert("Error - 2");
    },
    success : function(response){
      console.log(response.quoteText);
      var quote = response.quoteText;
      if (response.quoteAuthor !== ''){
        quote = quote + ' (' + response.quoteAuthor + ')';
      }
      alert(quote);
    }
  });
};

var timestampOnStart = getTimestampInSecs()

function displayTimer(){
  var currentTimestamp = getTimestampInSecs()
  var secsGone = currentTimestamp - timestampOnStart

  var minutes = Math.floor(secsGone / 60);
  var seconds = secsGone - minutes * 60;
  document.getElementById('timer-minutes').innerHTML = padZero(minutes)
  document.getElementById('timer-seconds').innerHTML = padZero(seconds)
  if (secsGone >= TIMEOUT_IN_SECS && secsGone % 30 === 0) {
      ShowQuote()
  }
}

setInterval(displayTimer, 1000)