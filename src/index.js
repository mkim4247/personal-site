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

  let maxRadius = 30;

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
      if (mouse.x - this.x - this.dx < 30 && mouse.x - this.x - this.dx > -30 && mouse.y - this.y - this.dy < 30 && mouse.y - this.y - this.dy > -30){
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
        this.dy = -this.dy * 0.75
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

    for(let i = 0; i < 50; i++){
      let radius = Math.random() * 3 + 1
      let x = Math.random() * (innerWidth - radius * 2) + radius;
      let y = Math.random() * (innerHeight - radius * 2) + radius;
      let dx = (Math.random() - 0.5) * 2
      let dy = (Math.random() - 0.5) * 2

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
    console.log('click')
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

  let downArrowBtn = document.getElementById('downArrowBtn')
  downArrowBtn.addEventListener('click', function(){
    let about = document.getElementById('about')
    about.scrollIntoView()
    // let coords = about.getBoundingClientRect()
    // window.scrollBy(coords.x, coords.y - 170)

  })


//////////
let main = document.getElementById("main")


  ////////////////

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
