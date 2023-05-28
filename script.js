let container = document.querySelector('.container');
let inputCont = document.querySelector('.inputCont');
let studyHours = document.querySelector('#studyHours');
let studyMinutes = document.querySelector('#studyMinutes');
let pauseMinutes = document.querySelector('#pauseMinutes');
let timerLabel = document.querySelector('.time')
let startBtn = document.querySelector('button')
let btns = document.querySelector('.btns')
let stopBtn = document.querySelector('#stopBtn')
let pauseBtn = document.querySelector('#pauseBtn')
let playBtn = document.querySelector('#playBtn')
let studyHoursValue, studyMinutesValue, pauseMinutesValue, studyTimeHours, studyTimeMinutes, pauseTimeMinutes, studyTimer
let studyPause = true
let studySound = new Audio('sounds/učenje.aac')
let pauseSound = new Audio('sounds/pauza.aac')
let videos = document.querySelector('.videos')

function startTimer(studyTimeHours, time, study) {
    container.style.display = 'flex'
    studyPause = study
    let spMinutes = time
    function tick() {
        inputCont.style.display = 'none'
        btns.style.visibility = 'visible'
        videos.style.visibility = 'visible'
        let hours = String(Math.floor(spMinutes / 3600)).padStart(2, 0)
        let minutes = study
        if (studyPause) minutes = studyHoursValue == '' ? String(Math.floor(spMinutes / 60)).padStart(2, 0) : String(Math.floor(spMinutes / (60 * parseInt(studyHoursValue)))).padStart(2, 0)
        else minutes = String(Math.floor(spMinutes / 60)).padStart(2, 0)
        let seconds = String(Math.floor(spMinutes % 60)).padStart(2, 0)
        timerLabel.textContent = study ? `${hours}:${minutes >= 60 ? String(Math.floor((spMinutes - studyTimeHours) / 60)).padStart(2, 0) : minutes}:${seconds}` : `${minutes}:${seconds}`
        if (spMinutes === 0) {
            clearInterval(studyTimer);
            studyTimeHours = studyHoursValue == '' ? 0 : parseInt(studyHoursValue) * 3600
            studyTimeMinutes = studyMinutesValue == '' ? 0 + studyTimeHours : parseInt(studyMinutesValue) * 60 + studyTimeHours
            pauseTimeMinutes = parseInt(pauseMinutesValue) * 60
            if (studyPause) {
                pauseSound.play()
                studyTimer = startTimer(0, pauseTimeMinutes, false)
            }
            else {
                studySound.play()
                studyTimer = startTimer(studyTimeHours, studyTimeMinutes, true)
            }
        }
        spMinutes--
    }
    tick()
    studyTimer = setInterval(tick, 1000);
    return studyTimer
}
startBtn.addEventListener('click', function () {
    if (studyMinutes.value == '' && studyHours.value == '') {
        alert('Unesi vreme učenja!')
        return
    } else if (pauseMinutes.value == '') {
        alert('Unesi vreme pauze!')
        return
    }
    studyHoursValue = studyHours.value
    studyMinutesValue = studyMinutes.value
    pauseMinutesValue = pauseMinutes.value
    studyTimeHours = studyHoursValue == '' ? 0 : parseInt(studyHoursValue) * 3600
    studyTimeMinutes = studyMinutesValue == '' ? 0 + studyTimeHours : parseInt(studyMinutesValue) * 60 + studyTimeHours
    pauseTimeMinutes = parseInt(pauseMinutesValue) * 60
    clearInterval(studyTimer)
    studyTimer = startTimer(studyTimeHours, studyTimeMinutes, true)
    studyHours.value = ''
    studyMinutes.value = ''
    pauseMinutes.value = ''
})
pauseBtn.addEventListener('click', function () {
    clearInterval(studyTimer);
    pauseBtn.style.display = 'none'
    playBtn.style.display = 'block'
})
playBtn.addEventListener('click', function () {
    studyTimeHours = parseInt(timerLabel.innerText.split(':')[0]) * 3600
    studyTimeMinutes = parseInt(timerLabel.innerText.split(':')[1]) * 60 + studyTimeHours + parseInt(timerLabel.innerText.split(':')[2])
    pauseTimeMinutes = parseInt(timerLabel.innerText.split(':')[0]) * 60 + parseInt(timerLabel.innerText.split(':')[1])
    pauseBtn.style.display = 'block'
    playBtn.style.display = 'none'
    if (studyPause) studyTimer = startTimer(studyTimeHours, studyTimeMinutes, true)
    else studyTimer = startTimer(0, pauseTimeMinutes, false)
})
stopBtn.addEventListener('click', function () {
    location.reload()
})






