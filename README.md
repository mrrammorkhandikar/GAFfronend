# Global Aid Foundation Website

A modern, responsive Next.js website for an NGO showcasing their mission, events, campaigns, and career opportunities.

## Features

- **Responsive Design**: Works seamlessly across all devices
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Component-Based Architecture**: Reusable components for consistent design
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## Navigation

The website features a clean navigation structure with the following top-level pages:

- **HOME** - Main landing page
- **ABOUT** - Organization information and mission
- **CAMPAIGNS** - Active fundraising initiatives
- **EVENTS** - Upcoming and past events
- **CAREERS** - Job opportunities and volunteer applications
- **DONATE** - Donation processing (featured in header)

1. **Home** (`/`) - Main landing page with mission statement and key programs
2. **About Us** (`/about`) - Organization history, mission, and volunteer information
3. **Campaigns** (`/campaigns`) - Active fundraising campaigns with detailed views
4. **Events** (`/events`) - Upcoming and past events with detailed storytelling
5. **Careers** (`/careers`) - Job openings, volunteer applications, and career opportunities
6. **Donate** (`/donate`) - Donation processing and contribution options

## Components

- `Header.js` - Navigation bar with mobile menu and updated links
- `Footer.js` - Comprehensive footer with links to all pages
- `HeroSection.js` - Reusable hero section with customizable props
- `Animations.js` - Animation utilities using Framer Motion
- Dynamic route components for campaign and event details

## Tech Stack

- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.js
│   │   ├── campaigns/
│   │   │   └── page.js
│   │   ├── careers/
│   │   │   └── page.js
│   │   ├── events/
│   │   │   └── page.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   └── components/
│       ├── Animations.js
│       ├── Footer.js
│       ├── Header.js
│       └── HeroSection.js
├── public/
└── package.json
```

## Customization

- Update organization details in `Header.js` and `Footer.js`
- Modify color scheme in `globals.css` (primary color: red-600)
- Add/remove pages by creating new folders in `src/app/`
- Customize content in each page component

## Images

All images are sourced from Unsplash and are free to use. Replace with your own images for production use.

## Deployment

Build the application:
```bash
npm run build
```

Start production server:
```bash
npm start
```