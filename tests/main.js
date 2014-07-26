var fs = require('fs')
var test = require('tape')
var createResizer = require('../index.js')
var html, body

function loadTemplate() {
  var html = fs.readFileSync(__dirname + '/test.html', 'utf8')
  var body = document.querySelector('body')
  body.innerHTML = html
}

function map(arr, fn) {
  var mapped = []
  for (var i = 0; i < arr.length; i++)
    mapped.push(fn(arr[i], i))
  return mapped
}

function all(arr, fn) {
  for (var i = 0; i < arr.length; i++)
    if (!fn(arr[i], i)) return false
  return true
}

function getCoords(area) {
  return map(area.getAttribute('coords').split(','), function(val) { return parseInt(val) })
}

test('happiness', function(t) {
  t.plan(1)
  t.equals(true, true, ':)')
})

test('query selectin', function(t) {
  t.plan(2)
  loadTemplate()
  t.ok(document.querySelector('body'), 'query selected body!')
  t.ok(document.querySelector('img[usemap="#map"]'), 'query selected img[name="#map"]!')
})

test('coord values correct - img not yet resized', function(t) {
  t.plan(1)
  loadTemplate()
  var img = document.querySelector('img')
  var area = document.querySelector('area')
  var coords = getCoords(area)
  var resizer = createResizer(img)
  var w = img.offsetWidth
  var h = img.offsetHeight
  var ratio = 2
  img.setAttribute('width', w * ratio)
  img.setAttribute('height', h * ratio)
  resizer.resize()
  var wResized = img.offsetWidth
  var hResized = img.offsetHeight
  var areaCoordsResized = getCoords(area)
  t.ok(all(areaCoordsResized, function(coordResized, i) {
    return coordResized === Math.round(coords[i] * ratio)
  }), 'coords resized correctly')
})

/**
 * Here is the image has been resized before we create the resizer
 */
test('coord values correct - img already resized', function(t) {
  t.plan(1)
  loadTemplate()
  var img = document.querySelector('img')
  var area = document.querySelector('area')
  var ratio = 2
  var w = img.offsetWidth
  var h = img.offsetHeight
  img.setAttribute('width', w * ratio)
  img.setAttribute('height', h * ratio)
  var coords = getCoords(area)
  var resizer = createResizer(img)
  resizer.resize()
  var wResized = img.offsetWidth
  var hResized = img.offsetHeight
  var areaCoordsResized = getCoords(area)
  t.ok(all(areaCoordsResized, function(coordResized, i) {
    return coordResized === Math.round(coords[i] * ratio)
  }), 'coords resized correctly')
})
