/* CHANGE PARAMETERS HERE TO YOUR KEYS/ PARAMS TO FIT YOUR NEEDS, 
--> replace process.env.X with your parameter directly (and add it to gitignore if using git), or use .env variables with dotenv. In replit you can use/ and should use their implementation of secrets (also accessed via .env)
(not necessarily needed to set All parameters to private ones)
for tutorials, also how to set these params, check out my github
*/

module.exports = {
  // useService params use boolean (true/false). If you set it false, config class inside specific parent class wont take action 
  config: {
    server: {
      /* OPTIONAL */
      useService: true,
      config: {
        //set max calls per user for period of time
        requestPeriod: 15 * 60 * 1000, // --> 15 minutes
        maxRequestInPeriod: 20
      }
    },

    email: {
      useService: true,
      config: {

        needed: {
          transporterObject: {
            host: process.env.MAIL_HOST /* eg. mail.mail.ee, ... different scheme for different services */,
            secure: true,
            secureConnection: false,
            tls: {
              ciphers: 'SSLv3'
            },
            requireTLS: true,
            port: 465,
            debug: true,
            auth: {
              user: process.env.MAIL_USERNAME, // Defines email you want to use as sender-service. Keep in mind it must be a supported service working with nodemailer and services like outlook could block you. Google requires 2FA. I can recommend someUser@mail.ee with online sms verification
              pass: process.env.MAIL_PASSWORD, // Defines the password of your mail account/ smtp access. If you use mail.ee (instruction on github) or probably also some other services you need to use a specific smtp-related password.
            }
          }, // set your very individual nodemailer-transporter for using SMTP on your email-account and finally using this message-forwarder
          fromMail: process.env.FROM_MAIL, // Defines an additional name for the sender, keep it "" will set user as main sender - information. Don't use nodemailers scheme like: newName <email@provider.domain>, in this case just write newName
          receiverMails: [ // Where do the messages are supposted to be mailed to?
            process.env.TO_MAIL
            //,process.env.secondMail
          ]
        },

        recaptcha: {
          useService: true,
          config: {
            recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY
          }
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
            [['https://site.com/image1.png', 'https://site.com/image2.png'], 0]
          ], // set random images from themes from unsplash || image/ gif links   with specific possibilites for mail cover

          // some HTML-Manipulation-Options from top to bottom
          imageTitle: 'server-forwarder', // sets the title of the heading placed inside the image cover
          greeting: 'Hey AquaJo,', // sets greeting, placed direct under image
          info: 'server sent us a new message from your homepage aquajo.me', // sets the info message under the greeting

          buttonLeft: ["replit.com", "https://replit.com/~"], // set button text (first item) and button href (second item), if no button wanted set one of the items to null without quotation
          buttonRight: ["aquajo.com", "https://aquajo.me/"] // same for the right button
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
    }
  }
}