window.onload = function() {
    document.forms['contactForm'].addEventListener('submit', (event) => {
      event.preventDefault();
      contactSend_btn.value = "SENDING ...";
      // TODO do something here to show user that form is being submitted
      fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)) // event.target is the form
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // or response.text() or whatever the server sends
      }).then((body) => {
        contactSend_btn.value = "SEND";
        console.log(body);
        let problems = body.msg;
        if (problems && problems.length >= 1) { // ()
        let problemsString = "";
        for (let i = 0; i < problems.length; ++i) {
        problemsString += (problems[i])+" ";
        }
        vex.dialog.alert("Failed sending message. "+problemsString);
        } else if (body.response === "Successful") {
        vex.dialog.alert('Successfully sent Your message!')
        } else if (body.response === "SMTPServicesError") {
        vex.dialog.alert('Error. Couldn`t use stmp relay service on all instances.')
        }
        // TODO handle body
      }).catch((error) => {
        contactSend_btn.value = "SEND";
        if (error.message === "Failed to fetch") {
        vex.dialog.alert('Failed to fetch. Could be because of a server outage, you sent too many requests or a too large request entity.')
        }
        console.log(error.message);
        // TODO handle error
      });
    });
  }