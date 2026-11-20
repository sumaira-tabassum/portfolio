# Sumaira Tabassum · Portfolio

My personal portfolio: I'm an **Automation Engineer & Full-Stack Developer** based in Lahore, Pakistan. I build automations (GoHighLevel, n8n, AI agents) that capture and follow up leads, and the web and mobile apps that sit around them.

## Features

- **Animated hero:** split-text name, typing tagline and a rotating role.
- **About:** count-up stats and a link to my resume.
- **Experience:** a timeline that draws itself as you scroll.
- **Projects:** cards with a magnifying-lens zoom on screenshots, an All projects page, and a detailed case study with an animated workflow diagram.
- **Contact:** a chat-style form that opens Gmail or your email app with the message filled in.
- **Light and dark mode**, remembered per visitor.
- **5 animated backgrounds** and a colour switcher (palette button, bottom right).
- Each section has its own colour, taken from the letters of my name.

## Built with

- [Next.js 15](https://nextjs.org) (App Router) and TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Bits](https://reactbits.dev) components (Split Text, Count Up, Particles, Rotating Text)
- GSAP, Motion and OGL for animation

## Run it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

| Path | What's in it |
| --- | --- |
| `src/data/profile.ts` | All the text: profile, experience, projects |
| `src/data/caseStudies.ts` | Case study content |
| `src/styles/theme.css` | Colours (dark and light) and fonts |
| `src/app/` | Pages: home, all projects, case studies |
| `src/components/` | Cards, timeline, contact chat, backgrounds |
| `public/projects/` | Project screenshots |

## Contact

- LinkedIn: [sumaira-tabassum7](https://linkedin.com/in/sumaira-tabassum7)
- Email: sumairatabassum974@gmail.com
