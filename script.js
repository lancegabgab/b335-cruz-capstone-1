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

  emailjs.init('4wsb3qc8UPk6vQuLX');

  $('#contact-form').on('submit', function (e) {
    e.preventDefault();

    const form = this;

    Swal.fire({
        title: 'Are you sure?',
        text: 'Once submitted, your message will be sent.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        buttonsStyling: false,
        customClass: {
          popup: 'border border-light text-white bg-dark',
          confirmButton: 'btn btn-dark border border-light me-2',
          cancelButton: 'btn btn-outline-light'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Sending...',
                text: 'Please wait while your message is being sent.',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                },
                customClass: {
                    popup: 'border border-light text-white bg-dark'
                }
            });

            emailjs.sendForm(
                'service_ez26iyj',
                'template_11v0jho',
                form
            )
            .then(function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Thank you for reaching out. I will get back to you as soon as possible.',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'border border-light text-white bg-dark'
                    }
                });
                form.reset();
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Send',
                    text: 'Something went wrong. Please try again later.',
                    customClass: {
                        popup: 'border border-light text-white bg-dark'
                    }
                });
            });
        }
    });
  });

  AOS.init();
});
