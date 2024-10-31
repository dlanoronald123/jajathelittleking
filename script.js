function updateAttendance(selectedButton) {
  // Get all attendance buttons
  const buttons = document.querySelectorAll('.attendance-button');

  buttons.forEach(button => {
    const img = button.querySelector('img');
    
    // Check if the current button is the selected one
    if (button === selectedButton) {
      img.src = 'img/yes.png';  // Update image for selected button
      document.getElementById("attendance-value").value = button.value;  // Set hidden input
    } else {
      img.src = 'img/no.png';  // Revert image for other buttons
    }
  });
}

function selectButton(selectedButton) {
  // Get all buttons in the Cubs group
  const buttons = document.querySelectorAll('.rsvp-button');

  buttons.forEach(button => {
    if (button === selectedButton) {
      button.classList.add('selected');  // Highlight selected button
      button.setAttribute('aria-pressed', 'true');  // Update ARIA attribute
      document.getElementById("cubs-value").value = button.value;  // Set hidden input
    } else {
      button.classList.remove('selected');  // Remove highlight from other buttons
      button.setAttribute('aria-pressed', 'false');  // Update ARIA attribute
    }
  });
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();  // Prevent default form submission
  document.getElementById("message").textContent = "Submitting..";
  document.getElementById("message").style.display = "block";
  document.getElementById("submit-button").disabled = true;

  // Collect form data
  var formData = new FormData(this);
  var keyValuePairs = [];
  for (var pair of formData.entries()) {
    keyValuePairs.push(pair[0] + "=" + pair[1]);
  }

  var formDataString = keyValuePairs.join("&");

  // Send POST request
  fetch(
    "https://script.google.com/macros/s/AKfycbx3xxXssvLTWSc0Y8vXheXJ8ibj-yoSB38vWtia7wEm6otay1MvV7xWsF49DDWqL8xN7g/exec",
    {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    }
  )
    .then(response => response ? response : Promise.reject("Failed to submit the form"))
    .then(data => {
      document.getElementById("message").textContent = "Data submitted successfully!";
      document.getElementById("message").style.backgroundColor = "green";
      document.getElementById("message").style.color = "beige";
      document.getElementById("submit-button").disabled = false;
      document.getElementById("form").reset();

      setTimeout(() => {
        document.getElementById("message").textContent = "";
        document.getElementById("message").style.display = "none";
      }, 2600);
    })
    .catch(error => {
      console.error(error);
      document.getElementById("message").textContent = "An error occurred while submitting the form.";
    });
});