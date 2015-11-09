var myVar;
function startTimer() {
  myVar = setInterval(function(){myTimer()},1000);
  timelimit = maxtimelimit;
}
function myTimer() {
  if (timelimit > 0) {
    curMinute=Math.floor(timelimit/60);
    curSecond=timelimit%60;
    if (curMinute!=0) { curtime=curMinute+" minutes and "+curSecond+" seconds left"; }
              else { curtime=curSecond+" seconds left"; }
    $_('timeleft').innerHTML = curtime;
  } else {
    $_('timeleft').innerHTML = timelimit+' - Out of Time - no credit given for answer';
    clearInterval(myVar);
  }
  timelimit--;
}


var pos = 0, posn, choice, correct = 0, rscore = 0;
var maxtimelimit = 20, timelimit = maxtimelimit;  // 20 seconds per question

var questions = [
["who was recently appointed as the new Union home secretary? ",
"LC Goyal ",
"Rajiv Mehrishi ",
"RP Watal ",
"Ajit Seth",'B'],

["Who along with Anshu Gupta won the Ramon Magsaysay award for 2015? ",
"Sanjiv Chaturvedi ",
"Harish Hande ",
"Neelima Mishra ",
"Deep Joshi","A"],

["Which bank along with SBI was recently designated as D-SIBS of India by Reserve bank of India? ",
"HDFC ",
"ICICI ",
"Axis Bank ",
"IDBI Bank","B"],

["Which mountain of North America was recently renamed as \'Denali\'? ",
"Mount Logan ",
"Mount Saint Elias ",
"Pico de Orizaba ",
"Mt McKinley","D"],

["which country was defeated by India in the Test match recently to help it win Test series abroad after four years?",
"a) West Indies ",
"South Africa ",
"Sri Lanka ",
"England","C"],

["Name the judge who headed the panel set up to look into the applicability of Minimum Alternate Tax. ",
"Justice AP Shah ",
"Justice AB Sharan ",
"Justice Jyoti Singh ",
"Justice Harshvardhan","A"],

["Name the migrant toddler of Syria whos washed away death photo created lots of waves in favour of migrants. ",
"Asad Usman ",
"AylanKurdi ",
"Mustafa Tsah ",
"Ali Farzan","B"],

["What does OROP stands for? ",
"One Rank One Person ",
"One Rank One Pay ",
"One Rank One Pension ",
"None","C"],

["Which country recently organized a big display of arms and ammunition to commemorate 70 years of victory over Japan in World War II? ",
"China ",
"Germany ",
"Britain ",
"France","A"],

["Which Indian pugilist won silver in the middle weight (75kg) category at the Asian Boxing Championship at Bangkok recently? ",
"Akhil Kumar ",
"Vikas Krishan Yadav ",
"Vijender Singh ",
"None","B"],

["The Sri Lankan cricketer who recently announced his retirement from cricket? ",
"Kumar Sangakkara ",
"Angelo Mathews ",
"Mahela Jayawardhene ",
"Arvind de Silva","A"],

["What is the name the bordering country with which India recently signed an agreement to construct a 41-km long pipeline connecting both countries? ",
"Bhutan ",
"Nepal ",
"Afghanistan ",
"Bangladesh","B"],

["Which team won the Pro Kabaddi League Championships 2015? ",
"Bengaluru Bulls ",
"Dabang Delhi ",
"Telgu Titans ",
"U Mumba","D"],

["Name the country which recently celebrated 70 years of the famous La Tomatina festival. ",
"Portugal ",
"Brazil ",
"Spain ",
"Paraguay","B"],

["Which state government recently bought the famous Ambedkar house in London? ",
"Uttar Pradesh ",
"Maharashtra ",
"Madhya Pradesh ",
"Gujarat","B"],

["Name the South African batsman who recently achieved the distinction of reaching 8000 run mark in ODI in the fastest time. ",
"AB de Villers ",
"Jacques Kallis ",
"Graeme Smith ",
"Hashim Amla","A"],

["Name the country against which Virat Kohli won the first Test match as a captain. ",
"Bangladesh ",
"Zimbabwe ",
"South Africa ",
"Sri Lanka","D"],

[" Which famous road in Delhi is going to be renamed as the APJ Kalam Road in honour of the former President who passed away last month? ",
"Tilak Marg ",
"Aurangzeb Road ",
"Palam Marg ",
"Rajpath","B"],

["Which player was recently honoured with country’s highest sporting honour, the Rajiv Gandhi Khel Ratna? ",
"Saina Nehwal ",
"Rahul Dravid ",
"Virat Kohli ",
"Sania Mirza","D"],

["In which game women team qualified for the next year\’s Olympic after 36 years? ",
"Hockey ",
"Football ",
"Yachting ",
"Tennis","A"],

["Name the Indian golfer who recently notched India’s best ever result in golf at a major championship? ",
"Jeev Milkha Singh ",
"Anirban Lahiri ",
"Shiv Kapur ",
"Jyoti Randhawa","B"],

["Which bank recently launched SMILE for the growth of Small and Medium Enterprises? ",
"SIDBI ",
"State Bank of India ",
"Punjab National Bank ",
"Union Bank of India","A"],

["Who was recently sworn in as the new Prime Minister of Sri Lanka? ",
"Mahinda Rajapaksa ",
"Maithripala Sirisena ",
"Ranil Wickremesinghe ",
"Ajith Rajapaksa","C"],

["The Prime Minister of Greece who announced his resignation recently? ",
"Karolos Papoulias ",
"Antonis Samaras ",
"Panagiotis Pikramenous ",
"Alexis Tsipras","D"],

["The venue of the 2nd Forum for India-Pacific Islands Cooperation Summit (FIPIC) which was held recently in India?",
"Jaipur ",
"Pune ",
"Bengaluru ",
"Kolkata","A"],

["Name the Indian cricketer who recently created a world record of taking maximum catches in a Test match? ",
"Virat Kohli ",
"Ajinkya Rahane ",
"Rohit Sharma ",
"Shikhar Dhawan","B"],

["Who was recently appointed as the new CMD of Air India? ",
"Sushil Thakkar ",
"Anjani Kumar ",
"Jaidev Bhattacharya ",
"Ashwani Lohani","D"],

["Who is the founder of Bandhan Bank which was inaugurated recently? ",
"Chandra Sekhar Ghosh ",
"Sanjay Ghosh ",
"Sanjay Bandopadhaya ",
"Sekhar Agarwal","A"],

["Who won the 100m World Championship title recently? ",
"Andre De Grasse ",
"Trayvon Bromell ",
"Usain Bolt ",
"Justin Gatlin","C"]
];
var questionOrder = [];
function setQuestionOrder() {
  questionOrder.length = 0;
  for (var i=0; i<questions.length; i++) { questionOrder.push(i); }
  questionOrder.sort(randOrd);   // alert(questionOrder);  // shuffle display order
  pos = 0;  posn = questionOrder[pos];
}

function $_(IDS) { return document.getElementById(IDS); }
function randOrd() { return (Math.round(Math.random())-0.5); }
function renderResults(){
  var test = $_("test");
  test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
  $_("test_status").innerHTML = "Test Completed";
  $_('timeleft').innerHTML = '';
  test.innerHTML += '<button onclick="location.reload()">Restart test</a> ';
  setQuestionOrder();
  correct = 0;
  clearInterval(myVar);
  return false;
}
function renderQuestion() {
  var test = $_("test");
  $_("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
  if (rscore != 0) { $_("test_status").innerHTML += '<br>Currently: '+(correct/rscore*100).toFixed(0)+'% correct'; }
  var question = questions[posn][0];
  var chA = questions[posn][1];
  var chB = questions[posn][2];
  var chC = questions[posn][3];
  var chD = questions[posn][4];
  test.innerHTML = "<h3>"+question+"</h3>";
  test.innerHTML += "<label><input type='radio' name='choices' value='A'> "+chA+"</label><br>";
  test.innerHTML += "<label><input type='radio' name='choices' value='B'> "+chB+"</label><br>";
  test.innerHTML += "<label><input type='radio' name='choices' value='C'> "+chC+"</label><br>";
  test.innerHTML += "<label><input type='radio' name='choices' value='D'> "+chD+"</label><br><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
  timelimit = maxtimelimit;
  clearInterval(myVar);
  startTimer();
}

function checkAnswer(){
  var choices = document.getElementsByName("choices");
  for (var i=0; i<choices.length; i++) {
    if (choices[i].checked) { choice = choices[i].value; }
  }
  rscore++;
  if (choice == questions[posn][5] && timelimit > 0) { correct++; }
  pos++;  posn = questionOrder[pos];
  if (pos < questions.length) { renderQuestion(); } else { renderResults(); }
}

function startQuiz() {
  setQuestionOrder();
  renderQuestion();
}