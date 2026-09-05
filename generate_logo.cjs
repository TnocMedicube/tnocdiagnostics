const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720" width="720" height="720">
  <defs>
    <clipPath id="squircle">
      <rect x="0" y="0" width="720" height="720" rx="160" ry="160" />
    </clipPath>
  </defs>

  <!-- Background with squircle clipping -->
  <g clip-path="url(#squircle)">
    <!-- Diagonal split: Top-Left Red, Bottom-Right Blue -->
    <polygon points="0,0 720,0 0,720" fill="#D32729" />
    <polygon points="720,0 720,720 0,720" fill="#1570D0" />

    <!-- Stethoscope in Pure White -->
    <g fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round">
      <!-- Binaural tubes -->
      <path d="M 242 165 
               C 242 275, 270 355, 360 388
               C 450 355, 478 275, 478 165" 
            stroke-width="44" />
      
      <!-- Stem going down into the chestpiece center -->
      <path d="M 360 388 L 360 562" stroke-width="44" />
      
      <!-- Chestpiece circular ring -->
      <circle cx="360" cy="562" r="64" stroke-width="44" />
    </g>

    <!-- Ear tips as solid white circles -->
    <circle cx="242" cy="155" r="28" fill="#FFFFFF" />
    <circle cx="478" cy="155" r="28" fill="#FFFFFF" />
  </g>
</svg>`;

fs.writeFileSync('public/logo.svg', svgContent);
fs.writeFileSync('public/assets/logo.svg', svgContent);
fs.writeFileSync('public/assets/tnoc-logo.svg', svgContent);

const resvg = new Resvg(svgContent, { fitTo: { mode: 'width', value: 720 } });
const pngBuffer = resvg.render().asPng();

fs.writeFileSync('public/logo.png', pngBuffer);
fs.writeFileSync('public/favicon.png', pngBuffer);
fs.writeFileSync('public/assets/logo.png', pngBuffer);
fs.writeFileSync('public/assets/tnoc-logo.png', pngBuffer);

// Also produce 192x192 and 32x32 favicons
const resvg192 = new Resvg(svgContent, { fitTo: { mode: 'width', value: 192 } });
fs.writeFileSync('public/favicon-192.png', resvg192.render().asPng());

console.log('All logo assets generated successfully!');
