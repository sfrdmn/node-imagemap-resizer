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
