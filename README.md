## Radio

### Stack

Project is written in Vite, React, Typescript and Tailwind. It was tested on Node.js v22.

### Run

To run the project, you need to have Node.js installed. You can run it with:

```bash
pnpm run dev # or pnpm or yarn, depending on your preferences
```

The `flake.nix` and `.env.rc` are for Nix+direnv users. You can ignore them, and use nvm or whatever you like.

### Architecture

- project does not use routing yet, but there already is a `pages` folder.
  It can be easily converted to some SSR stack, keeping similar structure.
- implementation is grouped by feature, not by type.
- player logic is extracted to a custom hook, that takes `HTMLAudioElement` as an argument.
  This way, some sort of fake implementation might be used for testing purposes.
  However, for more complex logic, it would be better, to extract the core logic to a plain module,
  decoupled also from the html document dependencies,
  so testing would be easier and would not require `React Testing Library` or similar (hooks need it).