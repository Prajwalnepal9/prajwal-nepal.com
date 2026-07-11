const menu=document.querySelector(".menu-btn");
const nav=document.querySelector(".nav-links");

menu.onclick=()=>{
nav.classList.toggle("active");
};

document.querySelectorAll(".nav-links a").forEach(link=>{
link.onclick=()=>{
nav.classList.remove("active");
};
});

document.getElementById("contactForm").addEventListener("submit",function(e){

e.preventDefault();

alert("Thank you! Your message has been recorded. Connect with me via email for direct communication.");

this.reset();

});