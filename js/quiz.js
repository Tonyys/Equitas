
class Modals {
  constructor() {
    this.init();
    this.addListenersOpen();
    this.addListenersClose();
    this.addListenerHash();
  }

  init() {
    const modal = document.querySelector(`[data-modal="${window.location.hash}"]`);

    if (window.location.hash && modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      document.querySelectorAll(`[data-modal]`).forEach((modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = 'visible';
      });
    }
  }

  addListenersOpen() {
    document.querySelectorAll('a[data-modal-open]').forEach((trigger) => {
      trigger.addEventListener('click', this.openModal.bind(this));

      console.log(11);
    });
  }

  addListenersClose() {
    document.querySelectorAll('[data-modal-close]').forEach((trigger) => {
      trigger.addEventListener('click', this.closeModal.bind(this));
    });
  }

  addListenerHash() {
    window.addEventListener('hashchange', this.init.bind(this));
  }

  openModal(event) {
    event.preventDefault();

    const trigger = event.target.closest('[data-modal-open]');
    const modal = document.querySelector(`[data-modal="${trigger.hash}"]`);

    if (modal) {
      modal.classList.add('active');
      const scrollWidth = window.innerWidth - document.body.offsetWidth;

      if (scrollWidth) {
        document.querySelectorAll('[data-modal-fixed]').forEach((element) => {
          element.style.paddingRight = `${scrollWidth}px`;
        });
      }

      document.body.style.overflow = 'hidden';
    } else {
      console.error(`The modal window by id '${id}' not found!`);
    }

    window.location.hash = trigger.hash;
  }

  closeModal(event) {
    event.preventDefault();

    const modal = event.target.closest('[data-modal]');

    if (modal) {
      modal.classList.remove('active');

      document.querySelectorAll('[data-modal-fixed]').forEach((element) => {
        element.style.paddingRight = '0';
      });

      document.body.style.overflow = 'visible';

      history.pushState('', document.title, window.location.pathname + window.location.search);
    } else {
      console.error(`The modal window by id '${id}' not found!`);
    }
  }
}

new Modals();

new (class Tabs {
  constructor() {
    this.$wrapper;
    this.$triggers;
    this.$body;
    this.init();
  }

  init() {
    document.querySelectorAll('[data-tabs]').forEach((wrapper) => {
      this.$wrapper = wrapper;
      this.$triggers = [...wrapper.querySelector('[data-triggers]').children];
      this.$body = [...wrapper.querySelector('[data-body]').children];
      this.$triggers[0].classList.add('active');
      this.$body[0].classList.add('active');
      this.update();
      this.addListenerClick();
      this.addListenerHash();
    });
  }

  update(event) {
    const trigger = this.$wrapper.querySelector(`a[href="${window.location.hash}"]`);
    const content = this.$wrapper.querySelector(`[data-id="${window.location.hash}"]`);

    if (window.location.hash && trigger && content) {
      this.$triggers.forEach((trigger) => {
        trigger.classList.remove('active');
      });

      this.$body.forEach((content) => {
        content.classList.remove('active');
      });

      trigger.classList.add('active');
      content.classList.add('active');
    }

    sessionStorage.setItem('last-url', event?.oldURL);
  }

  addListenerClick() {
    this.$triggers.forEach((trigger) => {
      trigger.addEventListener('click', this.changeTab.bind(this));
    });
  }

  addListenerHash() {
    window.addEventListener('hashchange', this.update.bind(this));
  }

  changeTab(event) {
    event.preventDefault();

    const trigger = event.target.closest('a[href^="#"]');
    const content = this.$wrapper.querySelector(`[data-id="${trigger.hash}"]`);

    this.$triggers.forEach((trigger) => {
      trigger.classList.remove('active');
    });

    this.$body.forEach((content) => {
      content.classList.remove('active');
    });

    trigger.classList.add('active');
    content.classList.add('active');

    window.location.hash = trigger.hash;
  }
})();

//100vh мобайл
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
jQuery(document).ready(function ($){




  var step = 1;
  var form = $('.quiz-modal-exit');
  //да или нет на первом шаге
  $(document).on('click', '.js-btn-quiz-form1', function (e) {
    $(this).siblings('').removeClass('js-active');
    $(this).addClass('js-active');
  });

  $(document).on('click', '.js-btn-quiz-form4', function (e) {
    $(this).siblings('').removeClass('js-active');
    $(this).addClass('js-active');
    if ($(this).attr('data-cond') == 1) {
      $(this).parents('.quiz-modal-form__btns').siblings('.install-experience').css('display', 'flex')
    }else {
      $(this).parents('.quiz-modal-form__btns').siblings('.install-experience').css('display', 'none')

    }
  });

  $(document).on('click', '.js-btn-quiz-form5', function (e) {
    $(this).siblings('').removeClass('js-active');
    $(this).addClass('js-active');
    if ($(this).attr('data-cond') == 1) {
      $(this).parents('.quiz-modal-form__btns').siblings('.install-experience').css('display', 'flex')
    }else {
      $(this).parents('.quiz-modal-form__btns').siblings('.install-experience').css('display', 'none')

    }
  });


  $(document).on('click', '.js-btn-next', function (e) {
    e.preventDefault();
    let stepNumber = $('.quiz-modal-form__step').find('b');
    let stepWidth = 100 / 6;
    let btnStep1 = $('.quiz-modal-form__content--block.one').find('.btn--orange');
    let btnStep2 = $('.quiz-modal-form__content--block.one').find('.btn--grey');
    let step2Number = $('.quiz-modal-form__content--block.two').find('.quiz-modal-form__select-item.js-active');
    let step2Number2 = $('#range-slider2').find('.noUi-tooltip');
    //да или нет
    if (btnStep1.hasClass('js-active')) {
      e.preventDefault();
      step++
      stepNumber.text(step);
      $('.quiz-modal-form__step-line').find('.progress').width((stepWidth * 2) + '%')
      btnStep1.removeClass('js-active');
      $('.quiz-modal-form__content--block.one').removeClass('js-active');
      $('.quiz-modal-form__content--block.two').addClass('js-active');
      console.log('true1')
    }
    else if(btnStep2.hasClass('js-active')) {
      e.preventDefault();
      console.log('false1')
      $(this).parents('.quiz-modal').removeClass('js-active');
      $('.js-quiz-modal-exit').addClass('js-active');
      step = 1;
      stepNumber = 1;
      stepWidth = 100 / 6;
    }
    //Опыт работы
    else if(stepNumber.text() == 2 && step2Number.attr('data-number') == 2 )  {
      console.log('true2')
      e.preventDefault();
      step++
      stepNumber.text(step);
      $('.quiz-modal-form__step-line').find('.progress').width((stepWidth * 3) + '%')
      btnStep1.removeClass('js-active');
      $('.quiz-modal-form__content--block.two').removeClass('js-active');
      $('.quiz-modal-form__content--block.three').addClass('js-active');
    }
    else if(stepNumber.text() == 2 && step2Number.attr('data-number') == 1) {
      console.log('false2')
      e.preventDefault();
      $(this).parents('.quiz-modal').removeClass('js-active');
      $('.js-quiz-modal-exit2').addClass('js-active');
      step = 1;
      stepNumber = 1;
      stepWidth = 100 / 6;
    }
    //Возраст
    else if(step2Number2.text() >= 25 && step2Number2.text() <= 55 && stepNumber.text() == 3) {
      e.preventDefault();
      console.log('true3')
      console.log(step2Number2.text())
      step++
      stepNumber.text(step);
      $('.quiz-modal-form__step-line').find('.progress').width((stepWidth * 4) + '%')
      btnStep1.removeClass('js-active');
      $('.quiz-modal-form__content--block.three').removeClass('js-active');
      $('.quiz-modal-form__content--block.four').addClass('js-active');
    } else if(step2Number2.text() < 25 || step2Number2.text() > 55 ) {
      console.log('false3')
      e.preventDefault();
      console.log(12)
      $(this).parents('.quiz-modal').removeClass('js-active');
      $('.js-quiz-modal-exit3').addClass('js-active');
      step = 1;
      stepNumber = 1;
      stepWidth = 100 / 6;
    }
    // опыт работы с кровлей
    else if (stepNumber.text() == 4 && $('.js-btn-quiz-form4').hasClass('js-active')) {
      e.preventDefault();
      console.log('true4')
      step++
      stepNumber.text(step);
      $('.quiz-modal-form__step-line').find('.progress').width((stepWidth * 5) + '%')
      btnStep1.removeClass('js-active');
      $('.quiz-modal-form__content--block.four').removeClass('js-active');
      $('.quiz-modal-form__content--block.fife').addClass('js-active');
    }
    // опыт работы с пвх мембраной
    else if (stepNumber.text() == 5 && $('.js-btn-quiz-form5').hasClass('js-active')) {
      e.preventDefault();
      console.log('true5')
      step++
      stepNumber.text(step);
      $('.quiz-modal-form__step-line').find('.progress').width((stepWidth * 6) + '%')
      btnStep1.removeClass('js-active');
      $('.quiz-modal-form__content--block.fife').removeClass('js-active');
      $('.quiz-modal-form__content--block.six').addClass('js-active');
    }
    else if (stepNumber.text() == 6 && $('#name-input').val() != '' && $('#tel-input').val() != '') {
      e.preventDefault();
      $('.quiz-modal').removeClass('js-active');
      $('.js-quiz-modal-exit4.eight').addClass('js-active');
      $('.js-quiz-modal-exit5').addClass('js-active');
      step = 1;
      stepNumber = 1;
      stepWidth = 100 / 6;
    }
    else {
      e.preventDefault();
    }

  });

  $(document).on('click', '.js-quiz-modal-exit__close', function (e) {
    e.preventDefault();
    $(this).parents('.quiz-modal-exit').removeClass('js-active');
  });

  $(document).on('click', '.js-quiz-modal-form__select-item', function (e){
    e.preventDefault();
    $(this).siblings().removeClass('js-active');
    $(this).addClass('js-active');
  });

  $('[data-toggle="datepicker"]').datepicker();



  //slider range
  var slider2 = document.getElementById('range-slider2');

  noUiSlider.create(slider2, {
    start: [0],
    step: 1,
    connect: 'lower',
    tooltips: [true],
    range: {
      'min': 18,
      'max': 80
    },
    format: wNumb({
      decimals: 0
    })
  });

});

function quizBtn (){
    const quizSubmit = document.querySelectorAll('.cta__form-button')
    const quizSubmitLast = document.querySelector('.last__form-button')
    const quizExit = document.querySelectorAll('.quiz-modal-exit__close')
    quizSubmit.forEach(function (item) {
        item.addEventListener('click',function () {
            document.querySelector('.main-quiz').classList.add('active')
        })
    })
    quizSubmitLast.addEventListener('click',function (e) {
        e.preventDefault()
        document.querySelector('.main-quiz').classList.add('active')
    })
    quizExit.forEach(function (item){
        item.addEventListener('click',function () {
            document.querySelector('.main-quiz').classList.remove('active')
            document.querySelector('.quiz-modal').classList.add('js-active')
            document.querySelectorAll('.quiz-modal-form__content--block').forEach(function (item){
                item.classList.remove('js-active')
            })
            document.querySelector('.quiz-modal-form__content--block.one').classList.add('js-active')
            document.querySelector('.quiz-modal-form__step b').innerHTML = 1;
            document.querySelector('.progress').style.width = 'calc(100%/6)';
        })
    })
}
quizBtn()
// coments
