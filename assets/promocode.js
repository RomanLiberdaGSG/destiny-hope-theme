document.addEventListener('DOMContentLoaded', function() {
  const promocodes = document.querySelectorAll('.promocode');

  promocodes.forEach(promocode => {
    const value = promocode.getAttribute('data-value');

    promocode.addEventListener('click', function(e) {
      e.preventDefault();
      navigator.clipboard.writeText(value).then(function() {
          promocode.classList.add('copied');
          setTimeout(function() {
            promocode.classList.remove('copied');
          }, 2000);
        }
      ).catch(function() {
      });
    });
  });
});
