# JCI Catbalogan Balud - Landing Page

A teaser landing page for [jcicatbaloganbalud.org](https://jcicatbaloganbalud.org) featuring an interactive wave animation background.

## Features

- 🌊 Interactive wave animation that responds to mouse movement
- ✨ Particle effects on hover and click
- 📱 Fully responsive design
- 🎨 Dark purple theme (#130f2d)
- ⚡ Lightweight and fast loading

## Setup

1. Replace `assets/lo-logo.png` with the actual JCI Catbalogan Balud Local Organization logo
2. Deploy to your preferred serverless platform

## Deployment Options

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Cloudflare Pages
1. Push to GitHub
2. Connect repository to Cloudflare Pages
3. Build command: (leave empty)
4. Output directory: `/`

### GitHub Pages
1. Push to GitHub
2. Go to Settings > Pages
3. Select branch and root folder

### AWS S3 + CloudFront
```bash
aws s3 sync . s3://your-bucket-name --exclude ".git/*" --exclude "README.md"
```

## File Structure

```
├── index.html      # Main HTML file
├── styles.css      # Styles and animations
├── script.js       # Interactive wave animation
├── assets/
│   └── lo-logo.png # LO Logo (replace with actual logo)
└── README.md       # This file
```

## Customization

### Changing the background color
Edit `styles.css`:
```css
body {
    background-color: #130f2d; /* Change this value */
}
```

### Adjusting wave colors
Edit `script.js` - modify the `waves` array colors:
```javascript
const waves = [
    { amplitude: 50, wavelength: 0.02, speed: 0.02, offset: 0, color: 'rgba(99, 102, 241, 0.15)' },
    // ... more waves
];
```

## License

© JCI Catbalogan Balud. All rights reserved.
