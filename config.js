module.exports = {
    // useService params take boolean (true/false). If you set it false, config class inside specific parent class wont take action 
    config: {
        server: {
            /* NEEDED */
            corsWhitelist: [process.env.corsSite1, process.env.corsSite2], // set your whitelisted domains here
            /* OPTIONAL, request limiter */
            useService: false,
            config: {
                //set max calls per user for period of time
                requestPeriod: 15 * 60 * 1000, // --> 15 minutes
                maxRequestsInPeriod: 20
            }
        },

        email: {
            useService: false,
            config: {

                main: {
                    transporterObjects: [
                        {
                            host: "smtp.zoho.eu",
                            secure: true,
                            port: 465,
                            auth: {
                                user: process.env.USER_zoho, // "user@zohomail.eu"
                                pass: process.env.PW_zoho
                            }
                        }
                    ],
                    fromTag: "forwarding-service", // additional sender tag
                    receiverMails: [ // mails that receive contact form messages
                        process.env.TO_MAIL,
                        //,process.env.secondMail
                    ]
                },

                receiverHTML: {
                    backgroundTopicsAndPossibilities: [
                        ['https://source.unsplash.com/random/?futuristic', 45],
                        ['https://source.unsplash.com/random/?nature', 26],
                        [['https://www.site1.com/gif1','https://www.site2.com/gif2'], 24],
                        [['https://www.site1.com/img1','https://www.site2.com/img2'], 12]
                    ], // set random themes || image/ gif links with specific possibilites for mail cover

                    // some HTML-Manipulation-Options from top to bottom
                    ejs_Logo: "", // want to show a logo at the top left? set url here or leave "" or null for no logo
                    ejs_ImageTitle: 'server-forwarder', // sets the title of the heading placed inside the image cover
                    ejs_Greeting: 'Hey there,', // sets greeting, placed direct under image
                    ejs_Info: 'server sent us a new message from your homepage', // sets the info message under the greeting

                    buttonLeft: ["replit.com", "https://replit.com/~"], // set button text and button href || both null
                    buttonRight: [null, null] // same for the right button
                },

                bumping: {
                    useService: false,


                    toMail: process.env.TO_MAIL, // mail to send bump msg to
                    msg: "randomQuote", // msg sent with bumping || "randomQuote"
                    interval: [30, 40], // min-max interval bumping


                    unstableProvider: true, // refreshs/resets?

                    // if unstableProvider === true
                    stableTime: false, // stable time system?
                    unstableTimeInterval: 10 // else, frequency store in seconds
                }

            }
        },

        discord: {
            useService: false,
            config: {
                dcToken: process.env.DC_TOKEN, // bot token from discord dev portal
                dmUsers: [
                    'User#9153'
                ], // users to send msg's to in the same server
                dmMessageInfo: "You got a new message from your homepage.",
                sendMsgAfterwards: true
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




