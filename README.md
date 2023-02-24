# aquaMailer

AquaMailer is a customizable service that allows you to forward messages from the contact form on your client-accessible website. It comes with built-in features such as email and Discord forwarding, server request limiting, Google v2 reCAPTCHA validation and SMTP-server pinging.

## Basic Installation

This guide will walk you through setting up the project on your server and clientside without configuration.\
For instructions on integrating email, Discord, reCAPTCHA, and pingig please see the [config.js documentation further down](#configjs-documentation).

First, you need to choose a hosting provider for your Node.js app. You can either set up your own VPS for hosting Node.js and have full control, or choose a [provider specialized in hosting Node.js applications](#hosting-providers---comparison).
### Replit
Create a node application and drag and drop the folders and files of this unzipped repo or fork this repo and upload it.\
Server should start automatically or by clicking `run`;
### Glitch
Create a node application, delete standard example files and download this repo as zip.\
Unpack it and zip again only the files/ folders shown in this repo directly, so that if unpacked again, they are unpacked directly that not a seperate folder containing project files is given in this new zip\
Now drag and drop this zip into your glitch project and copy its url.\
Run following the following commands, while using your zip-url:
```bash
wget -O file.zip https://url-to-your-zip
unzip file.zip -d .
rm file.zip
refresh
```
After that, your project should start.

---



If `nodemailerProject is listening at http://localhost:[xxxxx]` is being logged, your server is successfully running.\
Change the config file to fit your needs.\
To keep it online you could use uptimerobot to "bump" it every 5 minutes (replit and render). Therefore use http(s) and the link provided for your project-entry-point: `[https://your-domain.tld]/public/index.html`.


## Hosting Providers - Comparison
In the following table, I will provide a comparison of some of the providers I have tested, some of which offer a free option. However, keep in mind that my testing varied in length and intensity, with Replit, for example, being tested for a longer period than others, resulting in downtime that may also occur with other providers, such as Glitch.

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
