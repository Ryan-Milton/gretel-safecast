# Gretel Safecast

Gretel Safecast is a web application designed for [project description]. This README provides instructions on how to set up and run the project locally.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Build for Production](#build-for-production)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm is typically included with Node.js. Verify you have it by running `npm -v` in your terminal.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Ryan-Milton/gretel-safecast.git
   cd gretel-safecast
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   npx tsr generate
   ```

3. **Caveat**:

   This repository uses [Tailwind CSS](https://tailwindcss.com/) for styling and Shadcn/ui for some components. If you are unable to run the project due to "missing peer dependencies" or "missing components", you may need to install the missing dependencies manually; see [Shadcn/ui Installation](https://ui.shadcn.com/docs/installation/vite).

   This project uses [TanStack Router](https://tanstack.com/router/v1/docs/overview) for routing. If you are unable to run the project or navigate to a "routed-table/$measurementId" page please run `npx tsr generate` should do the trick if `npm run dev`; see [TanStack Router | File Based Routing](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing#using-the-generate-command).

   If you have further issues, please open an issue or email me at mr.ryan.milton@gmail.com.

## Configuration

1. **Environment Variables**:

   Create a `.env` file in the root directory of the project and add the necessary environment variables. For example:

   ```env
   VITE_SAFECAST_API_KEY=your_safecast_api_key
   ```

   Ensure you replace `your_safecast_api_key` with your api key.

2. **Proxy Configuration**:

   Ensure that your `vite.config.js` is properly configured to proxy API requests. Here is an example configuration:

   ```javascript
   import path from "path";
   import react from "@vitejs/plugin-react";
   import { defineConfig } from "vite";

   export default defineConfig({
     plugins: [react()],
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
     server: {
       proxy: {
         "/api": {
           target: "https://api.safecast.org/en-US/",
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, ""),
         },
         "/nominatim": {
           target: "https://nominatim.openstreetmap.org/",
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/nominatim/, ""),
         },
       },
     },
   });
   ```

## Running the Project

1. **Start the Development Server**:

   ```bash
   npm run dev
   ```

   This will start the development server, and you should be able to access the application at `http://localhost:5173`.

## Build for Production

1. **Build the Project**:

   ```bash
   npm run build
   ```

   This will create a `dist` directory with the production build of your application.

## Contributing

If you want to contribute to this project, please follow these steps:

1. **Fork the Repository**:

   Click the "Fork" button at the top right of this repository to create a copy of the repository in your GitHub account.

2. **Clone the Forked Repository**:

   ```bash
   git clone https://github.com/your-username/gretel-safecast.git
   cd gretel-safecast
   ```

3. **Create a New Branch**:

   ```bash
   git checkout -b feature-name
   ```

4. **Make Your Changes**:

   Make the necessary changes in your local repository.

5. **Commit Your Changes**:

   ```bash
   git add .
   git commit -m "Describe your changes"
   ```

6. **Push to the Branch**:

   ```bash
   git push origin feature-name
   ```

7. **Submit a Pull Request**:

   Open a pull request to merge your changes into the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
