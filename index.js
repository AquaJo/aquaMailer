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
var fs = require('fs');


let discordService;
if (config.discord.useService) {
  discordService = require('./discording.js');
}

// SOME "work"-FUNCTIONS
Array.prototype.chooseRandom = function(probabilities) {
  info = {};
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  // Function to return gcd of a and b
  function gcd(a, b) {
    if (a === 0)
      return b;
    return gcd(b % a, a);
  }
  // Function to find gcd of array
  // of numbers
  function findGCD(arr, n) {
    let result = arr[0];
    for (let i = 1; i < n; i++) {
      result = gcd(arr[i], result);

      if (result === 1) {
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
  console.group("*chooseRandom-dialog*")
  console.log(info);
  console.groupEnd();
  // return random item of index in range of array length / return random item of possibilityArray / result, random item as of given probabilities
  return array[possibilityArray[getRandomInt(possibilityArray.length)]];
}; // returns random item from given array with given probabilities
// "work"-FUNCTIONS end

app.use("/public", express.static(path.join(__dirname, 'public')));

let htmlData; // if a template for failcreation wanted ... standard input
if (config.server.useService) {
  // RATE LIMITING FOR WHOLE PROJECT PER USER
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: config.server.config.requestPeriod, // 15 minutes
    max: config.server.config.maxRequestsInPeriod, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
  // Apply the rate limiting middleware to all requests
  app.use(limiter);
}

// To accept HTML form data
app.use(express.urlencoded({ extended: false }));

var whitelist = config.server.corsWhitelist;
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


let heroSettings = config.email.config.receiverHTML.backgroundTopicsAndPossibilities;
emailTemplateHeroImageUrls = [];
let probabilitiesHeros = [];
for (let i = 0; i < heroSettings.length; ++i) {
  emailTemplateHeroImageUrls.push(heroSettings[i][0]);
  probabilitiesHeros.push(heroSettings[i][1]);
}

/*
let emailTemplateHeroImageUrls = [
  'https://source.unsplash.com/random/?futuristic',
  'https://source.unsplash.com/random/?nature',
  'https://source.unsplash.com/random/?abstract',
  'https://source.unsplash.com/random/?universe'
]; // /themes
*/
app.post("/submit", cors(corsOptions), async (req, res) => {
  res.on('finish', function() {
    console.groupEnd();
  });

  let successfulRecaptcha;
  let warnings = [];
  console.group("*messaging-dialog*");
  console.log(req.get('origin'));
  console.log("received submit");
  if (config.recaptcha.useService) {

    // getting site key from client side
    const response_key = req.body["g-recaptcha-response"];
    // Put secret key here, which we get from google console
    const secret_key = config.recaptcha.config.recaptchaSecretKey;

    // Hitting POST request to the URL, Google will
    // respond with success or error scenario.
    const url =
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;
    const response = await fetch(url, {
      method: "post",
    }).catch((error) => {
      // Some error while verify captcha
      console.log("submit recaptcha error: " + error);
      warnings.push("Recaptcha-validation failed. Serverside catch happened.")
      checkLenghts();
      let lengthTestRes = testFailEnd();
      if (lengthTestRes !== true) return lengthTestRes;
      //return res.json({ error });
    });
    const responseData = await response.json();
    successfulRecaptcha = responseData.success;
  } else {
    successfulRecaptcha = true;
  }


  let msg;
  let from;
  let fromMail;
  // Making POST request to verify captcha
  if (successfulRecaptcha) {
    //   if captcha is verified // not needed
    console.log("submit recaptcha successful or not needed");

    checkLenghts();
    let lengthTestRes = testFailEnd();
    if (lengthTestRes !== true) return lengthTestRes;

    if (config.email.useService) { // if email sending wanted now do mailing stuff
      await new Promise((resolve, reject) => {
        mailOptions.subject = from.length > 0 ? (from + (fromMail.length > 0 ? " / " : "")) : "";
        mailOptions.subject += fromMail.length > 0 ? fromMail : "";
        if (mailOptions.subject === "") {
          mailOptions.subject = "no name nor mail";
        }

        //mailOptions.text = msg
        function getRandomInt(max) {
          return Math.floor(Math.random() * max);
        }
        //choose random background image theme and random parameter for variation
        //let randIndexImg = getRandomInt(emailTemplateHeroImageUrls.length); used before chooseRa
        let theme = emailTemplateHeroImageUrls.chooseRandom(probabilitiesHeros); // doesn't need to be 100 can be 'anything' positive
        let imgRedirectUrl = "";
        if (Array.isArray(theme)) {
          imgRedirectUrl = theme[Math.floor(Math.random() * theme.length)];
        } else {
          let randIndexImgParameter = getRandomInt(976464);
          imgRedirectUrl = (theme + "&" + randIndexImgParameter);
        }

        // get final url from redirecting unsplash url; not sure if needed/is a solution because worked also without BUT sometimes didn't ...
        fetch(imgRedirectUrl).then(function(response) {
          let finalImgUrl = response.url;
          console.log("using img-theme: " + (Array.isArray(theme) ? "type array, length of " + theme.length : theme));
          console.log("using background image: " + finalImgUrl);
          // render html and send
          let configReference = config.email.config.receiverHTML;
          let styleRightBtn = "";
          let styleLeftBtn = "";
          let styleLogo = "";
          if (configReference.buttonRight[0] === null || configReference.buttonRight[1] === null) {
            styleRightBtn = "display:none !important;width:0px;max-height:0px;overflow:hidden;mso-hide:all;height:0;font-size:0;max-height:0;line-height:0;margin:0 auto;";
          }
          if (configReference.buttonLeft[0] === null || configReference.buttonLeft[1] === null) {
            styleLeftBtn = "display:none !important;width:0px;max-height:0px;overflow:hidden;mso-hide:all;height:0;font-size:0;max-height:0;line-height:0;margin:0 auto;";
          }
          if (configReference.ejs_Logo === null || configReference.ejs_Logo === "") {
            styleLogo = "height:94px";
          }
          ejs.renderFile(__dirname + '/emailTemplate/index.ejs', { ejs_Message: msg, ejs_From: from, ejs_FromMail: fromMail, ejs_BackgroundImg: finalImgUrl, ejs_ImageTitle: configReference.ejs_ImageTitle, ejs_Greeting: configReference.ejs_Greeting, ejs_Info: configReference.ejs_Info, ejs_btn1Href: configReference.buttonLeft[1], ejs_btn1Text: configReference.buttonLeft[0], ejs_btn2Href: configReference.buttonRight[1], ejs_btn2Text: configReference.buttonRight[0], ejs_btn2Style: styleRightBtn, ejs_btn1Style: styleLeftBtn, ejs_Logo: configReference.ejs_Logo, ejs_LogoStyle: styleLogo }, async (err, data) => {
            //console.log(data);
            mailOptions.html = data;
            let currentTransporter = 0;
            while (currentTransporter < config.email.config.main.transporterObjects.length) { // check transporters till success
              let transporter = setTransport(currentTransporter);
              let mailOptions = refreshMailOptions(currentTransporter);
              let promise = await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, function(err, datab) {
                  if (err) {
                    console.log("got smtp error on instance " + currentTransporter + ": " + err);
                    resolve(false);
                  } else {
                    console.log("succeeded smtp transfer on instance " + currentTransporter);
                    resolve(true);
                  }
                })
              })
              if (promise && !config.discord.useService) {
                return res.send({ response: "Successful" }); // return ends while
              } else if (promise && config.discord.useService) {
                resolve(true);
                break;
              } else {
                return res.send({ response: "SMTPServicesError" })
              }
              //
              currentTransporter++;
            }
          });
        });
      });
    }

    if (config.discord.useService) {
      let referenceObj = config.discord.config;
      let finalMsg = "";
      finalMsg += "----------------------------------------------------------";
      finalMsg += "\n" + referenceObj.dmMessageInfo;
      if (referenceObj.sendMsgAfterwards) {
        finalMsg += "\nUsername: " + from + "                   " + "Mail: " + fromMail;
        finalMsg += "\n" + msg;
      }
      if (finalMsg.length > 1900) {
        let parts = finalMsg.match(/.{1,1900}/g);
        parts.forEach(element => {
          discordService.sendMsg(referenceObj.dmUsers, element);
        })
      } else {
        discordService.sendMsg(referenceObj.dmUsers, finalMsg);
      }
      console.log("sent discord notifications");
      return res.send({ response: "Successful" });
    }


  } else {
    // if captcha is not verified
    warnings.push("Recaptcha-validation failed.")
    checkLenghts(); // just to include all possible problems for the user ... could also check them always in the beginning so Recaptcha call could be avoided, ...
    let lengthTestRes = testFailEnd();
    if (lengthTestRes !== true) return lengthTestRes;
  }

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

let bumpingObj = config.email.config.bumping;
if (config.email.useService && bumpingObj.useService && bumpingObj.toMail !== null && bumpingObj.msg !== null && bumpingObj.interval !== null) {
  doIntervalBumping();
}
let quotes;
let finalQuoteObj;
let bumpedAlready = false;
async function doIntervalBumping() {
  const getQuotes = async () => {
    try {
      const names = await fetch('https://gist.githubusercontent.com/awran5/355643af99164a61ae0f95c84206d151/raw/c62636e8eef7e73540fa04b67f753ca9b95ee21e/quotes-api.js');
      const textData = await names.text();
      return textData;
    } catch (err) {
      console.log('fetch error', err);
    }
  };
  let lowerbound = bumpingObj.interval[0];
  let upperbound = bumpingObj.interval[1];
  const random = (min, max) => (Math.random() * (max - min) + min).toFixed(4);
  if (bumpingObj.msg === "randomQuote") {
    quotes = JSON.parse(await getQuotes());
  }
  if (bumpingObj.unstableProvider === null || bumpingObj.unstableProvider === false) {
    while (1 === 1) {
      if (bumpingObj.msg === "randomQuote") { // to have the same quote in each mail from one bump execution
        finalQuoteObj = quotes[Math.floor(Math.random() * quotes.length)];
      }
      let timeoutTime = random(lowerbound, upperbound);
      console.group("*smtp-bumper (stable)*");
      console.log("new bump in " + timeoutTime + " minutes");
      console.groupEnd();
      await new Promise(resolve => setTimeout(async function() {
        await bumpAll();
        resolve(true);
      }, 1000 * 60 * timeoutTime));
    }
  } else {
    if (bumpingObj.stableTime) {
      while (1 === 1) {
        let unixNow = await getUnixNow();
        let nextBump = getNextBump();
        let timeoutTime;
        if (unixNow > nextBump) { // exceeded, ... bump and set new reference-time, ... needs to be checked again because of possible server-reset without exceeding nextBump-value
          if (nextBump === 0) {
            console.group("*smtp-bumper starter (unstable, stable)*");
            let timeoutTimeMins = random(lowerbound, upperbound);
            console.log("detected smtp-bumper start due to nextBump.txt text === 0. Setting timeout to " + timeoutTimeMins + " minutes");
            let unixNow = await getUnixNow();
            timeoutTime = timeoutTimeMins * 60 * 1000;
            let newUnix = unixNow + timeoutTime;
            setNextBump(newUnix);
          } else {
            console.group("*smtp-bumper interruption (unstable, stable)*");
            console.log("exceeded timestamp noted in nextBump.txt on server reset. Setting timeout to 0 for immediate bumping");
            timeoutTime = 0;
          }
          console.groupEnd();
        } else {
          timeoutTime = nextBump - unixNow;
          if (!bumpedAlready) {
            console.group("*smtp-bumper interruption (unstable, stable)*");
            console.log("server reset detected ... not bumping now. Setting new, shorter timeout to fit nextBump.txt reference");
            console.log("set timeout time to " + timeoutTime / 1000 / 60 + " min");
            console.groupEnd();
          }
        }

        await new Promise(resolve => setTimeout(async function() {
          console.group("*smtp-bumper final (unstable, stable)*");
          console.log("reached this timeout");
          if (bumpingObj.msg === "randomQuote") { // to have the same quote in each mail from one bump execution
            finalQuoteObj = quotes[Math.floor(Math.random() * quotes.length)];
          }
          await bumpAll();

          // set new stuff
          let unixNow = await getUnixNow();
          let timeoutTime = random(lowerbound, upperbound);
          let newUnix = unixNow + (1000 * 60 * timeoutTime);
          setNextBump(newUnix);
          console.log("new bump in " + timeoutTime + " minutes");
          console.groupEnd();
          bumpedAlready = true;
          resolve(true);
        }, timeoutTime));
      }
    } else {
      // reset nextBump.txt to needed timeout in ms each interval, whose frequency is set in config
      while (1 === 1) {
        let timeoutTime = bumpingObj.unstableTimeInterval * 1000;
        let nextBump = getNextBump();
        if (nextBump === 0) {
          console.group("*smtp-bumper starter (unstable, unstable)*");
          console.log("detected smtp-bumper start due to nextBump.txt text === 0");
          let timeoutTimeMins = random(lowerbound, upperbound);
          console.log("setting bump await-time to " + timeoutTimeMins + " minutes");
          console.groupEnd();
          setNextBump(timeoutTimeMins * 60 * 1000);
          nextBump = timeoutTimeMins * 60 * 1000;
        } else if (!bumpedAlready) { // not even for bumping but for a cycle already finsihed
          console.group("*smtp-bumper interruption (unstable, unstable)*");
          console.log("detected server reset. Continuing interval for " + nextBump / 1000 / 60 + " minutes")
          console.groupEnd();
        }
        if (nextBump < timeoutTime) {
          timeoutTime = nextBump;
        }

        await new Promise(resolve => setTimeout(async function() {
          let newUnix = nextBump - timeoutTime;
          if (newUnix !== 0) {
            setNextBump(newUnix);
          } else { // bumping ... and new nextBump timestamp
            let timeoutTimeMins = random(lowerbound, upperbound);
            setNextBump(timeoutTimeMins * 60 * 1000);
            console.group("*smtp-bumper final (unstable, unstable)*");
            if (bumpingObj.msg === "randomQuote") { // to have the same quote in each mail from one bump execution
              finalQuoteObj = quotes[Math.floor(Math.random() * quotes.length)];
            }
            await bumpAll();
            console.log("set new bump await-time to " + timeoutTimeMins + " minutes");
            console.groupEnd();
          }
          bumpedAlready = true;
          resolve();
        }, timeoutTime));
      }
    }

  }
}

async function bumpAll() {
  console.log("started bumping");
  let transporterCounter = 0;
  while (transporterCounter < config.email.config.main.transporterObjects.length) {
    let transporter = setTransport(transporterCounter);
    let mailOptions = refreshMailOptions(transporterCounter);
    mailOptions.to = bumpingObj.toMail;
    mailOptions.html = "";
    mailOptions.subject = "new bump succeeded";
    if (bumpingObj.msg === "randomQuote") {
      mailOptions.text = finalQuoteObj.quote + "\n" + "  ~ " + finalQuoteObj.author + " - " + finalQuoteObj.profession;
    } else {
      mailOptions.text = bumpingObj.msg;
    }
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function(err, datab) {
        if (err) {
          console.log("got smtp error on instance " + transporterCounter + ": " + err + " (while bumping)");
          resolve(false);
        } else {
          console.log("succeeded smtp transfer on instance " + transporterCounter + " (while bumping)");
          resolve(true);
        }
      })
    })
    transporterCounter++;
  }
  console.log("finished bumping");
}



function setTransport(index) {
  let transporter = nodemailer.createTransport(
    config.email.config.main.transporterObjects[index] // try first item object at first, if fallback, transporter is changed in process every time --> recommended to change first object in this case
  );
  return transporter;
}


var mailOptions;
function refreshMailOptions(index) {
  let copy = mailOptions;
  copy.from = config.email.config.main.fromTag + " <" + config.email.config.main.transporterObjects[index].auth.user + ">";
  return copy;
}
mailOptions = {
  from: config.email.config.main.fromTag + " <" + config.email.config.main.transporterObjects[0].auth.user + ">",
  to: config.email.config.main.receiverMails,
  subject: 'new homepage-msg',
  html: htmlData
};









// INTERVAL BUMP CHECKING STUFF, STABLE TIME
async function getUnixNow() {
  return Date.now();
}

function getNextBump() {
  try {
    var data = fs.readFileSync('nextBump.txt', 'utf8');
    return parseInt(data);
  } catch (e) {
    console.log('Error:', e.stack);
  }
}

function setNextBump(value) {
  fs.writeFileSync('nextBump.txt', value.toString());
}
  //



