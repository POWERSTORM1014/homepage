document.addEventListener('DOMContentLoaded', (event) => {
  ;(function () {
    const swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // scrollbar: {  // 스크롤바 설정 제거
      //   el: '.swiper-scrollbar',
      // },
    })
  })()
})
