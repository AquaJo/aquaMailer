
<p style = "line-height:1" align="center">

<img src="https://user-images.githubusercontent.com/84229101/221438806-2f586fac-f5a6-462c-b110-b8fb2d27da1b.svg#gh-dark-mode-only"  width="300">
<img src="https://user-images.githubusercontent.com/84229101/221439211-ff175105-4685-4d45-a71a-5efe4557c5cf.svg#gh-light-mode-only"  width="300">
</p>

aquaMailer is a customizable service that allows you to forward messages from the contact form on your client-accessible website.\
It comes with features such as email and Discord forwarding, server request limiting, Google v2 reCAPTCHA validation and SMTP-server pinging.

## Basic Installation

Following two sections will guide you through setting up the project on your [server](#serverside-setup) and [clientside](#clientside-setup) without configuration.\
For instructions on integrating email, Discord, reCAPTCHA, and pingig please see the [config.js documentation](#configjs-documentation) further down.

## Advice For Keeping Secrets
I *strongly* encourage you to use process.env (environment variables) to store private information on hosting services like replit or glitch because everyone can see your code using free tier (don't use the npm package in this usecase!)\
On glitch create an .env file and press it.\
On replit head over to the `Secrets` - tab.
## Serverside Setup
First, you need to choose a hosting provider for your Node.js app. You can either set up your own VPS for hosting Node.js and have full control, or choose a [provider specialized in hosting Node.js applications](#hosting-providers---comparison).
### Replit
Create a node application and drag and drop the folders and files of this unzipped repo or upload it from github.\
Server should start automatically or by clicking `run`.\
Set environment variables in the secrets tab.
### Glitch
Create a node application.\
Then upload from github or\
delete standard example files and download this repo as zip.\
Unpack it and zip again only the files/ folders shown in this repo directly, so that if unpacked again, they are unpacked directly that not a seperate folder containing project files is given in this new zip.\
Now drag and drop this zip into your glitch project and copy its url.\
Run following the following commands, while using your zip-url:
```bash
wget -O file.zip https://url-to-your-zip
unzip file.zip -d .
rm file.zip
refresh
```
After that, your project should start.\
Set your client secrets in the .env file.

### Render and Cyclic
Authorize Render or Cyclic to access your private repo or use this one or a fork for deploying.\
In Render, while setting up your "web service",\
set `Root Directory` to `.` , `Runtime` to `Node`, `Build Command` to `npm install` and `Start Command` to `node index.js`\
Service should finish auto deploying after some seconds or minutes.\
Environment variables can be set in the `Environment` tab in Render or the `Variables` tab in cyclic.

---



If `nodemailerProject is listening at http://localhost:[xxxxx]` is being logged, your server is successfully running.\
Change the config file to fit your needs.\
To keep it online you could use uptimerobot to "bump" it every 5 minutes (replit and render). Therefore use http(s) and the link provided for your project-entry-point: `[https://your-domain.tld]/public/index.html`.

## Clientside Setup
After you created your server, you can now integrate the contact form in your webpage.\
For that, take a look at the [contactForm folder](contactForm) (links open as _self) for a template and its js component.\
Notice, there are some *dependencies* you definetly need for proper working.\
You need my [js - component](contactForm/script.js) and therefore vex dialog (could be easily changed to alert) and also reCAPTCHA script in case.\
If you only want a minimal example of implementing, not a styled template with bootstrap as dependency:

<details>
  <summary>Contact Form HTML - no reCAPTCHA v2</summary>
  
```html
<head>
  <script src="script.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/js/vex.combined.min.js"></script>
  <script>vex.defaultOptions.className = 'vex-theme-default'</script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/css/vex.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/css/vex-theme-default.min.css" />
</head>

<div>
  <form id="contactForm" action="[https://YOURSERVERURL.tld]/submit" method="POST" class="contact-form">
    <div>
      <input type="text" name="from_name" id="from_name" placeholder="(User-)Name">
    </div>
    <div>
      <input type="email" name="fromMail_name" id="fromMail_name" placeholder="Email">
    </div>
    <div>
      <textarea id="message" type="text" name="message" rows="5" cols="30" placeholder="Message" required></textarea>
    </div>
    <div class="submit-button-wrapper">
      <input id="contactSend_btn" type="submit" value="Send">
    </div>
  </form>
</div>
```
</details>

<details>
  <summary>Contact Form HTML - reCAPTCHA v2</summary>
  
  ```html
  <head>
  <script src="script.js"></script>
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/js/vex.combined.min.js"></script>
  <script>vex.defaultOptions.className = 'vex-theme-default'</script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/css/vex.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/css/vex-theme-default.min.css" />
</head>

<div>
  <form id="contactForm" action="[https://YOURSERVERURL.tld]/submit" method="POST" class="contact-form">
    <div>
      <input type="text" name="from_name" id="from_name" placeholder="(User-)Name">
    </div>
    <div>
      <input type="email" name="fromMail_name" id="fromMail_name" placeholder="Email">
    </div>
    <div>
      <textarea id="message" type="text" name="message" rows="5" cols="30" placeholder="Message" required></textarea>
    </div>
    <div class="submit-button-wrapper">
    <div class="g-recaptcha" data-sitekey="[YOUR_RECAPTCHA_SITEKEY]"></div>
      <br>
      <input id="contactSend_btn" type="submit" value="Send">
    </div>
  </form>
</div>
  ```
</details>

Set variables `[YOUR_RECAPTCHA_SITEKEY]` & `[https://YOURSERVERURL.tld]` in html to your key / server url.\
To enable the contact form, set up either the [email](#email) or [discord](#discord) service as all services are turned off by default.


## Hosting Providers - Comparison
In the following table, I will provide a comparison of some of the providers I have tested, some of which offer a free option. However, keep in mind that my testing varied in length and intensity and may not paint the whole picture.
| Provider | Advantages | Disadvantages |
| --- | --- | --- |
| Replit | Free option<br>Intuitive and simple interface<br>Integrated free realtime shell and IDE<br>Fast build and working Node.js version<br>Github deploying possible| Server resetting and sleeping<br>Discord service may be unavailable in the future |
| Glitch | Free option<br>Intuitive and simple interface<br>Integrated free realtime shell and IDE<br>Fast build and working Node.js version (after auto update via package.json)<br>Github deploying possible| No implemented folder upload feature, requires zipping and unzipping<br>I think uptime robot isn't working and pinging not welcomed<br>Server sleeping |
| Render | Free option<br>Github deploying<br>Custom server-location|Less flexibility --> no (free) shell and realtime IDE<br>Longer build time<br>Limited build minutes<br>Deploying from scratch from time to time --> SMTP-bumping not working yet<br>Weird behaviour on deploying<br>Server sleeping |
| Cyclic | Free option<br>Github deploying<br>Immediately available  --> no pinging required (?)<br>Relatively fast building | SMTP-bumping not working on unstable provider set to true (not sure if it is stable, especially on longer intervals)<br>Discord feature not fully working |
### Summary
Overall, I can recommend Replit for a hobby project, at least if you don't need 100% uptime. This mainly because of its nice flexibility and simplicity. However, keep in mind that Discord.js may be blocked in the future, as I have experienced issues with Replit and Discord.js in the past. As of February 2023, it seems to be working fine.\
Glitch could be an alternative too, but pinging doesn't seem to be welcomed and uptime robot doesn't work, I think.\
Render and Cyclic can be great, less playgroundy alternatives too if you don't depend on SMTP-pinging.


## Config.js Documentation
The following sections will guide you through setting up the different features aquaMailer provides you.\
Because of the requirement of configuration and assurance of customization, all services are turned off by default.\
Configs are made in [config.js](config.js). You only have to modify objects and turn services on/off.

<details>

<summary>

### Server

</summary>

The service `server` includes some configurations for restrictioning server - access.
```js
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
    }
```
`corsWhitelist` is a needed option. Set all domains that should be able to access your server as rest-api here as array (also if only one domain).


Set `useService` to true if you want to include a server-call limiter per user.\
`requestPeriod` sets the interval time the user can do x requests in ms. To set minutes, like already done, multiply by 60*1000.\
`maxRequestsInPeriod` sets requests/calls per user allowed in interval set in `requestPeriod`.
</details>


<details>

<summary>

### Email

</summary>

The `Email` service is the main feature aquaMailer offers.\
It allows forwarding your contact form messages to multiple mails (main), html - configuration and smtp-server - pinging.\
`useService` will  require you to only config `main` and `receiverHTML`.
The following three sections will guide you through setting up named components.
#### Main
`main` sets the absolute required informations to run email - sending using nodemailer.\
This includes setting transporter(s) (emails to send from), receiver mails and a from tag.

```js
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
        }
```
In `transporterObjects` you can declare multiple nodemailer's so called transporters in an array.\
A transporter defines the main information about an SMTP-access linked to your email account.\
With succeeded auth to your account, this makes programmatical sending mails via nodemailer possible.\
You can declare several transporters by appending the array, while the "priority" sinks the higher the index.\
That means the first transporter given in this array is always used first when sending mails, the others act as *fallbacks* and aren't used till an error occurs on the upper transporter (--> limit exceeded / false auth ....).\
There are two ways to declare a transporter:
1. nodemailer provides presets for some smtp-services, so you don't have to worry about ports, hosts & other params other than auth. These can be set in the transporter object via `service: "[someService]"`.
2. set host, port and any other parameter by yourself, like it's done in this code snippet.\
Keep in mind this can also be required if you use a service nodemailer has a preset for, e.g. using an eu - server like in the upper example.

*Some advice to `auth`:*\
`user` probably is your mail\
`pass` should in most cases be your mail - passwords, but it can also be a separate smtp - password (e.g. when using mail.ee)\
Not all services allow simple or free access to their smtp - servers or want you to use them programmatically.\
afaik, Gmail requires 2fa and less secure app settings to work properly.\
O-Auth may also be an option for Gmail, but me myself had problems with refreshing tokens.

`fromTag` sets an extra name for your sender - address. Set it to "" to just use the normal mail.

`receiverMails` sets all the mails you want to send contact - form messages to.\
Mails are always declared as string and array items in `receiverMails`, also if there's only 1 receiver.

#### Receiver-HTML
This object can manipulate the html / ejs set in [index.ejs](emailTemplate/index.ejs) in which the contact - message (and more) is embedded by default.

```js
receiverHTML: {
          backgroundTopicsAndPossibilities: [
            ['https://source.unsplash.com/random/?futuristic', 45],
            ['https://source.unsplash.com/random/?nature', 26],
            [gifArray, 24],
            [imgArray, 12]
          ], // set random themes || image/ gif links with specific possibilites for mail cover

          // some HTML-Manipulation-Options from top to bottom
          ejs_Logo: "", // want to show a logo at the top left? set url here or leave "" or null for no logo
          ejs_ImageTitle: 'server-forwarder', // sets the title of the heading placed inside the image cover
          ejs_Greeting: 'Hey there,', // sets greeting, placed direct under image
          ejs_Info: 'server sent us a new message from your homepage', // sets the info message under the greeting

          buttonLeft: ["replit.com", "https://replit.com/~"], // set button text and button href || both null
          buttonRight: ["aquajo.me", "https://aquajo.me"] // same for the right button
        }
```

`backgroundTopicsAndPossibilities` sets possible images/gifs you want to use as background-cover.\
&nbsp;Each items contains another array.\
&nbsp;&nbsp;&nbsp;&nbsp;Each of this array has two items.\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;First item:\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be an unsplash link with `?[tag]` for finding a random image from a topic. See code snippet.\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be another *array* containing images. [Want to extract many gifs from giphy?](https://github.com/AquaJo/GifGrabber)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Second item:\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sets the possibility for using defined image set / theme (all possibilities combined as 100%)

`ejs_Logo` sets the logo url placed on the top left, 'hide' it by setting "" or null.\
`ejs_ImageTitl`sets a header placed in the cover - image.\
`ejs_Greeting` sets a greeting placed underneath the header.\
`ejs_Info` sets an info - message underneath greeting.

`buttonLeft` / `buttonLeft` shows a button at the bottom left / right.
- First item sets href / link redirected on button click (_blank)
- Second item sets button text

You can hide it by setting both items to null.
&nbsp;\
&nbsp;\
If you don't want to use given html - template, you can set it to something you like and then include some ejs-vars like:

`*` set in receiverHTML
| ejs-var | returns |
| --- | --- |
| ejs_Message | message |
| ejs_From | user - stated name |
| ejs_FromMail | user - stated mail |
| ejs_BackgroundImg | resulting image from given array and possibilites|
| ejs_ImageTitle | title on cover image, like a header * |
| ejs_Greeting | greeting * |
| ejs_Info | the info followed after greeting * |
| ejs_btn1Href | left button href (link) * |
| ejs_btn1Text | left button text * |
| ejs_btn2Href | right button href (link) * |
| ejs_btn2Text | right button text * |
| ejs_btn1Style | style for hiding left button in case|
| ejs_btn2Style | style for hiding right button in case|
| ejs_Logo | logo url or "" or null * |

#### Bumping
Activating this seperate service inside activated parent email - feature, makes automted smtp - server - pinging in intervals possible.

``` js
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
```

`toMail` sets the *one* mail you want to send the mails to on pinging while using (all of) your given transporters.\
Currently only one toMail is allowed (don't initialize an array) and if pinging activated, all transporters are used for pinging at the same time.

`msg` sets the message set on pinging.\
You can also set it to `"randomQuote"` to generate a random quote from [here](https://gist.githubusercontent.com/awran5/355643af99164a61ae0f95c84206d151/raw/c62636e8eef7e73540fa04b67f753ca9b95ee21e/quotes-api.js). (I didn't read through all of them)

`interval` sets the min (first item) and max (second item) time (random) between pinging processes in minutes.\
If the server - time - system changes over time and isn't reliable set `stableTime` to `false`, else `true`.\
If `stableTime` is `false`, then set an interval time in `unstableTimeInterval` in seconds.\
This will count down every x - seconds (those you set) in nextBump.txt (which is automatically set to your assigned value in `interval` each ping time).\
When nextBump.txt hits 0 it will bump your smtp - services again. Be sure to set it to 0 if you changed interval times.

</details>


<details>

<summary>

### Discord

</summary>

Enabling and configuring this service will send notifications to selected discord users on your server via private messaging from a bot.
``` js
discord: {
      useService: true,
      config: {
        dcToken: process.env.DC_TOKEN, // bot token from discord dev portal
        dmUsers: [
          'User#9153'
        ], // users to send msg's to in the same server
        dmMessageInfo: "You got a new message from your homepage.",
        sendMsgAfterwards: true
      }
    }
```
You need to create a discord bot first.

For that go to the [discord devloper portal](https://discord.com/developers/applications) and create a new `application`.\
Then go to the `Bot`-Panel and create a bot.\
Scroll down to `Privileged Gateway Intents` and enable `Server Members Intent`and `Message Content Intent`.\
Click `View Token`and copy it. Then assign this sensitive token to `dcToken` in config.js.\
Head over to the developer portal again and expand `OAuth2`, click `URL Generator` in the dropdown.\
In the `Scopes` - table select `bot`.\
Then just copy `Generated Url` and invite your bot.

Set as many users you like to get notified on new contact form messages in `dmUsers`.\
`dmMessageInfo` is your configurable part of the bot's dm (sent first). Set it to anything you want.\
Just want to notify named `dmUsers`, don't reveal the whole message? Set `sendMsgAfterwards`to `false`, else `true`.

It's intended to use the bot only in one server.

Commands (not using /commands yet):
- !version
- !dm
- !ping

</details>


<details>

<summary>

### reCAPTCHA v2

</summary>

If you want to require your users to validate themselves as human using Google reCAPTCHA v2 before they can send a message, you should enable this service.
``` js
recaptcha: {
      useService: false,
      config: {
        recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY
      }
    }
```
For being able to use this feature please [register a google reCAPTCHA v2 public/ private key pair](https://www.google.com/recaptcha/admin/create).\
Choose `"I'm not a robot" Checkbox` - option in the dropdown.\
Also add domains the contact form is hosted on to have allowance to your reCAPTCHA v2 service.

After that being done, you should now receive a key pair, a `secret key` and a `site key`.\
Set `recaptchaSecretKey` to the created `secret key` and clientside (in the html) set `[YOUR_RECAPTCHA_SITEKEY]` to your `site key`.

</details>


