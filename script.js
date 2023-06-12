
class Particle {
  constructor(xPos, yPos, radius) {

    this.x = xPos;
    this.y = yPos;
    this.r = radius;

    this.svgElement;
    this.animDuration = randomNum(3, 5);

    // Create target x and y positions
    this.targetX = randomNum(0, width);
    this.targetY = randomNum(0, height);
    // Define initial velocity and gravity


  }
  
  drawParticle() {
    this.svgElement = makeCircle(this.x, this.y, this.r);
    
    svg.appendChild(this.svgElement);
    this.addAnimateX();
    this.addAnimateY();
  }

  addAnimateX() {
    let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animElement.setAttribute('attributeName', 'cx');
    animElement.setAttribute('values', `${this.x}; ${this.targetX}; `);
    animElement.setAttribute('dur', `${this.animDuration}`);
    animElement.setAttribute('repeatCount', 'indefinite');
    this.svgElement.appendChild(animElement);
  }

  addAnimateY() {
    let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    
       // Define the particle's initial velocity and gravity
  let velocity = { x: 0, y: 0 };
  let gravity = { x: 0, y: 0.1 };

  // Define the animation function
  let animateFunc = () => {
    // Apply gravity to the particle's velocity
    velocity.x += gravity.x;
    velocity.y += gravity.y;

    // Apply the particle's velocity to its position
    this.y += velocity.y;

    // If the particle has reached its target Y position, reverse its velocity
    if (this.y >= this.targetY) {
      this.y = this.targetY;
      velocity.y *= -1;
    }
      // Update the animation values
      animElement.setAttribute('values', `${this.y}; ${height}; `);

      // Call the animation function again on the next animation frame
      requestAnimationFrame(animateFunc);
    };
  
    // Start the animation
    animateFunc();
  



    animElement.setAttribute('attributeName', 'cy');
    animElement.setAttribute('values', `${this.y}; ${height}; `);
    animElement.setAttribute('dur', `${this.animDuration}`);
    animElement.setAttribute('repeatCount', 'indefinite');
    this.svgElement.appendChild(animElement);

  }

}

function createParticlesArray(num) {
  let particleInstances = [];

  for (let i = 0; i < num; i++) {
    // Initialise the particle positions to be in the middle of the SVG canvas
    let particleX = width/2;
    let particleY = height/2;

    let particleSize = randomNum(width * 0.001, width * 0.005);

    // Push or add to the end of the particleInstances array
    particleInstances.push(new Particle(particleX, particleY, particleSize));
  }

  return particleInstances;
}

// Initialise width to be the width of the browser window
let width = window.innerWidth;
// Initialise height to be the height of the browser window
let height = window.innerHeight;

const svg = document.getElementById("base-svg");

// Set the attributes of our SVG element
svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.setAttribute("style", "background-color: black");

let particles = createParticlesArray(100);

for (let particle of particles) {
  particle.drawParticle();
}