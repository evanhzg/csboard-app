# Evan's Playground

Welcome to Evan's Playground, a React-based project showcasing various
components, current projects, and portfolio items. This project includes a
collaborative canvas using [tldraw](https://tldraw.dev/), integrated with
[Liveblocks](https://liveblocks.io) Storage, and built with
[Next.js](https://nextjs.org/).

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Getting Started

To try this example locally, run the following command:

```bash
npx create-liveblocks-app@latest --example nextjs-tldraw-whiteboard-storage --api-key
```

This will download the example and ask permission to open your browser, enabling
you to automatically get your API key from your liveblocks.io account.

### Manual Setup

Alternatively, you can set up your project manually:

Install all dependencies with `npm install`

More details will be added in a near future.

### Deploy on Vercel

To both deploy on Vercel, follow the instructions on [Vercel](vercel.com/docs)

## Features

**Collaborative Canvas**: Built with tldraw and integrated with Liveblocks for
real-time collaboration.

**Text Editor Component**: Allows you to write and format text content with
persistent storage.

**Responsive Design**: Fully responsive and optimized for various screen sizes.

**Dynamic Tabs Component with State Reload and Auto-Switching**: This component
features tabs that dynamically reload their state and automatically switch
between them, accompanied by a loading bar to ensure a seamless user experience.

## Dependencies

@liveblocks - Drawing Board

@supabase - Database (Real-time postgresql) for Notes

@tiptap - Text editor utilities

_(For a full list of dependencies, see the package.json file.)_

## License

The tldraw library is provided under the tldraw license which allows commercial
and non-commercial use.

To purchase a business license and remove the watermark, contact
sales@tldraw.com.

Evan's Playground is licensed under the Apache-2.0 License.
