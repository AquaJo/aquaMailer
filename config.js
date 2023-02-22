/* CHANGE PARAMETERS HERE TO YOUR KEYS/ PARAMS TO FIT YOUR NEEDS, 
--> replace process.env.X with your parameter directly (and add it to gitignore if using git), or use .env variables with dotenv. In replit you can use/ and should use their implementation of secrets (also accessed via .env)
(not necessarily needed to set All parameters to private ones)
for tutorials, also how to set these params, check out my github
*/
let gifArray = process.env.gifs.split("'").filter(function(element, index) { return (index % 2 === 1) }); // REMOVE THIS AND REMOVE FROM RECEIVERHTML OR USE ANOTHER ARRAY AS GIF / IMG LINK ARRAY HERE 
let gifArray2 = process.env.gifs2.split("'").filter(function(element, index) { return (index % 2 === 1) });

module.exports = {
  // useService params use boolean (true/false). If you set it false, config class inside specific parent class wont take action 
  config: {
    server: {
      /* NEEDED */
      corsWhitelist: [process.env.corsSite1, process.env.corsSite2], // set your whitelisted domains here
      /* OPTIONAL, request limiter */
      useService: true,
      config: {
        //set max calls per user for period of time
        requestPeriod: 15 * 60 * 1000, // --> 15 minutes
        maxRequestsInPeriod: 20
      }
    },

    email: {
      useService: true,
      config: {

        main: {
          transporterObjects: [
            {
              host: "smtp.zoho.eu", // set your very individual nodemailer-transporter for using SMTP on your email-account and finally using this message-forwarder
              secure: true,
              port: 465,
              auth: {
                user: process.env.USER_zoho, // user@zohomail.eu
                pass: process.env.PW_zoho
              }
            }, // paste multiple smtp transporter instances to create fallbacks in case objects of smaller indices are not working
            {
              host: "mail.mail.ee",
              auth: {
                user: process.env.USER_mailee, // user@mail.ee 'aqfws@mail.ee',
                pass: process.env.PW_mailee
              }
            }
          ],
          fromTag: "forwarding-service", // Defines an additional name for the sender, keep it "" will set user as main sender - information. Don't use nodemailers scheme like: newName <email@provider.domain>, in this case just write newName
          receiverMails: [ // Where do the messages are supposted to be mailed to?
            process.env.TO_MAIL,
            //,process.env.secondMail
          ]
        },

        receiverHTML: {
          backgroundTopicsAndPossibilities: [
            ['https://source.unsplash.com/random/?futuristic', 45],
            ['https://source.unsplash.com/random/?nature', 26],
            ['https://source.unsplash.com/random/?abstract', 19],
            ['https://source.unsplash.com/random/?universe', 10],
            /* 
            use your own image/gif links by using another array inside first index of selector-arrays
            (for giphy-gif link scraping feel free visiting my other project: gifGrabber - https://github.com/AquaJo/GifGrabber // direct site release - https://aquajo.me/GifGrabber/)
            */
            [gifArray, 900],
            [gifArray2,10000]
          ], // set random images from themes from unsplash || image/ gif links   with specific possibilites for mail cover

          // some HTML-Manipulation-Options from top to bottom
          ejs_Logo: "", // want to show a logo img/gif/webp at the top left? set url here or leave "" or null for no logo
          ejs_ImageTitle: 'server-forwarder', // sets the title of the heading placed inside the image cover
          ejs_Greeting: 'Hey AquaJo,', // sets greeting, placed direct under image
          ejs_Info: 'server sent us a new message from your homepage aquajo.me', // sets the info message under the greeting

          buttonLeft: ["replit.com", "https://replit.com/~"], // set button text (first item) and button href (second item), if no button wanted set one of the items to null without quotation
          buttonRight: ["aquajo.me", "https://aquajo.me"] // same for the right button
        },


        bumping: { // service for bumping / pinging smtp servers. Dont want to use service?, set any of the first three objects to null or set useService to false. 
          useService: true,

          toMail: process.env.TO_MAIL, //mail to send bump msg to
          msg: "randomQuote", // message sent with bumping ("randomQuote" for new random quote each time)
          interval: [30, 40], // bump-intervall in minutes: [min,max] range for some variability


          unstableProvider: true, // hosting provider isn't stable long enough for your interval? example: replit.com. Set to true (Probably not working if server resets and uses first provided version to deploy)

          // for the following options, IF unstableProvider is true, set nextBump.txt to 0 on each manual restart, especially if changing from stableTime to unstable and vice versa
          stableTime: false, // unstable provider, but time-system provided is persistent? set to true, else false
          unstableTimeInterval: 10 // no stable time? System will frequently push lasting timeout time to nextBump.txt to have a reference on system restart. Set frequency time in seconds here (for updating reference, Not interval for bumping)
        }

      }
    },

    discord: {
      useService: true,
      config: {
        dcToken: process.env.DC_TOKEN, // sets your discord bot token generated from dc-developer-hub
        dmUsers: [
          'AquaJo#7188'
        ], // users in the same server as the bot to send dms to as ping for new message from homepage, use exactly this format shown
        dmMessageInfo: "You got a new message from your homepage.", // info-message from bot on new message from homepage
        sendMsgAfterwards: true // set to false if you don't want to reveal message in discord dm
      }
    },

    recaptcha: {
      useService: false,
      config: {
        recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY
      }
    }
  }
}




