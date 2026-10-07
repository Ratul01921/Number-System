# Number System

An interactive educational platform designed to teach Number Systems (Binary, Octal, Decimal, Hexadecimal).

## Multi-Page Route Structure

The app is built using the Next.js App Router with the following structure:
- `/` - Home (Hero & Converter)
- `/learn` - Interactive Topics Index
- `/learn/[topic]` - Deep dive explanations for each base
- `/visual-lab` - Interactive visual tools (Bit Toggler, Animated Division, Block Visual)
- `/practice` - Quiz, Flashcards, and Speed Round modes
- `/cheatsheet` - Printable quick reference tables
- `/real-world` - Examples of IP addresses, Hex colors, and ASCII
- `/dev-corner` - Code snippets for number conversion in multiple languages

## Features

- **Live Conversions**: Binary, Octal, Decimal, Hexadecimal.
- **Detailed Step-by-step**: Visual tables, remainder tracking, grouping animations.
- **Practice Mode**: Test your skills with instant feedback and streaks.
- **Responsive Design**: Premium styling using Tailwind CSS v4, perfectly responsive from 320px up to large 4K screens.

## Tech Stack
- Next.js 15 (App Router, Static Export)
- React 19
- Tailwind CSS v4
- TypeScript

## Local Development
```bash
npm install
npm run dev
```

Designed & Developed by Shahriar Ratul.
