window.addEventListener('load', function() {
    var preloader = document.querySelector('.preloader');

    preloader.classList.add('hide');

    setTimeout(function() {
      preloader.style.display = 'none';
    }, 600);
  });


