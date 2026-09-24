// Regenerates public/og-default.png and public/apple-touch-icon.png.
// Run with: node scripts/make-images.mjs
import sharp from 'sharp';

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#111110"/>
  <text x="96" y="300" font-family="Georgia, serif" font-size="112" fill="#e6e4df">Hiba</text>
  <text x="100" y="380" font-family="Segoe UI, Arial, sans-serif" font-size="36" fill="#8f8b84">Tinkineer: curious enough to ask why something ticks</text>
  <rect x="100" y="440" width="80" height="4" fill="#e0a96d"/>
  <text x="100" y="530" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#e0a96d">hibaddie.co</text>
</svg>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <rect width="180" height="180" fill="#111110"/>
  <text x="90" y="130" text-anchor="middle" font-family="Georgia, serif" font-size="128" fill="#e0a96d">h</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile('public/og-default.png');
await sharp(Buffer.from(icon)).png().toFile('public/apple-touch-icon.png');
console.log('done');
