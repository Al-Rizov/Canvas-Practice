const canvas = document.getElementById('canvas_one');
const context = canvas.getContext('2d');
const particleBtn = document.getElementById('particle');
const watermelonBtn = document.getElementById('watermelon');
const icecreamBtn = document.getElementById('icecream');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles_array = [];
let hue = 0;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined,

}

canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for(i=0; i<50; i++) {
    particles_array.push(new particleType())
    }
    console.log(particles_array.length);
    
    
});

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for(i=0; i<3; i++) {
        particles_array.push(new particleType())
        }

    while(particles_array.length > 100) {particles_array.shift()}
    

}) 


class Watermelon {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        
        //this.x = Math.floor(Math.random()*canvas.width);
        //this.y = Math.floor(Math.random()*canvas.height);
        this.size = Math.random()*20 +1;
        this.speedX = Math.random()*3 -1.5;
        this.speedY = Math.random()*3 -1.5;
    }
    
    update() {
        if((this.x - this.size) < 0 || (this.x + this.size) > canvas.width)
        {this.speedX = -this.speedX}
        

        if((this.y - this.size) < 0 || (this.y + this.size) > canvas.height)
        {this.speedY = -this.speedY}
        
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.size > 0.3) {this.size -= 0.1;}
            

    }
    
    draw() {
        context.fillStyle = 'red';
        context.strokeStyle = 'green';
        context.lineWidth = this.size/5;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 3, Math.PI*2);
        context.stroke();
        context.fill();

        context.fillStyle = 'black';
        context.beginPath();
        context.arc((this.x - this.size/2), (this.y - this.size/2.5), (this.size/10), 0, Math.PI*2);
        context.arc((this.x + this.size/2), (this.y - this.size/2.5), (this.size/10), 0, Math.PI*2);
        context.fill();

        context.beginPath();
        context.arc((this.x - this.size/5.5), (this.y - this.size/5), (this.size/10), 0, Math.PI*2);
        context.arc(this.x, (this.y - this.size/1.9), (this.size/10), 0, Math.PI*2);
        context.fill();

        context.beginPath();
        context.arc((this.x + this.size/5.5), (this.y - this.size/5), (this.size/10), 0, Math.PI*2);
        context.fill();
        
    }

    
}

class IceCream {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        
        this.size = Math.random()*20 +1;
        this.speedX = Math.random()*3 -1.5;
        this.speedY = Math.random()*3 -1.5;
    }
    
    update() {
        if((this.x - this.size) < 0 || (this.x + this.size) > canvas.width)
        {this.speedX = -this.speedX}
        

        if((this.y - this.size) < 0 || (this.y + this.size) > canvas.height)
        {this.speedY = -this.speedY}
        
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.size > 0.3) {this.size -= 0.1;}
            

    }
    
    draw() {
        context.fillStyle = 'orange';
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x-this.size, this.y-this.size*3);
        context.lineTo(this.x+this.size, this.y-this.size*3);
        context.lineTo(this.x, this.y);
        context.fill();

        context.fillStyle = 'pink';
        context.beginPath();
        context.arc((this.x), (this.y-this.size*3), (this.size), 0, Math.PI*2);
        context.fill();
        
    }

    
}

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        
        this.size = Math.random()*10 +1;
        this.speedX = Math.random()*5 -2.5;
        this.speedY = Math.random()*5 -2.5;
    }
    
    update() {
        if((this.x - this.size) < 0 || (this.x + this.size) > canvas.width)
        {this.speedX = -this.speedX}
        

        if((this.y - this.size) < 0 || (this.y + this.size) > canvas.height)
        {this.speedY = -this.speedY}
        
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.size > 0.3) {this.size -= 0.1;}
            

    }
    
    draw() {
        context.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        //context.strokeStyle = 'green';
        context.lineWidth = this.size/5;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI*2);
        //context.stroke();
        context.fill();

        
    }

    
}

function handleParticles() {
    for(i=0; i<particles_array.length; i++) {
        particles_array[i].update();
        particles_array[i].draw();

        if(particles_array[i].size <= 0.3) {
            particles_array.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    if(particleType!==Particle){context.clearRect(0, 0, canvas.width, canvas.height);}
    context.fillStyle = 'rgba(0,0,0,0.09)';
    context.fillRect(0,0,canvas.width, canvas.height)
    handleParticles();
    hue += 5;
    requestAnimationFrame(animate);
}


let particleType = null;

particleBtn.addEventListener('click', function(){particleType = Particle;})
watermelonBtn.addEventListener('click', function(){particleType = Watermelon;})
icecreamBtn.addEventListener('click', function(){particleType = IceCream;})

animate();