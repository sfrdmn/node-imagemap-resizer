# imagemap-resizer

[![browser support](https://ci.testling.com/sfrdmn/node-imagemap-resizer.png)
](https://ci.testling.com/sfrdmn/node-imagemap-resizer)

Problem: You've got all these imagemaps, but if you resize their respective images, they break!
So here's a handy Node module to resize those imagemaps for ya

## Example usage

```Javascript
var createResizer = require('imagemap-resizer')
var img = document.querySelector('img.cool-image')
var resizer = createResizer(img)

window.addEventListener('resize', function(e) {
  resizer.resize()
})

/**
 * This will update all the coord attributes of the area
 * tags for the given image's corresponding imagemap :/
 */
```

## License

ISC

## Credits

[Bell sound](http://www.freesound.org/people/Benboncan/sounds/80578/)

[Ocean sound](http://www.freesound.org/people/stomachache/sounds/157881/)

[Dhammapada image](http://unicode.strangled.net/me/rch/dd.html)
