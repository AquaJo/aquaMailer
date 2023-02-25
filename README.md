
<p style = "line-height:1" align="center">

<img src="https://user-images.githubusercontent.com/84229101/221287362-206f6e1f-6f0f-42cf-a9f0-cf59c6e722da.svg#gh-dark-mode-only"  width="300">
<img src="https://user-images.githubusercontent.com/84229101/221295203-dd89d8ee-92ac-43f9-b27b-7d065127789c.svg#gh-light-mode-only"  width="300">
</p>

aquaMailer is a customizable service that allows you to forward messages from the contact form on your client-accessible website.\
It comes with built-in features such as email and Discord forwarding, server request limiting, Google v2 reCAPTCHA validation and SMTP-server pinging.

## Basic Installation

Following two sections will guide you through setting up the project on your [server](#serverside-setup) and [clientside](#clientside-setup) without configuration.\
For instructions on integrating email, Discord, reCAPTCHA, and pingig please see the [config.js documentation](#configjs-documentation) further down.

## Serverside Setup
First, you need to choose a hosting provider for your Node.js app. You can either set up your own VPS for hosting Node.js and have full control, or choose a [provider specialized in hosting Node.js applications](#hosting-providers---comparison).
### Replit
Create a node application and drag and drop the folders and files of this unzipped repo or upload it from github.\
Server should start automatically or by clicking `run`\
Set environment variables in the secrets tab.
### Glitch
Create a node application.\
Then upload from github or\
delete standard example files and download this repo as zip.\
Unpack it and zip again only the files/ folders shown in this repo directly, so that if unpacked again, they are unpacked directly that not a seperate folder containing project files is given in this new zip\
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
For that, take a look at the [contactForm folder](contactForm) (opens as _self) for a template and its js component.\
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

Set variables indicated by [ ] in html to your key / server url.



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
### Server
### Email
### SMTP - Bumping
### Discord
### reCAPTCHA v2
