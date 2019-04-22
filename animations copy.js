$(document).ready(function() {
  $('#splash-section').hide().fadeIn(700)
  $('#splash-section').css({
    "display": "flex",
    "justify-content": "center",
    "align-items": "center"
  })

  fetch("/message")
    .then(response => response.text())
    .then(message => {
      new Typed("#catch-phrase", {
        strings: ["", message],
        typeSpeed: 50
      })
    })

  $('#email-button').on('click', function() {
    window.location.href = "mailto:morenoga@usc.edu";
  })
});
