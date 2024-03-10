# Starting with the project

This project utilizes Vite, React, and Tailwind CSS.

## Prerequisites

Ensure you have Node.js and npm (or yarn) installed on your system. You can verify the installation by running `node -v` and `npm -v` (or `yarn -v`) in your terminal.

## Installation

1. Open a terminal in the project directory.
2. Install dependencies:

   ```bash
   npm install
   ```

   (or)

   ```bash
   yarn install
   ```

## Development

1. Start the development server:

   ```bash
   npm run dev
   ```

   (or)

   ```bash
   yarn dev
   ```

   The server will run on `http://localhost:3000` by default.

2. Open `http://localhost:3000` in your web browser to view the application.

## Build

To build the application for production:

```bash
npm run build
```

(or)

```bash
yarn build
```

An optimized production build will be created in the `dist` folder.

## Tailwind CSS

Tailwind CSS is pre-configured in this project. Customize Tailwind CSS classes to style your React components by modifying `tailwind.config.js`.

## Additional Notes

* React Router is used for routing (optional). Configuration can be found in `App.jsx`.
* Add additional dependencies as needed using `npm install <package-name>` (or `yarn add <package-name>`)

## Resources

* [Vite](https://vitejs.dev/)
* [React](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/docs/installation)
