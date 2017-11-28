const buttons = document.querySelectorAll("[data-time]");
const form = document.querySelector("form");
const $timeleft = document.querySelector(".display__time-left");
const $beback = document.querySelector(".display__end-time");

let countdown;

buttons.forEach(button => {
  button.addEventListener("click", function() {
    timer(this.dataset.time);
  });
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  timer(this.minutes.value * 60);

  this.reset();
});

function displayTimeleft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;

  $timeleft.innerHTML = `${minutes}:${secondsLeft}`;

  document.title = `${minutes}:${secondsLeft}`;
}

function displayBackTime(mseconds) {
  const hour = new Date(mseconds).getHours();
  const minute = new Date(mseconds).getMinutes();

  $beback.innerHTML = `Be back at ${hour > 12 ? hour - 12 : hour}:${minute}`;
}

function timer(seconds) {
  clearInterval(countdown);

  const then = Date.now() + seconds * 1000;

  displayTimeleft(seconds);
  displayBackTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    displayTimeleft(secondsLeft);

    if (secondsLeft <= 0) {
      clearInterval(countdown);
    }
  }, 1000);
}

// function displayTime(seconds) {
//   const minutes = Math.floor(seconds / 60);
//   const remainderSecs = Math.round(seconds % 60);

//   $timeleft.innerHTML = `${minutes}:${remainderSecs}`;
// }

// function displayEndTime(mseconds) {
//   const time = new Date(mseconds);

//   const hour = time.getHours();
//   const minute = time.getMinutes();

//   $beback.innerHTML = `Be back at ${hour > 12 ? hour - 12 : hour}:${minute}`;
// }

// function timer(seconds) {
//   clearInterval(countdown);

//   const then = Math.floor(Date.now() + seconds * 1000);

//   displayTime(seconds);
//   displayEndTime(then);

//   countdown = setInterval(() => {
//     const timeLeft = Math.round((then - Date.now()) / 1000);

//     displayTime(timeLeft);

//     if (timeLeft <= 0) {
//       clearInterval(countdown);
//     }
//   }, 1000);
// }

// function timer1(e) {
//   e.preventDefault();

//   console.log(this.querySelector("input").value);
// }

//const time = this.dataset.time || this.querySelector("input").value*60;

// function timer(e) {
//   e.preventDefault();

//   clearInterval(countdown);

//   const time = this.dataset.time || this.querySelector("input").value * 60;

//   const then = new Date(new Date().getTime() + time * 1000);

//   $beback.innerHTML = `Be back at ${then.getHours() > 12
//     ? then.getHours() - 12
//     : then.getHours()}:${then.getMinutes()}`;

//   countdown = setInterval(() => {
//     const now = new Date().getTime();

//     const remaining = then - now;

//     //   console.log(remaining);

//     let secondsLeft = remaining / 1000;
//     const minutes = Math.floor(secondsLeft / 60);
//     secondsLeft = Math.floor(secondsLeft) % 60;

//     console.log(minutes, secondsLeft);

//     $timeleft.innerHTML = `${minutes}:${secondsLeft < 10
//       ? 0
//       : ""}${secondsLeft}`;

//     if (minutes <= 0 && secondsLeft <= 0) {
//       clearInterval(countdown);
//     }
//   }, 1000);
// }
