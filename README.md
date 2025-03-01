# WriteTogether Draft
Do NOT submit this README.md file, either amend/rewrite for submission**

## Setting up

### Local
1. Run `npm install`
2. To run locally: `npm run dev`

- The entry point is `app/page.tsx`.
- The editor is at `app/tiptap/editor.tsx`.

### Deploying on Netlify
1. Create a Github repository:
 - Create a new repository on the Github website.
 - Run `git init` in this directory.
 - Run `git remote add origin https://github.com/your-username/your-repo-name.git` to add the remote repository.
 - Run `git add .` to add all files to the staging area.
 - Run `git commit -m "Initial commit"` to commit the changes.
 - Run `git push -u origin main` to push the changes to the remote repository.
2. Make a [Netlify](https://netlify.com/) account.
3. Once on the dashboard, find the add new site button, and select import from an existing project.
4. Select Github and link your account.
5. You can now import your repository that you've created.
6. It should recognise that you are using a Next.js app. Look for a Next.js badge to verify.
7. Press on Site Configuration and select Environment Variables.
8. Click add a variable (import from .env file) and add the following: 
_You can put either your own key or the one provided in .env.local in this directory:_
```
LIVEBLOCKS_SECRET_KEY=KEY_HERE
```
9. Now click on Deploys on the left side, and select Trigger Deploy > Clear cache and deploy site.
10. Track the progress below, it should eventually be tagged as "Published".
11. You can now access the url set.

Netlify allows you to set up a custom domain if you wish.

## Information about project

### Interface

All interface components are located in the `components` directory. These are styled using [Shadcn UI.](https://www.shadcn.com/ui.html) and Tailwind CSS.

### Authentication

As of now, all users are guests. They are given a random name when they connect. This will be amended in the future for final project. The logic can be found in the `app/api/database.ts` file.

### Interactivity

Interactivity is handled by [liveblocks](https://liveblocks.io/), a real-time collaboration library. The `.env.local` file is where the secret key is stored. I've provided a key for use, but if you ever want to access your own data independently, you'll need to generate your own key at your own expense.

### Dependencies

**All dependencies are found in the package.json file**

Descriptions of relevant dependencies:

- next: The Next.js framework for building React applications with server-side rendering (SSR), static site generation (SSG), and API routes. Essential for the project.
- typescript: Enables static type checking for JavaScript, improving code quality and maintainability. Important for TypeScript projects.
- @liveblocks/client: Client-side library for interacting with Liveblocks, enabling real-time collaboration features. Key for Liveblocks integration.
- @liveblocks/node: Node.js utilities for working with Liveblocks on the server side.
- @liveblocks/react: Provides React hooks for integrating Liveblocks into React components. Necessary for real-time collaboration in React.
- @liveblocks/react-tiptap: Bridges Liveblocks with TipTap, allowing collaborative text editing. Directly supports TipTap integration.
- @liveblocks/react-ui: UI components for displaying presence indicators, cursors, etc.
- @liveblocks/yjs: Integrates Liveblocks with Yjs, a CRDT-based collaborative editing library. Important for real-time text synchronization.
- @tiptap/react: A React wrapper for TipTap, a headless rich-text editor framework. Core dependency for the collaborative editor.
- @tiptap/starter-kit: A set of essential extensions for TipTap (bold, italic, lists, etc.).
- @tiptap/pm: TipTap’s dependency on ProseMirror, the underlying text editor framework.
- tailwindcss: The Tailwind CSS framework for styling components. Important if Tailwind is used for styling.
