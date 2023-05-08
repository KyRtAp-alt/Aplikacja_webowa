let licznik = 0
const slides = document.querySelector('.slides')
const intervalRef = setInterval(
  () => {
    licznik += 600
    if (licznik > 2400) {
      licznik = 0
    }

    slides.style.left = -licznik + 'px'

    main.innerHTML = 'From interval ' + licznik / 600
  },
  5000
)
