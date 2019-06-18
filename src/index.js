document.addEventListener("DOMContentLoaded", function(){
  console.log("connected")
  main()

})
function main(){

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
      if (mouse.x - this.x - this.dx < 50 && mouse.x - this.x - this.dx > -50 && mouse.y - this.y - this.dy < 50 && mouse.y - this.y - this.dy > -50){
        if(this.radius < maxRadius && (this.x + this.radius + this.dx < innerWidth) && (this.x - this.radius - this.dx > 0) && (this.y + this.radius + this.dy < innerHeight) && (this.y - this.radius -this.dy > 0)){
          this.radius += 1
        }
      } else if(this.radius > this.minRadius) {
        this.radius -= 1
      }

      this.draw()
    }

    drop = function(){
      if(this.y + this.radius + this.dy >= innerHeight){
        this.dy = -this.dy * 0.9
      } else {
        this.dy += 1;
      }
      this.y += this.dy;
      this.draw()
    }

  }

  let circleArr = []

  function init(){
    circleArr = []

    for(let i = 0; i < 400; i++){
      let radius = Math.random() * 3 + 1
      let x = Math.random() * (innerWidth - radius * 2) + radius;
      let y = Math.random() * (innerHeight - radius * 2) + radius;
      let dx = (Math.random() - 0.5) * 4
      let dy = (Math.random() - 0.5) * 4

      circleArr.push(new Circle(x, y, dx, dy, radius))
    }

  }


  let animation;
  let mode = true

  function animate(){
    animation = requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    for(let i = 0; i < circleArr.length; i++){
      circleArr[i].update()
    }
  }

  function gravity(){
    animation = requestAnimationFrame(gravity)
    c.clearRect(0, 0, innerWidth, innerHeight)

    for(let i = 0; i < circleArr.length; i++){
      circleArr[i].drop()
    }
  }

  function reanimate(){
    for(let i = 0; i < circleArr.length; i++){
      circleArr[i].dx = (Math.random() - 0.5) * 4
      circleArr[i].dy = (Math.random() - 0.5) * 4

      if(circleArr[i].y >= innerHeight || circleArr[i].y + circleArr[i].radius >= innerHeight){
        circleArr[i].y = innerHeight - 5
        circleArr[i].dx = -3
      }
    }
  }

  init()
  animate()

  ////////////////

  let charlie = document.getElementById('charlie')
  charlie.addEventListener('click', function(){
    cancelAnimationFrame(animation)
    if(mode){
      gravity()
      mode = !mode
    } else {
      reanimate()
      animate()
      mode = !mode
    }
  })

  let landingHeader = document.getElementById('nameHeader')
  landingHeader.addEventListener('click', function(){
    let intro = document.getElementById('intro')
    intro.scrollIntoView()
  })


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
