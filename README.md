# AquaMailer

AquaMailer is a self-adjusting service that allows you to forward messages from the contact form on your client-accessible website. It comes with built-in features such as email and Discord forwarding, server request limiting, Google v2 reCAPTCHA validation and SMTP-server pinging.

## Basic Installation

This guide will walk you through setting up the project on your server, including the most basic features such as the email service. For instructions on integrating Discord and reCAPTCHA, please see the documentation further down.

First, you need to choose a hosting provider for your Node.js app. You can either set up your own VPS for hosting Node.js and have full control, or choose a provider specializing in Node.js applications. 

In the following table, I will provide a comparison of some of the providers I have tested, some of which offer a free option. However, keep in mind that my testing varied in length and intensity, with Replit, for example, being tested for a longer period than others, resulting in downtime that may also occur with other providers, such as Glitch.

| Provider | Advantages | Disadvantages |
| --- | --- | --- |
| Replit | Free option<br>Intuitive and simple interface<br>Integrated free realtime shell and IDE<br>Fast build and working Node.js version| Server resetting, sleeping, and downtime<br>Discord service may be unavailable in the future |
| Glitch | Free option<br>Intuitive and simple interface<br>Integrated free realtime shell and IDE<br>Fast build and working Node.js version (after auto uptdate via package.json) | No implemented folder upload feature, requires zipping and unzipping<br>I think uptime robot isn't working and pinging not welcomed<br>Server sleeping |
| Render | Free option<br>Github deploying<br>Custom server-location|Less flexibility --> no (free) shell and realtime IDE<br>Longer build time<br>Limited build minutes<br>Deploying from scratch in intervals --> SMTP-bumping not working yet<br>Weird behaviour on deploying |
| Cyclic | Free option<br>Github deploying<br>Available immediately --> no pinging required (?)<br>Relatively fast building | Amsterdam |

Overall, AquaMailer is a great choice for those looking for a service that can handle contact form messages with ease and flexibility. With its self-adjusting features and built-in options for email and Discord forwarding, it's a solid option for any website owner.
