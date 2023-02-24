
<p style = "line-height:1" align="center">

<img src="https://user-images.githubusercontent.com/84229101/221287362-206f6e1f-6f0f-42cf-a9f0-cf59c6e722da.svg#gh-dark-mode-only"  width="300">
<img src="https://user-images.githubusercontent.com/84229101/221295203-dd89d8ee-92ac-43f9-b27b-7d065127789c.svg#gh-light-mode-only"  width="300">
</p>

aquaMailer is a customizable service that allows you to forward messages from the contact form on your client-accessible website.\
It comes with built-in features such as email and Discord forwarding, server request limiting, Google v2 reCAPTCHA validation and SMTP-server pinging.

## Basic Installation

This guide will walk you through setting up the project on your server and clientside without configuration.\
For instructions on integrating email, Discord, reCAPTCHA, and pingig please see the [config.js documentation](#configjs-documentation) further down.

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


## Hosting Providers - Comparison
In the following table, I will provide a comparison of some of the providers I have tested, some of which offer a free option. However, keep in mind that my testing varied in length and intensity and may not paint the whole picture.
| Provider | Advantages | Disadvantages |
| --- | --- | --- |
| Replit | Free option<br>Intuitive and simple interface<br>Integrated free realtime shell and IDE<br>Fast build and working Node.js version| Server resetting, sleeping, and downtime<br>Discord service may be unavailable in the future |
| Glitch | Free option<br>Intuitive and simple interface<br>Integrated free realtime shell and IDE<br>Fast build and working Node.js version (after auto uptdate via package.json) | No implemented folder upload feature, requires zipping and unzipping<br>I think uptime robot isn't working and pinging not welcomed<br>Server sleeping |
| Render | Free option<br>Github deploying<br>Custom server-location|Less flexibility --> no (free) shell and realtime IDE<br>Longer build time<br>Limited build minutes<br>Deploying from scratch in intervals --> SMTP-bumping not working yet<br>Weird behaviour on deploying |
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
