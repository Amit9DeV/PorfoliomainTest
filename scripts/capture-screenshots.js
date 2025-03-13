const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const projects = [
  {
    name: 'NexCart',
    url: 'https://nex-cart-2.vercel.app/',
    filename: 'NexCart.jpg'
  },
  {
    name: 'E-Books Store',
    url: 'https://ebooks-store.vercel.app/',
    filename: 'ebooks.jpg'
  },
  {
    name: 'EOS Payment',
    url: 'https://eospay.vercel.app/',
    filename: 'eospay.jpg'
  },
  {
    name: 'Travel Explorer',
    url: 'https://travel-app-react-project.vercel.app/',
    filename: 'travel.jpg'
  },
  {
    name: 'Library Management',
    url: 'https://librarymanagementbyamit.netlify.app/',
    filename: 'Library.jpg'
  },
  {
    name: 'Photo Album',
    url: 'https://sunny-sigu.netlify.app/',
    filename: 'photo-album.jpg'
  },
  {
    name: 'Nature Landing',
    url: 'https://amazing-alfajores-47d836.netlify.app/',
    filename: 'nature-landing.jpg'
  }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to a common desktop resolution
  await page.setViewport({ width: 1920, height: 1080 });
  
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  for (const project of projects) {
    try {
      console.log(`Capturing screenshot for ${project.name}...`);
      await page.goto(project.url, { waitUntil: 'networkidle0' });
      await page.screenshot({
        path: path.join(publicDir, project.filename),
        fullPage: false,
        quality: 80
      });
      console.log(`✓ Captured ${project.filename}`);
    } catch (error) {
      console.error(`Error capturing ${project.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('All screenshots captured!');
}

captureScreenshots().catch(console.error); 