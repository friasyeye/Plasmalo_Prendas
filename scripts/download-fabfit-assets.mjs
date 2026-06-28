import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'fabfit');

const ASSETS = [
  { url: 'https://framerusercontent.com/images/I4IMUIl9ukD06rUQJ8wjuaf4rEI.png', name: 'hero-image.png' },
  { url: 'https://framerusercontent.com/images/oCYgwRSuDgtJ05PYogjD5vI7lI.png', name: 'category-jerseys.png' },
  { url: 'https://framerusercontent.com/images/uPGPv4TC17nlj8XAjd8q7spNfM.png', name: 'category-accessories.png' },
  { url: 'https://framerusercontent.com/images/G0fIPgzeS1DGOX1N0ipQY9A4ow.png', name: 'category-sports.png' },
  { url: 'https://framerusercontent.com/images/mcUCXwl7AjzXPTZPieMrlaXnoFM.png', name: 'product-grey-comfort.png' },
  { url: 'https://framerusercontent.com/images/hgxBecJK8g0LLfFrUD0cIQcpw.jpg', name: 'product-dust-bowl.jpg' },
  { url: 'https://framerusercontent.com/images/QLWLZbwB4JeH1o2jDkXgWK1u0SQ.jpg', name: 'product-after-hours.jpg' },
  { url: 'https://framerusercontent.com/images/NwtBqPd7F25I3XYVYIMqT0Fdg.png', name: 'sale-model-left.png' },
  { url: 'https://framerusercontent.com/images/KFKeA3ahWonVN7umfBoGla1Uw.png', name: 'sale-model-right.png' },
  { url: 'https://framerusercontent.com/images/FbNuSCF9em6WpwKdXtLqGOnYEvs.png', name: 'product-sunglasses.png' },
  { url: 'https://framerusercontent.com/images/Oo5nrHJkEqNyjbJCCVdvf0ENcE.jpg', name: 'product-duffel.jpg' },
  { url: 'https://framerusercontent.com/images/Hlmp2nj69RC12SraYjkIOXetJ6o.jpg', name: 'product-water-bottle.jpg' },
  { url: 'https://framerusercontent.com/images/uISN2sZ7yPTBXzYW9vBDYd9Fy7Y.png', name: 'avatar-rohan.png' },
  { url: 'https://framerusercontent.com/images/6KOws535EGnPMo4M4rKuvtgu0g.png', name: 'avatar-aanay.png' },
  { url: 'https://framerusercontent.com/images/xipTHXlwkPcH6kAuetJuPDuYCOA.png', name: 'avatar-sofia.png' },
  { url: 'https://framerusercontent.com/images/OFp0PxOZHChWYjV2azu726FmmU.png', name: 'avatar-emily.png' },
  { url: 'https://framerusercontent.com/images/Yf482S1V9kcDTdnLV6d18rWsk3E.png', name: 'footer-model.png' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', err => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const asset of ASSETS) {
    const dest = path.join(OUT_DIR, asset.name);
    try {
      await download(asset.url, dest);
      console.log('✓', asset.name);
    } catch (e) {
      console.error('✗', asset.name, e.message);
    }
  }
}

main();
