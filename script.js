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
let lastScroll = 0;

window.addEventListener('scroll', () => {
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

lastScroll = current;
}, { passive:true });

// ===== Cursor glow (desktop only) =====
const glow = document.querySelector('.cursor-glow');
const isTouch = window.matchMedia('(pointer: coarse)').matches;

if(glow && !isTouch){
window.addEventListener('mousemove', (e) => {
glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
}, { passive:true });
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


document.querySelectorAll('.skills-grid, .interest-grid').forEach(grid => {
Array.from(grid.children).forEach((child, i) => {
child.style.setProperty('--delay', `${i * 0.08}s`);
});
});


window.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.reveal-up').forEach(el => {
requestAnimationFrame(() => el.classList.add('in'));
});
});


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

setTimeout(() => {
btn.classList.remove('sent');
btnText.textContent = original;
btn.disabled = false;
form.reset();
}, 2400);
});
}
