
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})();
function pesanSatu(){
  Swal.fire({
    cancelButtonText: 'Close',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonColor: '#789d35',
    confirmButtonText: 'Tampilkan Semua',
    title: 'Mikrotik Course',
    text: 'Apa itu mikrotik?, Mikrotik merupakan sistem operasi berupa perangkat lunak yang digunakan untuk menjadikan komputer menjadi router jaringan. Sistem operasi ini sangat cocok untuk keperluan administrasi jaringan komputer, misalnya untuk membangun sistem jaringan komputer skala kecil maupun besar.',
    imageUrl: 'assets/img/Service/blog-1.jpg',
    imageWidth: 350,
    imageHeight: 200,
    imageAlt: 'Custom image',
  }).then((result) => {
    if (result.isConfirmed) {
     document.location.href = 'mikrotik.html'
    }
  });
}
function pesanDua(){
  Swal.fire({
    cancelButtonText: 'Close',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonColor: '#789d35',
    confirmButtonText: 'Tampilkan Semua',
    title: 'Cisco Course',
    text: 'Cisco adalah sebuah perusahaan yang memiliki dua bidang usaha. Usaha yang pertama adalah didalam pembuatan hardware dan software yang berhubungan dengan jaringan komputer. Kemudian yang kedua adalah di bidang pendidikan yaitu dengan Cisco Networking Academy',
    imageUrl: 'assets/img/Service/blog-2.jpg',
    imageWidth: 350,
    imageHeight: 200,
    imageAlt: 'Custom image',
  }).then((result) => {
    if (result.isConfirmed) {
     document.location.href = 'cisco.html'
    }
  });
}
function pesanTiga(){
  Swal.fire({
    cancelButtonText: 'Close',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonColor: '#789d35',
    confirmButtonText: 'Tampilkan Semua',
    title: 'Juniper Course',
    text: 'Juniper Networks adalah salah satu dari perusahaan produsen router di dunia seperti Cisco, Mikrotik dan Alcatel. Juniper sendiri mempunyai produk yaitu switch, router dan perangkat security seperti firewall.',
    imageUrl: 'assets/img/Service/blog-3.jpg',
    imageWidth: 350,
    imageHeight: 200,
    imageAlt: 'Custom image',
  }).then((result) => {
    if (result.isConfirmed) {
     document.location.href = 'juniper.html'
    }
  });
}
function pesanEmpat(){
  Swal.fire({
    cancelButtonText: 'Close',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonColor: '#789d35',
    confirmButtonText: 'Tampilkan Semua',
    title: 'FortiGate Course',
    text: 'Fortigate merupakan salah satu firewall yang dikeluarkan oleh Fortinet sebuah appliances yang cukup handal digunakan untuk kemanan jaringan, fortigate memberikan solusi keamanan jaringan berkinerja tinggi yang melindungi jaringan, dan data Anda dari ancaman yang terus berkembang.',
    imageUrl: 'assets/img/Service/blog-4.jpg',
    imageWidth: 350,
    imageHeight: 200,
    imageAlt: 'Custom image',
  }).then((result) => {
    if (result.isConfirmed) {
     document.location.href = 'fortigate.html'
    }
  });
}
Swal.fire({
  imageUrl: 'assets/img/load/post-1.jpeg',
  imageWidth: 400,
  imageHeight: 500,
  imageAlt: 'Custom image',
}).then((result) => {
  if ( result.isConfirmed ){
    Swal.fire({
      imageUrl: 'assets/img/load/post-2.jpeg',
      imageWidth: 400,
      imageHeight: 500,
      imageAlt: 'Custom image',
    })
  }
});

