const configFirst = require("./config.js");
const config = configFirst.config;

var express = require('express');
const fetch = require("isomorphic-fetch");
var app = express();
const nodemailer = require("nodemailer");
const port = 3000;
var cors = require('cors');
const ejs = require('ejs');
var path = require('path');


const discordService = require('./discording.js');

// SOME "work"-FUNCTIONS
Array.prototype.chooseRandom = function(probabilities) {
  info = {};
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  // Function to return gcd of a and b
  function gcd(a, b) {
    if (a == 0)
      return b;
    return gcd(b % a, a);
  }
  // Function to find gcd of array
  // of numbers
  function findGCD(arr, n) {
    let result = arr[0];
    for (let i = 1; i < n; i++) {
      result = gcd(arr[i], result);

      if (result == 1) {
        return 1;
      }
    }
    return result;
  }
  // get highest number for decimal places arr
  function longestDecimalLength(arr) {
    let lengthList = [];
    for (let i = 0; i < arr.length; ++i) {
      // get length of decimal places of individual number in array
      let num = arr[i];
      let splitedNumAsStringArr = (num + "").split(".");

      let resNum = splitedNumAsStringArr.length > 1 ? splitedNumAsStringArr[1] : "";
      lengthList.push(resNum.length);
    }
    return Math.max(...lengthList);
  }
  // end function collection

  let array = this;
  arrayLength = array.length;
  let resIndex;

  if (!Array.isArray(probabilities) || (probabilities.filter(item => typeof item === 'number')).length != probabilities.length || (probabilities.filter(item => item >= 0)).length != probabilities.length) {
    probabilities = [];
    for (let i = 0; i < array.length; ++i) {
      probabilities.push(1); // every probability the same when no valid probability array sent
    }
  }

  // if there are more probabilities than item in array --> remove that indices for easier calc and 'best' gcd
  let lengthDif = probabilities.length - array.length;
  if (lengthDif > 0) {
    probabilities.splice(array.length, lengthDif);
    info.shortedProbabilityList = probabilities;
  }
  //
  // make all probabilities natural numbers including 0
  let powToHaveAllNatured = longestDecimalLength(probabilities);
  if (powToHaveAllNatured != 0) {
    let newList = [];
    for (let i = 0; i < probabilities.length; ++i) {
      newList.push(probabilities[i] * 10 ** powToHaveAllNatured);
    }
    probabilities = newList;
    info.probabilitiesAsNatural = probabilities;
  }
  // find all GCD to have to fill as less array indices as possible
  let GCD = findGCD(probabilities, probabilities.length);
  info.GCD = GCD;
  //divide every number in probabilities with GCD
  for (let i = 0; i < probabilities.length; ++i) {
    probabilities[i] = probabilities[i] / GCD;
  }
  info.probabilitiesAfterDividing = probabilities;
  // fill new array with the count of new probabilities
  let possibilityArray = []; // contains the indices for elements from array / this
  for (let i = 0; i < Math.min(probabilities.length, array.length); ++i) {
    for (let j = 0; j < probabilities[i]; ++j) {
      possibilityArray.push(i); // if array of probabilities length less than length of "array"/ this && !== 0, these indices get probability 0 || if length of probabilites bigger then ignored
    }
  }
  info.indicesPossibilityArr = possibilityArray;
  info.indicesPossibilityArrLength = possibilityArray.length;
  //log info object for documentation ()
  console.log("---");
  console.log("chooseRandom-dialog:");
  console.log(info);
  console.log("---");
  // return random item of index in range of array length / return random item of possibilityArray / result, random item as of given probabilities
  return array[possibilityArray[getRandomInt(possibilityArray.length)]];
}; // returns random item from given array with given probabilities
// "work"-FUNCTIONS end


let htmlData; // if a template for failcreation wanted ... standard input
// RATE LIMITING FOR WHOLE PROJECT PER USER
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use("/public", express.static(path.join(__dirname, 'public')));
// Apply the rate limiting middleware to all requests
app.use(limiter);
// RATE LIMITING 'END'

// To accept HTML form data
app.use(express.urlencoded({ extended: false }));

var whitelist = ['https://fiddle.jshell.net', 'https://aquajo.me']
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}



app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})


let emailTemplateHeroImageUrls = [
  'https://source.unsplash.com/random/?futuristic',
  'https://source.unsplash.com/random/?nature',
  'https://source.unsplash.com/random/?abstract',
  'https://source.unsplash.com/random/?universe'
]; // /themes
app.post("/submit", cors(corsOptions), (req, res) => {
  let warnings = [];
  console.log("------------");
  console.log(req.get('origin'));
  console.log("received submit");
  // getting site key from client side
  const response_key = req.body["g-recaptcha-response"];
  // Put secret key here, which we get from google console
  const secret_key = process.env.RECAPTCHA_SECRET_KEY;

  // Hitting POST request to the URL, Google will
  // respond with success or error scenario.
  const url =
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;



  let msg;
  let from;
  let fromMail;
  // Making POST request to verify captcha
  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => {
      // google_response is the object return by
      // google as a response
      if (google_response.success == true) {
        //   if captcha is verified
        console.log("submit recaptcha successful");

        checkLenghts();
        let lengthTestRes = testFailEnd();
        if (lengthTestRes !== true) return lengthTestRes;

        mailOptions.subject = from.length > 0 ? (from + (fromMail.length > 0 ? " / " : "")) : "";
        mailOptions.subject += fromMail.length > 0 ? fromMail : "";
        if (mailOptions.subject === "") {
          mailOptions.subject = "no name nor mail";
        }

        //mailOptions.text = msg;
        function getRandomInt(max) {
          return Math.floor(Math.random() * max);
        }
        //choose random background image theme and random parameter for variation
        //let randIndexImg = getRandomInt(emailTemplateHeroImageUrls.length); used before chooseRa
        let randIndexImgParameter = getRandomInt(976464);
        let theme = emailTemplateHeroImageUrls.chooseRandom([45, 26, 19,10]); // doesn't need to be 100 can be 'anything' positive
        let imgRedirectUrl = (theme + "&" + randIndexImgParameter);
        // get final url from redirecting unsplash url; not sure if needed/is a solution because worked also without BUT sometimes didn't ...
        fetch(imgRedirectUrl).then(function(response) {
          let finalImgUrl = response.url;
          console.log("using img-theme: " + theme);
          console.log("using backgroundimage: " + finalImgUrl);
          // render html and send
          ejs.renderFile(__dirname + '/emailTemplate/index.ejs', { ejs_Message: msg, ejs_From: from, ejs_FromMail: fromMail, ejs_BackgroundImg: finalImgUrl }, (err, data) => {
            //console.log(data);
            mailOptions.html = data;
            transporter.sendMail(mailOptions, function(err, datab) {
              if (err) {
                console.log("Email-Error " + err);
                warnings.push("Nodemailer-Error occured.")
                testFailEnd();
              } else {
                console.log("Email sent successfully");
              }
              return res.send({ response: "Successful" });
            });
          });
        });
      } else {
        // if captcha is not verified
        warnings.push("Recaptcha-validation failed.")
        checkLenghts(); // just to include all possible problems for the user ... could also check them always in the beginning so Recaptcha call could be avoided, ...
        let lengthTestRes = testFailEnd();
        if (lengthTestRes !== true) return lengthTestRes;
      }
    })
    .catch((error) => {
      // Some error while verify captcha
      console.log("submit recaptcha error: " + error);
      warnings.push("Recaptcha-validation failed. Serverside catch happened.")
      checkLenghts();
      let lengthTestRes = testFailEnd();
      if (lengthTestRes !== true) return lengthTestRes;
      //return res.json({ error });
    });

  function checkLenghts() {
    msg = req.body.message;
    from = req.body.from_name;
    fromMail = req.body.fromMail_name;
    if (msg.length > 4000) {
      warnings.push("Message too long. More than 4000 chars.");
    }
    if (from.length > 100) {
      warnings.push("Name too long. More than 100 chars.");
    }
    if (fromMail.length > 80) {
      warnings.push("Email-address too long. More than 80 chars.");
    }
  }
  function testFailEnd() {
    if (warnings.length != 0) {
      console.log("returning following to client: " + JSON.stringify({ "response": "Failed", "msg": warnings }));
      return res.json({ "response": "Failed", "msg": warnings });
    } else {
      return true;
    }
  }
});


var transporter = nodemailer.createTransport({    
    host: "mail.mail.ee",  
    secure: true,
    secureConnection: false,
    tls: {
        ciphers:'SSLv3'
    },
    requireTLS:true,
    port: 465,
    debug: true,
    auth: {
        user: "aqfws@mail.ee",
        pass: process.env.MAIL_PASSWORD 
    }
});

var mailList = [
  process.env.TO_MAIL
  //process.env.testmail
];
let mailOptions = {
  from: process.env.FROM_MAIL,
  to: mailList,
  subject: 'new homepage-msg',
  html: htmlData
};