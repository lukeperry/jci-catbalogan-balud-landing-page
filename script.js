// Interactive Wave Animation
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let mouseX = 0;
let mouseY = 0;
let time = 0;

// Wave configuration
const waves = [
    { amplitude: 50, wavelength: 0.02, speed: 0.02, offset: 0, color: 'rgba(99, 102, 241, 0.15)' },
    { amplitude: 40, wavelength: 0.015, speed: 0.025, offset: 100, color: 'rgba(139, 92, 246, 0.12)' },
    { amplitude: 60, wavelength: 0.01, speed: 0.015, offset: 200, color: 'rgba(59, 130, 246, 0.1)' },
    { amplitude: 35, wavelength: 0.025, speed: 0.03, offset: -50, color: 'rgba(168, 85, 247, 0.08)' }
];

// Particles for interactive effect
const particles = [];
const maxParticles = 50;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${this.life * 0.5})`;
        ctx.fill();
    }
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function drawWave(wave, yBase) {
    ctx.beginPath();
    ctx.moveTo(0, height);

    for (let x = 0; x <= width; x++) {
        // Calculate distance from mouse for interactive effect
        const distanceFromMouse = Math.abs(x - mouseX);
        const mouseInfluence = Math.max(0, 1 - distanceFromMouse / 300);
        const mouseEffect = mouseInfluence * 30 * Math.sin((mouseY / height) * Math.PI);

        const y = yBase + 
            Math.sin(x * wave.wavelength + time * wave.speed + wave.offset) * wave.amplitude +
            Math.sin(x * wave.wavelength * 0.5 + time * wave.speed * 1.5) * (wave.amplitude * 0.3) +
            mouseEffect;

        ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = wave.color;
    ctx.fill();
}

function createParticles(x, y) {
    if (particles.length < maxParticles) {
        particles.push(new Particle(x, y));
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function drawGlow() {
    // Create a subtle glow effect around mouse position
    const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
    gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.05)');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw glow effect
    drawGlow();
    
    // Draw waves from back to front
    waves.forEach((wave, index) => {
        const yBase = height * 0.6 + index * 50;
        drawWave(wave, yBase);
    });
    
    // Update and draw particles
    updateParticles();
    
    time += 1;
    requestAnimationFrame(animate);
}

// Event Listeners
window.addEventListener('resize', resize);

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create particles on mouse move (throttled)
    if (Math.random() > 0.7) {
        createParticles(mouseX, mouseY);
    }
});

document.addEventListener('touchmove', (e) => {
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
    
    if (Math.random() > 0.8) {
        createParticles(mouseX, mouseY);
    }
});

document.addEventListener('click', (e) => {
    // Create burst of particles on click
    for (let i = 0; i < 10; i++) {
        createParticles(e.clientX, e.clientY);
    }
});

// Initialize
resize();
animate();
