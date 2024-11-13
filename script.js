function updateAttendance(selectedButton) {
  const buttons = document.querySelectorAll('.attendance-button');
  const optionalElements = document.getElementById('optional-elements');
  const optionalElements2 = document.getElementById('optional-elements2');
  const adventureNote = document.getElementById('adventure-note');
  

  buttons.forEach(btn => btn.classList.remove('clicked'));

  buttons.forEach(button => {
    const img = button.querySelector('img');
    
    if (button === selectedButton) {
      img.src = 'img/yes.png';
      button.classList.add('clicked');
      button.classList.add('selected');
      document.getElementById("attendance-value").value = button.value;
      
      if (button.value === 'yes') {
        optionalElements.style.display = 'block';
        optionalElements2.style.display = 'block';
        adventureNote.style.display = 'none';
      } else {
        optionalElements.style.display = 'none';
        optionalElements2.style.display = 'none';
        adventureNote.style.display = 'block';
      }
    } else {
      img.src = 'img/no.png';
      button.classList.remove('clicked');
      button.classList.remove('selected');
    }
  });
}

function handleSelectChangeMap(event) {
  if (event.target.value === 'google-maps') {
    window.open('https://maps.app.goo.gl/eLwsSL3Yd2RtcZLG9', '_blank');
  } else {
    window.open('https://www.waze.com/en/live-map/directions/ph/central-luzon/guiguinto/lylo-private-pool-and-events-place?place=ChIJrVrybEBTljMRt5hy6hSYVqk&utm_campaign=default&utm_medium=lm_share_directions&utm_source=waze_website', '_blank');

  }
}

function handleSelectChangeCalendar(event) {
  if (event.target.value === 'google') {
    window.open('https://calendar.app.google/qSVRFPFssWsTS8xk8', '_blank');
  } else {
    window.open('http://caldav.icloud.com/published/2/MjE1MjU1Nzk5OTYyMTUyNaNIv55h8YOrW3EA5PTs5kLu3uV9pWVZ-LN_3l-EeUDvgoVzu-WXkXKMYtgjgkRP9eLRPKmEbcqkrnZYMwOCHVs', '_blank');

  }
}


function selectButton(selectedButton) {
  const optionalElements3 = document.getElementById('optional-elements3');
  const buttons = document.querySelectorAll('.rsvp-button');
  buttons.forEach(button => button.classList.remove('clicked'));

  buttons.forEach(button => {
    if (button === selectedButton) {
      document.getElementById("cubs-value").value = button.value;
    }
  });
  selectedButton.classList.add('clicked');

  buttons.value = selectedButton.value;

  if (selectedButton.value === 'yes') {
    optionalElements3.style.display = 'block';
    optionalElements3.classList.add('fade-down');
  } else {
    optionalElements3.style.display = 'none';
    optionalElements3.classList.remove('fade-down');
  }
}

document.getElementById("form").addEventListener("submit", function (e) {
  const cubs = document.querySelectorAll('.rsvp-button');
  const attendance = document.querySelectorAll('.attendance-button');
  console.log(attendance.value)
  console.log(cubs.value)
  e.preventDefault();  
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
    "https://script.google.com/macros/s/AKfycbxt7POQ_ldWzfLi8GogxCeKNkOJKHhzz3FK8nohs9ByRV9JiWp7OcBxik59yNVycvwIXQ/exec",
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


