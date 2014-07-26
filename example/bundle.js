(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;(function() {

  var domready = require('domready')
  var createImagemapResizer = require('../')

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

},{"../":2,"domready":3}],2:[function(require,module,exports){
;(function(document) {

  if (!document) {
    console.error('imagemap-resizer must be run in a browser')
    return
  }

  function each(arr, fn) {
    for (var i = 0; i < arr.length; i++)
      fn(arr[i], i)
  }

  function map(arr, fn) {
    var mapped = []
    for (var i = 0; i < arr.length; i++)
      mapped.push(fn(arr[i], i))
    return mapped
  }

  /**
   * Used to get original width / height of image
   */
  function getOriginalWidth(image) {
    var imageClean = new Image()
    imageClean.setAttribute('src', image.getAttribute('src'))
    return imageClean.width
  }

  /**
   * Takes a list of area tags and returns a list of their respective coord attrs
   * Each coord attr is represented as a list of integers
   */
  function getCoords(areaTags) {
    if (!areaTags || !areaTags.length) return
    return map(areaTags, function(tag) {
      var coords = tag.getAttribute('coords')
      if (coords)
        return map(coords.split(','), function(val) { return parseInt(val) })
    })
  }

  /**
   * Assumes image is already loaded
   */
  function createResizer(image) {

    if (image)
      var mapName = image.getAttribute('usemap')

    if (mapName) {
      // Map name should start with a # sign which must be removed to create the selector
      var name = mapName[0] === '#' ? mapName.substring(1) : mapName
      var mapEl = document.querySelector('map[name="' + name + '"]')
    }

    if (mapEl) {
      // True width of image
      var w = getOriginalWidth(image)
      var areaEls = mapEl.querySelectorAll('area')
      var areaCoords = getCoords(areaEls)
    }

    return {
      resize: function() {
        if (areaEls) {
          var wCurr = image.offsetWidth
          var ratio = wCurr / w
          each(areaEls, function(tag, i) {
            var coords = areaCoords[i]
            if (coords && coords.length) {
              tag.setAttribute('coords', map(coords, function(val) {
                return Math.round(val * ratio)
              }).join(','))
            }
          })
        }
      }
    }
  }

  module.exports = createResizer

})(typeof document !== 'undefined'  ? document : null)

},{}],3:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = /^loaded|^i|^c/.test(doc.readyState)

  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? fn() : fns.push(fn)
  }

});

},{}]},{},[1])