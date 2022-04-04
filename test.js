var Jimp = require('Jimp');
var fs = require('fs');

// Create two-dimensional pixels rgb array based on png image
Jimp.read('240p.png')
  .then(image => {
    var width = image.bitmap.width;
    var height = image.bitmap.height;
    var pixels = [];
    for (var y = 0; y < height; y++) {
      var rowPixels = [];
      for (var x = 0; x < width; x++) {
        var pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
        rowPixels.push(`${pixel.r}, ${pixel.g}, ${pixel.b}`);
      }
      pixels.push(rowPixels);
    }
    fs.writeFile('INPUT_DATA.json', JSON.stringify({ data: pixels }), 'utf8', err => {
        if (err) { throw err; }
      }
    );
  })
  .catch(err => { throw err; });

// Create png image based on two-dimensional pixels rgb array
fs.readFile('INPUT_DATA.json', 'utf8', (err, file) => {
    if (err) { throw err; }
    var pixelsData = JSON.parse(file);
    var pixels = pixelsData.data;
    new Jimp(pixels[0].length, pixels.length, (err, image) => {
        if (err) { throw err; }
        pixels.forEach((rowPixels, y) => {
            rowPixels.forEach((pixel, x) => {
                var rgb = pixel.split(',');
                var r = Number(rgb[0]);
                var g = Number(rgb[1]);
                var b = Number(rgb[2]);
                var color = Jimp.rgbaToInt(r, g, b, 255);
                image.setPixelColor(color, x, y)
            })
        })
        image.write('OUTPUT_IMAGE.png', (err) => {
            if (err) { throw err; }
        });
    });
})