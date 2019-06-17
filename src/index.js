document.addEventListener("DOMContentLoaded", function(){
  console.log("connected")

})

let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let mouse = {
  x: null,
  y: null
}

let maxRadius = 50;

let colors = [
  '#87BCDE',
  '#BFACAA',
  '#02020A',
  '#05204A',
  '#E1E2EF'
]

window.addEventListener('mousemove', function(event){
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init()
})


class Circle {
  constructor(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }
  draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  update = function(){
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }

    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity   ->>> needs to prevent growing if outside window frame tho
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
      if(this.radius < maxRadius){
        this.radius += 1
      }
    } else if(this.radius > this.minRadius) {
      this.radius -= 1
    }

    this.draw()
  }
}

let circleArr = []

function init(){
  circleArr = []

  for(let i = 0; i < 100; i++){
    let radius = Math.random() * 3 + 1
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 7
    let dy = (Math.random() - 0.5) * 7

    circleArr.push(new Circle(x, y, dx, dy, radius))
  }

}

function animate(){
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  for(let i = 0; i < circleArr.length; i++){
    circleArr[i].update()
  }

  c.fillStyle = "black";
  c.font = "16px Arial";
  c.textAlign = 'center'
  c.textBaseline = 'middle'
  c.fillText("Hi world", innerWidth/2, innerHeight/2)

}


init()

animate()




////////////////

let main = document.getElementById("main")
let jokeDiv = document.getElementById("jokeDiv")

let jokeBtn = document.getElementById("jokeBtn")

jokeBtn.addEventListener('click', fetchJoke)


function fetchJoke(){
  fetch('https://icanhazdadjoke.com/', {
    method: "GET",
    headers: {
      Accept: 'application/json',
      "User-Agent": "https://github.com/mkim4247/personal-site/"
    }
  })
  .then(res => res.json())
  .then(data => {
    jokeDiv.innerText = data.joke
  })
}

// function postJoke(joke) {
//   let jokeDiv = document.createElement('div')
//   jokeDiv.innerText = joke
//   home.appendChild(jokeDiv)
// }

// window.addEventListener('scroll', () => {
//   contact.classList.add('main')
// })

//
// main.addEventListener("animationstart", listener, false);
// main.addEventListener("animationend", listener, false);
// main.addEventListener("animationiteration", listener, false);
//
// main.className = "main";
//
// function listener(event) {
//   var l = document.createElement("li");
//   switch(event.type) {
//     case "animationstart":
//       l.innerHTML = "Started: elapsed time is " + event.elapsedTime;
//       break;
//     case "animationend":
//       l.innerHTML = "Ended: elapsed time is " + event.elapsedTime;
//       break;
//     case "animationiteration":
//       l.innerHTML = "New loop started at time " + event.elapsedTime;
//       break;
//   }
//   document.getElementById("main").appendChild(l);
// }
