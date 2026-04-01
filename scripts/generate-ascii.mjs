import sharp from 'sharp';

const WIDTH = 80;
// ASCII chars from darkest to lightest
const CHARS = '@#S%?*+;:,. ';

const { data, info } = await sharp('./public/assets/pontarollopaolo.jpg')
  .resize(WIDTH, null)
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
let result = '';
for (let y = 0; y < height; y += 2) {
  for (let x = 0; x < width; x++) {
    const pixel = data[y * width + x];
    const idx = Math.floor((pixel / 255) * (CHARS.length - 1));
    result += CHARS[idx];
  }
  result += '\n';
}
process.stdout.write(result);
