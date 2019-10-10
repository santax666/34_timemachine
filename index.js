var TIMEOUT_IN_SECS = 5 * 60

var TEMPLATE = '<style> .timer {position: absolute; color: black; background-color: limegreen; border: 3px double black; width: 120px; font-size: 40px; text-align: center;}</style>\
 <h1 class="timer" id="timer"><span id="timer-minutes">00</span>:<span id="timer-seconds">00</span></h1>'

var QUOTES = ['Работа не волк, но и на нее охотники есть.',
    'Дело тем важнее и сложнее, чем больше времени на него отпущено.',
    'Пытайся достичь невозможного, если хочешь, чтобы твоя работа стала лучше.',
    'Работа, которая на вид кажется легкой, на деле окажется трудной. Работа, которая на вид кажется трудной, на деле окажется невыполнимой.',
    'Работа, которую мы делаем охотно, исцеляет боли.',
    'Если твоя работа говорит за себя, не прерывай ее.',
    'Мотивация к работе - часть мотивации к жизни.',
    'Работа — мое первое наслаждение.',
    'Только два стимула заставляют работать людей: жажда заработной платы и боязнь ее потерять.',
    'Лучше работать без определенной цели, чем ничего не делать.',
    'Вдохновение приходит только во время работы.',
    'Всякий вид работы приятнее, чем покой.',
    'Работа не волк. Зато начальник зверь.',
    'Работа - гораздо большее развлечение, чем развлечения.'
];

var timerContainer = document.createElement('div')
timerContainer.setAttribute("style", "height: 210px; position:fixed; top:0px; z-index:1000; ")
var bodyTag = document.body
bodyTag.insertBefore(timerContainer, bodyTag.firstChild)
timerContainer.innerHTML = TEMPLATE

function getTimestampInSecs() {
    var timestampInMilliseconds = new Date().getTime()
    return Math.round(timestampInMilliseconds / 1000)
}

function getHalfSecs() {
    var timestampInMilliseconds = new Date().getTime()
    return Math.round(timestampInMilliseconds / 500) % 2
}

function padZero(number) {
    return ("00" + String(number)).slice(-2);
}

var timestampOnStart = getTimestampInSecs();
var count_for_next_alert = getTimestampInSecs();

function displayTimer() {
    var currentTimestamp = getTimestampInSecs()
    var countdown = Math.max(TIMEOUT_IN_SECS - (currentTimestamp - timestampOnStart), 0);
    var minutes = Math.floor(countdown / 60);
    var seconds = countdown - minutes * 60;
    document.getElementById('timer-minutes').innerHTML = padZero(minutes);
    document.getElementById('timer-seconds').innerHTML = padZero(seconds);
    var secs_from_last_alert = currentTimestamp - count_for_next_alert
    if (countdown === 0 && secs_from_last_alert > 30) {
        window.alert(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
        count_for_next_alert = getTimestampInSecs();
  }
}

setInterval(displayTimer, 1000);
