# Portfolio Website

A premium, production-ready portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Modern Design**: Minimalist but bold design with high contrast accents
- 🌙 **Dark Mode**: Light/dark theme toggle with localStorage persistence
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ⚡ **Fast Performance**: Built with Vite for optimal loading times
- 🎭 **Smooth Animations**: Framer Motion for polished micro-interactions
- 🔍 **SEO Optimized**: Proper meta tags and semantic HTML
- 📧 **Contact Form**: EmailJS integration ready

## Tech Stack

- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide Icons** - Icon library
- **EmailJS** - Contact form handling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Configuration

### EmailJS Setup

To enable the contact form:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update the following in `src/pages/Contact.jsx`:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`

### GitHub Integration

To display pinned repositories:

1. Update the `username` prop in the GitHubRepos component (if used)
2. For production, set up GitHub API authentication

### Personalization

Update the following files with your information:

- `src/data/projects.js` - Your project data
- `src/data/skills.js` - Your skills
- `src/pages/Home.jsx` - Hero section content
- `src/pages/About.jsx` - About section content
- `src/pages/Contact.jsx` - Contact information

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   ├── PageTransition.jsx
│   └── GitHubRepos.jsx
├── context/         # React context providers
│   └── ThemeContext.jsx
├── data/           # Static data
│   ├── projects.js
│   └── skills.js
├── pages/          # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── ProjectDetail.jsx
│   ├── Skills.jsx
│   └── Contact.jsx
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Features Overview

### Pages

- **Home** (`/`) - Hero section with strong headline and CTAs
- **About** (`/about`) - Professional background and philosophy
- **Projects** (`/projects`) - Searchable project gallery
- **Project Detail** (`/projects/:slug`) - Detailed project view
- **Skills** (`/skills`) - Categorized skills with animated cards
- **Contact** (`/contact`) - Contact form with EmailJS integration

### Components

- **Navbar** - Sticky navigation with animated active states
- **PageTransition** - Smooth page transitions
- **GitHubRepos** - Display pinned GitHub repositories

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme. The primary color is defined in the `colors.primary` section.

### Fonts

The project uses Inter font from Google Fonts. To change, update the import in `src/index.css` and the font family in `tailwind.config.js`.

## License

This project is open source and available for personal use.

## Contact

For questions or suggestions, feel free to reach out!
