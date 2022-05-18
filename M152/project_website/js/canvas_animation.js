/** @type {HTMLCanvasElement}  */
const canvas = window.canvas
const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio
const fps = 1000 / 60
const showtime = 120

let counter = 0
let then = 0

function resize() {
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
}

function animate(frac) {
  const { width, height } = canvas
  const wh = width * .5
  const hh = height * .5
  const min = Math.min(width, height)
  const r = min * .5

  ctx.fillStyle = '#0001'
  ctx.fillRect(0, 0, width, height)
  ctx.globalCompositeOperation = 'lighter'

  ctx.fillStyle = '#f0f1'
  ctx.beginPath()
  ctx.arc(wh, hh, r * Math.pow(Math.cos(Math.PI * frac), 2), 0, 7)
  ctx.fill()

  ctx.fillStyle = '#0ff1'
  ctx.beginPath()
  ctx.arc(wh, hh, r * Math.pow(Math.sin(Math.PI * frac), 2), 0, 7)
  ctx.fill()

  ctx.globalCompositeOperation = 'source-over'
}

function loop(now) {
  if (now - then > fps) {
    then = now

    animate(counter / showtime)

    counter++

    if (counter > showtime) {
      counter = 0
    }
  }

  requestAnimationFrame(loop)
}

function init() {
  resize()
  loop(0)
}

init()

window.onresize = resize