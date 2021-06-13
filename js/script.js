const body          = document.querySelector('body');
const header        = document.querySelector('.header');
const overlay       = document.querySelector('.overlay')
const btnHamburger  = document.getElementById('btnHamburger');
const fadesElements = Array.from(document.querySelectorAll('.has-fade'));
const featurListLis = Array.from(document.querySelectorAll('.features__list li'));
const featurListLisActives = Array.from(document.querySelectorAll('.features__list li.active'));
const featurTaps    = Array.from(document.querySelectorAll('.features__feature'));
const featurTapsActives    = Array.from(document.querySelectorAll('.features__feature.active'));
const contactForm   = document.querySelector('.contact__form');
const emailGroup    = document.querySelector('.form__input--group');
const emailInput    = document.querySelector('.form__input--email');
let errorMessage    = document.querySelector('.form__input--error--message'); 

btnHamburger.addEventListener('click', openMenu);

contactForm.addEventListener('submit', emailValidation);

// Open Hamburger Menu Function
function openMenu() {
  if (header.classList.contains('open')) { // Open Hamburger Menu
    header.classList.remove('open');
    body.classList.remove('noscroll');
    fadeState('hidden');
  } else { // Close Hamburger Menu
    header.classList.add('open');
    body.classList.add('noscroll');
    fadeState('visible');
  }
}

// Fade State Function
function fadeState(state) {
  fadesElements.forEach(ele => {
    if(state !== 'visible') {
      ele.classList.add('has-fade');
      ele.classList.remove('fade-in');
    } else {
      ele.classList.remove('has-fade');
      ele.classList.add('fade-in');
    }
  });
};

// Features Taps Active
(function tapsActive() {
  // Active Count
  let activeCount = 0;

  // Loop On All The List Li Of The [ Features Seaction ] Header
  featurListLis.forEach(listLi => {
    // When Click On Any li
    listLi.addEventListener('click', () => {
      // Let the activeCount equle the target clikced li index
      activeCount = featurListLis.indexOf(listLi);

      // Reomve All The Active Classes From Both List Li's And Taps Actives
      removeActiveClass(Array.from(listLi.parentElement.querySelectorAll('li.active')));
      removeActiveClass(Array.from(listLi.parentElement.parentElement.querySelectorAll('.features__feature.active')));

      // Add Class Active On The Target Li
      listLi.classList.add('active');
      // Also Add Class Active On The Target Tap
      // featurTaps[activeCount] mean let us say the [activeCount] is 1 
      // so we have in activeCount 1 the activeCount is the second tap in the array of the taps
      // i hope you understand i hope :)
      featurTaps[activeCount].classList.add('active');
    });
  });
})();

// Function Remove Active Class
function removeActiveClass(actives) {
  actives.forEach(activeEle => {
    activeEle.classList.remove('active');
  });
};

// Validation Email Function
function emailValidation(event) {
  // Preventing Default Behavior
  event.preventDefault();
  // Input Email Value
  const emailValue = emailInput.value.trim();
  
  if(emailValue === '') { // If Input Is Empty
    emailGroup.classList.add('form__input--group--invalid');
    errorMessage.innerHTML = "Input Can Not Be Empty";
  }else { /* Else */
    let emailValidate = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(emailValue);

    if(emailValidate) { /* If He Is Email */
      contactForm.submit();
    }else {
      emailGroup.classList.add('form__input--group--invalid');
      errorMessage.innerHTML = "Whoops, make sure it's an email";
    }
  }
};