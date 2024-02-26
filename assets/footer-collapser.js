document.addEventListener("DOMContentLoaded",(e)=>{
  const triggers = document.querySelectorAll(".footer-collapser_header");

  triggers.forEach((trigger) =>{
    trigger.addEventListener("click", (e) =>{
      const content = document.getElementById(trigger.dataset.targetCollapser);
      trigger.classList.toggle("active");
      content.classList.toggle("active");
    });
  });
});