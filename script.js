
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

if(menuBtn){
menuBtn.addEventListener('click', () => {
navLinks.classList.toggle('active');
menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
link.addEventListener('click', () => {
navLinks.classList.remove('active');
menuBtn.textContent = '☰';
});
});
}


const header = document.querySelector('header');
const scrollProgress = document.getElementById('scrollProgress');
const heroBg = document.querySelector('.hero-bg');
let lastScroll = 0;

function handleScroll(){
const current = window.scrollY;

if(current > 80){
header.classList.add('scrolled');
}else{
header.classList.remove('scrolled');
}

if(current > lastScroll && current > 200){
header.classList.add('hide');
}else{
header.classList.remove('hide');
}

if(scrollProgress){
const max = document.documentElement.scrollHeight - window.innerHeight;
const pct = max > 0 ? (current / max) * 100 : 0;
scrollProgress.style.width = pct + '%';
}

if(heroBg){
heroBg.style.transform = `translateY(${current * 0.2}px)`;
}

lastScroll = current;
}

window.addEventListener('scroll', () => requestAnimationFrame(handleScroll), { passive:true });
handleScroll();


const glow = document.querySelector('.cursor-glow');
const cursorDot = document.getElementById('cursorDot');
const isTouch = window.matchMedia('(pointer: coarse)').matches;

if(glow && !isTouch){
window.addEventListener('mousemove', (e) => {
glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
if(cursorDot){
cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
}
}, { passive:true });

const hoverTargets = 'a, button, .btn, .card, .project, .interest, .edu-card, input, textarea';

document.addEventListener('mouseover', (e) => {
if(cursorDot && e.target.closest(hoverTargets)){
cursorDot.classList.add('hover');
}
});

document.addEventListener('mouseout', (e) => {
if(cursorDot && e.target.closest(hoverTargets)){
cursorDot.classList.remove('hover');
}
});
}


const revealEls = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add('in');
revealObserver.unobserve(entry.target);
}
});
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Stagger cards/interests within the same grid slightly
document.querySelectorAll('.skills-grid, .interest-grid').forEach(grid => {
Array.from(grid.children).forEach((child, i) => {
child.style.setProperty('--delay', `${i * 0.08}s`);
const icon = child.querySelector('.card-icon');
if(icon){
icon.style.setProperty('--float-delay', `${i * 0.22}s`);
}
});
});

// ===== Hero reveal on load =====
window.addEventListener('DOMContentLoaded', () => {
splitHeroText();

document.querySelectorAll('.reveal-up, .reveal-word').forEach(el => {
requestAnimationFrame(() => el.classList.add('in'));
});
});


function splitHeroText(){
if(prefersReducedMotion) return;

let i = 0;
const targets = [document.querySelector('.hero-text h1'), document.querySelector('.hero-text h2')];

targets.forEach(el => {
if(!el) return;

try{
const nodes = Array.from(el.childNodes);
el.innerHTML = '';

nodes.forEach(node => {
if(node.nodeType === Node.TEXT_NODE){
const tokens = node.textContent.split(/(\s+)/).filter(t => t.length);

tokens.forEach(tok => {
if(/^\s+$/.test(tok)){
el.appendChild(document.createTextNode(tok));
}else{
const span = document.createElement('span');
span.className = 'reveal-word';
span.style.setProperty('--i', i++);
span.textContent = tok;
el.appendChild(span);
}
});
}else{
node.classList.add('reveal-word');
node.style.setProperty('--i', i++);
el.appendChild(node);
}
});
}catch(err){

}
});
}


const typedLine = document.getElementById('typedLine');
const lines = [
'whoami',
'status: building secure, scalable systems',
'interests: cybersecurity, UI/UX, mobile design'
];

let lineIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop(){
if(!typedLine) return;

const current = lines[lineIndex];

if(!deleting){
typedLine.textContent = current.slice(0, charIndex + 1);
charIndex++;

if(charIndex === current.length){
deleting = true;
setTimeout(typeLoop, 1600);
return;
}
}else{
typedLine.textContent = current.slice(0, charIndex - 1);
charIndex--;

if(charIndex === 0){
deleting = false;
lineIndex = (lineIndex + 1) % lines.length;
}
}

setTimeout(typeLoop, deleting ? 30 : 55);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if(typedLine){
if(prefersReducedMotion){
typedLine.textContent = lines[0];
}else{
setTimeout(typeLoop, 600);
}
}

// ===== Contact form feedback (front-end only demo) =====
const form = document.getElementById('contactForm');

if(form){
form.addEventListener('submit', (e) => {
e.preventDefault();
const btn = form.querySelector('button');
const btnText = btn.querySelector('span');
const original = btnText.textContent;

btn.classList.add('sent');
btnText.textContent = 'Message Sent ✓';
btn.disabled = true;
spawnBurst(btn);

setTimeout(() => {
btn.classList.remove('sent');
btnText.textContent = original;
btn.disabled = false;
form.reset();
}, 2400);
});
}


function spawnBurst(el){
if(prefersReducedMotion) return;

const rect = el.getBoundingClientRect();
const cx = rect.left + rect.width / 2;
const cy = rect.top + rect.height / 2;
const colors = ['#38bdf8', '#818cf8', '#fbbf24', '#4ade80'];

for(let n = 0; n < 14; n++){
const p = document.createElement('div');
p.className = 'burst-particle';
const angle = (Math.PI * 2 * n) / 14 + Math.random() * 0.4;
const distance = 60 + Math.random() * 50;
p.style.setProperty('--bx', `${Math.cos(angle) * distance}px`);
p.style.setProperty('--by', `${Math.sin(angle) * distance}px`);
p.style.left = cx + 'px';
p.style.top = cy + 'px';
p.style.background = colors[n % colors.length];
document.body.appendChild(p);
p.addEventListener('animationend', () => p.remove());
}
}


function addRipple(el){
el.addEventListener('click', (e) => {
const rect = el.getBoundingClientRect();
const size = Math.max(rect.width, rect.height);
const ripple = document.createElement('span');
ripple.className = 'ripple';
ripple.style.width = ripple.style.height = size + 'px';
ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
el.appendChild(ripple);
ripple.addEventListener('animationend', () => ripple.remove());
});
}

document.querySelectorAll('.btn, form button').forEach(addRipple);


if(!isTouch && !prefersReducedMotion){
document.querySelectorAll('.card, .project, .interest, .edu-card').forEach(el => {
el.addEventListener('mousemove', (e) => {
const rect = el.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
const cx = rect.width / 2;
const cy = rect.height / 2;
const rotateX = ((y - cy) / cy) * -6;
const rotateY = ((x - cx) / cx) * 6;

el.style.transition = 'none';
el.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
});

el.addEventListener('mouseleave', () => {
el.style.transition = '';
el.style.transform = '';
});
});
}


if(!isTouch && !prefersReducedMotion){
document.querySelectorAll('.btn').forEach(el => {
el.addEventListener('mousemove', (e) => {
const rect = el.getBoundingClientRect();
const x = e.clientX - rect.left - rect.width / 2;
const y = e.clientY - rect.top - rect.height / 2;

el.style.transition = 'none';
el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
});

el.addEventListener('mouseleave', () => {
el.style.transition = '';
el.style.transform = 'translate(0,0)';
});
});
}

(function initParticleNetwork(){
const canvas = document.getElementById('particles');
if(!canvas) return;

const ctx = canvas.getContext('2d');
let w, h, particles;

const small = window.innerWidth < 768;
const count = prefersReducedMotion ? 0 : (small ? 26 : 55);

function resize(){
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;
}

function build(){
particles = Array.from({ length: count }, () => ({
x: Math.random() * w,
y: Math.random() * h,
vx: (Math.random() - 0.5) * 0.3,
vy: (Math.random() - 0.5) * 0.3,
r: Math.random() * 1.4 + 0.6
}));
}

resize();
build();
window.addEventListener('resize', () => {
resize();
build();
});

function step(){
if(!document.hidden){
ctx.clearRect(0, 0, w, h);

particles.forEach(p => {
p.x += p.vx;
p.y += p.vy;
if(p.x < 0 || p.x > w) p.vx *= -1;
if(p.y < 0 || p.y > h) p.vy *= -1;

ctx.beginPath();
ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
ctx.fillStyle = 'rgba(148,163,184,0.55)';
ctx.fill();
});

for(let i = 0; i < particles.length; i++){
for(let j = i + 1; j < particles.length; j++){
const dx = particles[i].x - particles[j].x;
const dy = particles[i].y - particles[j].y;
const dist = Math.sqrt(dx * dx + dy * dy);

if(dist < 120){
ctx.strokeStyle = `rgba(56,189,248,${0.14 * (1 - dist / 120)})`;
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(particles[i].x, particles[i].y);
ctx.lineTo(particles[j].x, particles[j].y);
ctx.stroke();
}
}
}
}

requestAnimationFrame(step);
}

if(count > 0){
requestAnimationFrame(step);
}
})();
