'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

//MODAL

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//SCROLL

btnScrollTo.addEventListener('click', function (e) {
  //FIRST WE WANT THE CO ORDINATES OF THE ELEMENT WE WANT OT SCROLL TO
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords); //here x is measured from the left side and y is measured from the top

  // console.log(e.target.getBoundingClientRect()); //ye select hoya hai element (learn more wala button ) same x left se y top se THIS BOUNDING CLIENT REACT IS RELATIVE TO THE VISIBLE VIEW PORT

  // console.log('current scroll', window.pageXOffset, window.pageYOffset); //kitna scrool kiya hai x aur y direction mai

  // console.log(
  //   'height/width',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // //scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////

//PAGE NAVIGATION
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//bubbly use karke
//we use it using two steps 1)ADD EVENT LISTENER TO COMMON PARENT ELEMENT 2) DETERMINE WHAT ELEMENT ORIGINATED THE EVENT
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target); //e.target hai jde bhi aapa n click kara hai vo location
  //ab hum agar nav link pe bhi class karenge toh bhi result aayega (nav link => ye buttons chod ke jo jagah hai vaha par ) toh ab hum check karenge ki waha ye nav links class hai ya nahi
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//TABBED CONTENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () => console.log('tab')));//zyada tabs honge toh page slow down ho jayega thats why we will do it on the parent element that is tabContainer

tabsContainer.addEventListener('click', function (e) {
  // const clicked = e.target;yaha ye jo 3 hai ispe click karenge toh spam element click ho jayega jis se hum content active karenge toh hum target ki jagah parent element lenge
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //guard clause agar tabs container mai kahi click huwa outside of the buttons
  if (!clicked) return;

  //active tab click karne p upar niche aur content remove
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(e => e.classList.remove('operations__content--active'));

  //content active karna
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//MENU FADE

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
//MOUSEOVER
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) {
//         el.style.opacity = 0.5;
//       }
//     });
//     logo.style.opacity = 0.5;
//   }
// });
//MOUSE OUT
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) {
//         el.style.opacity = 1;
//       }
//     });
//     logo.style.opacity = 1;
//   }
// });

//STICKY TOP
// const initialCords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
//STICKY NAVIGATION : INTERACTION OBSERVER API
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2], //percentage that we want to have visible in our root(screen)
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries; //entries[0]
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//REVEAL SECTION
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//LAZY KOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]'); //sirf vo hi photo select hogi jinme ye data src attribute hoga

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //replace src with data src
  entry.target.src = entry.target.dataset.src;

  //lazt class remove karni hai toh remove method se nahi karenge because it does it super fast toh dikhe ga hi nahi toh usko as a event listener use karenge
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

//SLIDE AAGE PICHE HTML 221
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
//////////////////////////////
/*
/////////////////////////////////////////////////////
///SELECTING ELEMENT
console.log(document.documentElement);
console.log(document.body);
console.log(document.head);

const header = document.querySelector('.header');
const allSelection = document.querySelectorAll('.section');
console.log(allSelection);

document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');

document.getElementsByClassName('btn');

//creating and inserting elements

//.insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'YOU WANT TO EAT SOME COOKIES? ';
message.innerHTML =
  'YOU WANT TO EAT SOME COOKIES?<button class = "btn btn--close-cookie">YES WHY NOT!!</button>"';

//inserting in DOM header isliye kiya kyuki sabse upar dikhana tha aur uska naam header tha header is first page
//prepend aur append insert bhi karte hai aur sath sath move karne ke bhi kaam aate hai

header.prepend(message); // first child hoga means sabse upar hoga page ke
// header.append(message);//sabse miche header file ke

// header.before(message); //header ke pehle BUT AS A SIBLING
// header.after(message);

//delelting the element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message).color); //getcomputed style use hoga jab humne element chahiye to js mai nahi likha hoga
//inko change karne ke liye
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; //parse float kyuki message.height will return value in pixels

//CHANGING THE STYLE OF THE PAGE
// document.documentElement.style.setProperty('--color-primary', 'orangered');

//ATTRIBUTES => SRC ,ALT,CLASS YEH SARE CHIZ

//STANDARD
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
//setting attributes
logo.alt = 'beautiful logo';

//NON-STANDARD
console.log(logo.designer); //undefined
//to access this
console.log(logo.getAttribute('designer'));
logo.setAttribute('Campony', 'Bankist');

//DATA ATTRIBUTES
console.log(logo.dataset.versionNumber);

//CLASSES
logo.classList.add('sd');
logo.classList.remove('sd');
logo.classList.toggle('sd');
logo.classList.contains('sd');

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');
// btnScrollTo.addEventListener('click', function (e) {
//   //FIRST WE WANT THE CO ORDINATES OF THE ELEMENT WE WANT OT SCROLL TO
//   // const s1coords = section1.getBoundingClientRect();
//   // console.log(s1coords); //here x is measured from the left side and y is measured from the top

//   // console.log(e.target.getBoundingClientRect()); //ye select hoya hai element (learn more wala button ) same x left se y top se THIS BOUNDING CLIENT REACT IS RELATIVE TO THE VISIBLE VIEW PORT

//   // console.log('current scroll', window.pageXOffset, window.pageYOffset); //kitna scrool kiya hai x aur y direction mai

//   // console.log(
//   //   'height/width',
//   //   document.documentElement.clientHeight,
//   //   document.documentElement.clientWidth
//   // );

//   // //scrolling
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// // h1.addEventListener('mouseenter', function (e) {
// //   alert('OHH! YOU ARE READING HEADER ANPADH!');
// // });

// //more systummatic way

// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('OHH! YOU ARE READING HEADER ANPADH!');

//   //remove
//   // h1.removeEventListener('mouseenter', alertH1);
//   // //function ke andar hi karenge toh ek bar execute hoga dubara nahi
// };
// h1.addEventListener('mouseenter', alertH1);

// //another way of listening events
// // h1.onmouseenter = function (e) {
// //   alert('OHH! YOU ARE READING HEADER ANPADH!');
// // };
// //REMOVING AFTER A CERTAIN TIME
// // setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// //////////

// //bubbling=>It happens when an element receives an event, and that event bubbles up (or you can say is transmitted or propagated) to its parent and ancestor elements in the DOM tree until it gets to the root element.

// //rgb(255,255,255)
// // const randomInt = (max, min) =>
// //   Math.floor(Math.random() * (max - min + 1) + min);
// // const randomColor = () =>
// //   `rgb(${randomInt(0, 256)}${randomInt(0, 256)}${randomInt(0, 256)})`;
// //BUBBLING EXAMPLE final mai dekh le video 192
*/
/*

//TRAVERSING

const h1 = document.querySelector('h1');

//traversing downwards
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); //h1 ke sare child nodes(direct child)
console.log(h1.children); //h1 ke html ke elements(direct child)
h1.firstElementChild.style.color = 'gold'; //banking
h1.lastElementChild.style.color = 'blue';
//TRAVERSING DOWNWARDS

console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-primary)';
//HEADER FINDS THE PARENT ELELMENT BUT QUERY SELECTOR FINDS THE CHILD ELEMENT

//SELECTING SIBLINGS
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); //sare siblings
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
})*/
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('hahah', e);
});
