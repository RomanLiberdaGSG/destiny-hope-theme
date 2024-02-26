document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.js__scroll-to');

  links.forEach(link => {
    const target = document.getElementById(link.getAttribute('href').replace('#', ''));
    if(target){
      link.style.display = 'inherit';
      link.addEventListener('click', function(e) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth'});
      });
    }
  });
});