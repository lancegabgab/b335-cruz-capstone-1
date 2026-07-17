$(document).ready(function () {
  
  const texts = [
    "FULL STACK DEVELOPER",
    "FRONT END DEVELOPER",
    "BACKEND DEVELOPER"
  ];

  let count = 0;
  let index = 0;
  let currentText = '';
  let isDeleting = false;
  const typingSpeed = 120;
  const erasingSpeed = 50;
  const delayBetweenWords = 2000;

  function typeEffect() {
    currentText = texts[count];
    const displayed = isDeleting
      ? currentText.substring(0, index--)
      : currentText.substring(0, index++);

    $('#animated-text').html((displayed || '&nbsp;') + '<span class="cursor">|</span>');

    if (!isDeleting && index === currentText.length + 1) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenWords);
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      count = (count + 1) % texts.length;
      setTimeout(typeEffect, typingSpeed);
    } else {
      setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
    }
  }

  typeEffect();

  $(".card").mouseenter(function () {
      $(this).addClass("glow");
  });

  $(".card").mouseleave(function () {
      $(this).removeClass("glow");
  });


  const images = $('.fade-image');
  let currentIndex = 0;

  function fadeSlider() {
      images.hide();

      images.eq(currentIndex)
          .fadeIn(300)
          .delay(3000)
          .fadeOut(300, function () {
              currentIndex = (currentIndex + 1) % images.length;
              fadeSlider();
          });
  }

  fadeSlider();

  $('#contact-form').on('submit', function (e) {
    e.preventDefault();

    const form = this;

    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to submit your message?',
        icon: 'question',
        background: '#212529',
        color: '#ffffff',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Message Sent!',
                text: 'Thank you for reaching out. I will get back to you soon.',
                icon: 'success',
                background: '#212529',
                color: '#ffffff'
            });
            form.reset();
        }
    });
  });

  AOS.init();
});
