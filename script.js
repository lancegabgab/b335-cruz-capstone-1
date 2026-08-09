$(document).ready(function () {
    const roles = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer"
    ];

    const introText = "Hi there!";
    const nameText = "I'm Lance Gabriel Cruz";

    const descriptionText =
        "I build clean, scalable, and reliable web applications.";

    const typingSpeed = 80;
    const erasingSpeed = 45;

    const pauseAfterIntro = 700;
    const pauseAfterName = 500;
    const pauseAfterRole = 1000;
    const pauseAfterFullStack = 1000;
    const pauseAfterDescription = 2500;
    const pauseBeforeRestart = 2000;

    let roleIndex = 0;

    function typeText(element, text, callback, keepCursor = false) {

        let index = 0;

        function type() {
            if (index < text.length) {
                index++;
                $(element).html(
                    `<span class="string">${text.substring(0, index)}<span class="cursor">|</span></span>`
                );
                setTimeout(type, typingSpeed);
            } else {
                if (keepCursor) {
                    $(element).html(
                        `<span class="string">${text}<span class="cursor">|</span></span>`
                    );
                } else {
                    $(element).html(
                        `<span class="string">${text}</span>`
                    );
                }
                if (callback) {
                    callback();
                }
            }
        }
        type();
    }

    function typeRole(callback) {

        const prefix = "I'm a ";
        const role = roles[roleIndex];
        let index = 0;

        function type() {

            if (index < role.length) {
                index++;
                $("#line-3").html(
                    `<span class="string">${prefix}${role.substring(0, index)}<span class="cursor">|</span></span>`
                );
                setTimeout(type, typingSpeed);
            } else {
                $("#line-3").html(
                    `<span class="string">${prefix}${role}<span class="cursor">|</span></span>`
                );
                if (roleIndex === roles.length - 1) {
                    setTimeout(() => {
                        $("#line-3").html(
                            `<span class="string">${prefix}${role}</span>`
                        );
                        callback();
                    }, pauseAfterFullStack);
                } else {
                    setTimeout(() => {
                        eraseRole(role, () => {
                            roleIndex++;
                            setTimeout(() => {
                                typeRole(callback);
                            }, 300);
                        });
                    }, pauseAfterRole);
                }
            }
        }
        type();
    }

    function eraseRole(role, callback) {

        const prefix = "I'm a ";
        let index = role.length;

        function erase() {
            if (index > 0) {
                index--;
                $("#line-3").html(
                    `<span class="string">${prefix}${role.substring(0, index)}<span class="cursor">|</span></span>`
                );
                setTimeout(erase, erasingSpeed);
            } else {
                $("#line-3").html(
                    `<span class="string">${prefix}<span class="cursor">|</span></span>`
                );
                if (callback) {
                    callback();
                }
            }
        }
        erase();
    }

    function startAnimation() {

        $("#line-1, #line-2,#line-3 ,#line-4").empty();
        roleIndex = 0;

        typeText("#line-1", introText, () => {
            setTimeout(() => {
                typeText("#line-2", nameText, () => {
                    setTimeout(() => {
                        typeRole(() => {
                            typeText("#line-4", descriptionText, () => {
                                setTimeout(() => { 
                                    startAnimation();
                                    }, pauseAfterDescription + pauseBeforeRestart);
                                },
                                true
                            );
                        });
                    }, pauseAfterName);
                });
            }, pauseAfterIntro);
        });
    }

  startAnimation();

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
