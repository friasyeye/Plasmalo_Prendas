import { mkdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = "https://framerusercontent.com";
const PUBLIC = join(__dirname, "..", "public");

const assets = [
  // SEO / favicons
  { src: "/images/g9Wer02sDjiKAYCdGxj59FhbaM.png", dest: "seo/favicon.png" },
  { src: "/images/oQMGp5VPNFA5paK6lva1JghtZXU.png", dest: "seo/apple-touch-icon.png" },

  // Logo
  { src: "/images/FFHvStLXV0fZb2MDKfjviPdTBq4.svg", dest: "images/logo.svg" },

  // Shop hero background
  { src: "/images/69KpTfQExw2P6pHkWrGLLsGusU.png", dest: "images/shop-hero-bg.png" },

  // Filter checkbox icon
  { src: "/images/mAm8R6VB07vaKRv6eOaeCkVEVfE.svg", dest: "images/icon-check.svg" },

  // Product images (shop page)
  { src: "/images/qUFLKsFsuHfXdrbWTinOizj5c.png",  dest: "images/product-breeze-mesh-trainers.png" },
  { src: "/images/hr1DtTq343WS6UHJoAZxsZzJU.png",  dest: "images/product-ecolite-trail-shoes.png" },
  { src: "/images/pEXTM9Xvc3kbGPRaiuC5adoqvc.png", dest: "images/product-canyon-runner-sneakers.png" },
  { src: "/images/qC231tpWzYdmFTH6PQf76ln4A.png",  dest: "images/product-wave-knit-slip-ons.png" },
  { src: "/images/tQScb5pO0TYIRzgnzoXZEXBRo.png",  dest: "images/product-terraflex-everyday-sneaker.png" },
  { src: "/images/hvRrpR7vk9bwqh6aQJ68ymWLLME.png", dest: "images/product-coreloop-classic.png" },
  { src: "/images/gwCBNfHSpNHPtIzuUMCN6lQYVU.png", dest: "images/product-cloudtread-urban-walker.png" },
  { src: "/images/wDL4PNTtznBL0SGUIgYRKWeRso4.png", dest: "images/product-breathelite-mesh-trainer.png" },
  { src: "/images/ImeTVyQTcskcj6VWDGLODNQh9vo.png", dest: "images/product-ecostrider-trail-grip.png" },
  { src: "/images/hSn8qNIJZg0Mk7UTAcUVeWxoto.jpg",  dest: "images/product-gift-card.jpg" },

  // Larger product variants (298x298)
  { src: "/images/dwUQd14zczGQKHeNkzULN5LCM.png",  dest: "images/product-large-1.png" },
  { src: "/images/IZKT0Ajbp2MYHUi0oYDlboREcKg.png", dest: "images/product-large-2.png" },
  { src: "/images/w3Glq086aQm8iQrDZL058SiSpw.png",  dest: "images/product-large-3.png" },

  // Social icons
  { src: "/images/hm3iInpi6Vd2pSh32FBUe2mOk0.svg", dest: "images/icon-social.svg" },
];

async function downloadFile(url, destPath) {
  const fullDest = join(PUBLIC, destPath);
  await mkdir(dirname(fullDest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`SKIP ${url} → ${res.status}`);
    return;
  }
  const buf = await res.arrayBuffer();
  await writeFile(fullDest, Buffer.from(buf));
  console.log(`✓ ${destPath}`);
}

async function run() {
  const BATCH = 4;
  for (let i = 0; i < assets.length; i += BATCH) {
    await Promise.all(
      assets.slice(i, i + BATCH).map(a => downloadFile(`${BASE}${a.src}`, a.dest))
    );
  }
  console.log("Done.");
}

run().catch(console.error);
