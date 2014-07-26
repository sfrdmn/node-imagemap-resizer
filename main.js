;(function() {

  var domready = require('domready')
  var createImagemapResizer = require('imagemap-resizer')

  var oceanSound = new Audio('ocean.mp3')
  oceanSound.volume = 0.1
  var bellSound = new Audio('bell.mp3')
  bellSound.volume = 0.1

  // Loop dat ocean sound
  oceanSound.addEventListener('canplay', function() {
    oceanSound.addEventListener('ended', function() {
      oceanSound.currentTime = 0
      oceanSound.play()
    })
    oceanSound.play()
  })

  function NirvanaView(el) {
    this.img = el.querySelector('.nirvana')
    this.okBtn = el.querySelector('.nirvana-ok-button')
    this.okBtnHover = el.querySelector('.nirvana-hover')
    this.resizer = createImagemapResizer(this.img)
    this.okBtn.addEventListener('mouseover', this.showHover.bind(this))
    this.okBtn.addEventListener('mouseout', this.hideHover.bind(this))
    this.okBtn.addEventListener('click', this.playSound.bind(this))
    window.addEventListener('resize', this.resize.bind(this))

    this.resize()
  }

  NirvanaView.prototype.resize = function(e) {
    this.resizer.resize()
  }

  NirvanaView.prototype.playSound = function(e) {
    bellSound.play()
  }

  NirvanaView.prototype.showHover = function(e) {
    this.okBtnHover.style['display'] = 'inline-block'
  }

  NirvanaView.prototype.hideHover = function(e) {
    this.okBtnHover.style['display'] = 'none'
  }

  domready(function() {
    var img = document.querySelector('.nirvana')
    img.addEventListener('load', function() {
      window['app'] = new NirvanaView(document.querySelector('.nirvana-dialog'))
    })
  })

})();
