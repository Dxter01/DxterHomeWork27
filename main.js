const buttonPrevious = document.getElementById('previous');
const buttonNext = document.getElementById('next');
const images = document.querySelectorAll('img');
const buttonPlay = document.getElementById('play');
const buttonStop = document.getElementById('stop')
const sliderContainer = document.querySelector('.slider')
const indicators = document.querySelectorAll('.indicators .dot')

let currentIndex= 0;
let intervalId;
let isAutoPlaying = true
let startX = 0;
let endX = 0;

function slider() {
   function showSlide() {
    images.forEach((img) => {
        img.hidden = true
        
    })
    images.forEach((img) => {
        img.draggable = false
    })
    images[currentIndex].hidden = false

    indicators.forEach((dot) => {
        dot.classList.remove('active')
    })
    indicators[currentIndex].classList.add('active')
   }
   function nextSlide() {
    
        currentIndex++
        if (currentIndex === images.length) {
            currentIndex = 0
        }
        showSlide()
        
        if (isAutoPlaying) {
            clearInterval(intervalId)  
            intervalId = setInterval(nextSlide, 3000)
        }
   }

   function previousSlide() {
    
        currentIndex--
        
        if (currentIndex <0) {
            currentIndex = images.length - 1
        }
        showSlide()
        
        if (isAutoPlaying) {
            clearInterval(intervalId)  
           intervalId = setInterval(nextSlide, 3000)
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide()
        }
        if (e.key === 'ArrowLeft') {
            previousSlide()
        }
        if (e.code === 'Space') {
            if (isAutoPlaying) {
                e.preventDefault()
                stop()
            } else {
                e.preventDefault()
                play()
            }
        }
    })

    sliderContainer.addEventListener('mousedown',(e) => {
        startX = e.clientX
        
    })
    sliderContainer.addEventListener('mouseup', (e) => {
        endX = e.clientX
        if (startX - endX > 30) {
            nextSlide()
        }
        if (endX - startX > 30) {
            previousSlide()
        }
    })

   sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
   })
   sliderContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX
    if (startX - endX > 30) {
        e.preventDefault()
        nextSlide()
    }
    if (endX - startX > 30) {
        e.preventDefault()
        previousSlide()
    }
   })

    function play() {
        isAutoPlaying = true
        clearInterval(intervalId)
        intervalId = setInterval(nextSlide, 3000)
    }

    function stop() {
        isAutoPlaying = false
        clearInterval(intervalId)
    }
    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index
            showSlide()
            clearInterval(intervalId)
             if (isAutoPlaying) {
                intervalId = setInterval(nextSlide, 3000)
             }
        })
    })
    

    buttonNext.onclick = nextSlide
    buttonPrevious.onclick = previousSlide
    buttonPlay.onclick = play
    buttonStop.onclick = stop

    showSlide()
    play()
}

slider()


