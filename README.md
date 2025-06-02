[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# React Application

This project was bootstrapped using [Create React App](https://github.com/facebook/create-react-app).

---

## ðŸš€ Getting Started

Follow these steps to set up the project on your local machine:

1. **Install Node.js** (version > 10): [Download Node.js](https://nodejs.org/en/download/)
2. **Install a Code Editor**: [Visual Studio Code (recommended)](https://code.visualstudio.com/Download)
3. **Install Git**: [Download Git](https://git-scm.com/downloads)
4. **Clone the Repository**: Follow [this guide](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet) if needed.
5. **Install Commitizen** (for standardized commit messages): `npm install -g commitizen`  
   [Learn more](https://www.npmjs.com/package/commitizen)
6. **Install Project Dependencies**:  
   Navigate into the cloned project folder and run:  
   ```bash
   npm install
   ```
7. **Start the Development Server**:  
   ```bash
   npm start
   ```
8. **Development Branch**:  
   Work on the `dev_stable` branch. Raise pull requests to merge changes into the `master` branch.

---

## ðŸ“œ Available Scripts

Within the project directory, you can run the following commands:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) in your browser.  
Hot-reloading is enabled and linting errors will appear in the console.

### `npm run commit`

Replaces the traditional `git commit` with Commitizen for standardized commit messages.

### `npm test`

Launches the test runner in interactive watch mode.

### Environment-specific builds

Use the following scripts to generate builds for different environments:

- `npm run build:local`
- `npm run build:sit`
- `npm run build:qa`
- `npm run build:prod`

Each script uses a corresponding environment config file.  
The `build:prod` command generates a production-ready bundle optimized for performance (minified files with hashes).

---

## ðŸ“ Project Structure

```
â”œâ”€â”€ public/                 # Static files (favicon, images, mock data)
â”‚   â””â”€â”€ data/               # JSON mock data files
â”‚
â”œâ”€â”€ src/                    # Main source code
â”‚   â”œâ”€â”€ assets/             # Media assets (images, videos, audio)
â”‚   â”‚   â””â”€â”€ images/         # Image files (JPG, PNG, GIF, etc.)
â”‚   â”‚
â”‚   â”œâ”€â”€ components/         # Reusable UI components
â”‚   â”‚   â”œâ”€â”€ Header/         
â”‚   â”‚   â”œâ”€â”€ ListGridView/   
â”‚   â”‚   â”œâ”€â”€ SearchZone/     
â”‚   â”‚   â”œâ”€â”€ Simulator/      
â”‚   â”‚   â”œâ”€â”€ TableView/      
â”‚   â”‚   â””â”€â”€ Tabs/           
â”‚   â”‚
â”‚   â”œâ”€â”€ configs/            # Environment-based configuration files
â”‚   â”‚   â”œâ”€â”€ appconfig.js           
â”‚   â”‚   â”œâ”€â”€ appconfig-local.js     
â”‚   â”‚   â”œâ”€â”€ appconfig-sit.js       
â”‚   â”‚   â”œâ”€â”€ appconfig-qa.js        
â”‚   â”‚   â””â”€â”€ appconfig-prod.js      
â”‚   â”‚
â”‚   â”œâ”€â”€ containers/         # Smart components handling business logic
â”‚   â”‚   â””â”€â”€ SimulatorContainer/    
â”‚   â”‚
â”‚   â”œâ”€â”€ locales/            # Application constants and static texts
â”‚   â”‚   â””â”€â”€ constants/      
â”‚   â”‚
â”‚   â”œâ”€â”€ services/           # API interaction and data handling
â”‚   â”‚   â””â”€â”€ SimulatorService.js    
â”‚   â”‚
â”‚   â””â”€â”€ utils/              # Shared utility functions
â”‚       â””â”€â”€ Utils.js        
```

---

## ðŸ“ Notes

- **UI Framework**: `primereact` is used for theming and UI components.
- **Commit Standards**: `Commitizen` ensures consistent commit messages.
- **Lazy Loading**: Components are loaded lazily to improve performance.
- **Loading Spinner**: Displayed while components are loading to improve UX.
- **React Hooks**: Used throughout to manage component state.
- **Architecture**: The app follows a `container-module` pattern.
- **Environment Builds**: Custom scripts available to build for different environments.
- **Code Quality**:
  - Use the **SonarLint** VS Code plugin to catch issues during development.
  - Use **Prettier** for automatic code formatting.