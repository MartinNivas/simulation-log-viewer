[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup Project in Local Environment

    1. Install nodejs version > 10 (https://nodejs.org/en/download/)
    2. Install visual studio code editor (preferred) or any editor of your choice (https://code.visualstudio.com/Download)
    3. Install git for version control (https://git-scm.com/downloads)
    4. Clone the project (https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)
    5. Install commitizen (https://www.npmjs.com/package/commitizen)
    6. Inside the cloned project folder -> Install all the project dependecies by using command `npm install`
    7. To start the project use `npm start`
    8. Checkout the branch dev_stable to make incremental development and PR can be raised to merge to master branch

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run commmit`

Instead of usual `git commit` command commitzen is used to standarize the commit changelog

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build:local` / `npm run build:sit` / `npm run build:qa` / `npm run build:prod` 

Builds the app based on the environment configuration file to the `build` folder.<br />
It correctly bundles React in production mode for `build:prod` command and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br />


## Project Layout

* `public` - To load the mock datas , favicon, images etc for the project

  * `data` - Mock data json files

* `src` - Actual project code reside inside this folder

  * `assets` - images, video, audio etc will be inside this folder

    * `images` - contains application jpg, gif, png files

  * `components` - Contain Application(s) single / shared components

    * `Header` - Header section of the application for all pages
 
    * `ListGridView` - The result component UI for search page

    * `SearchZone` - The search page component which has autocomplete fields and import ListGridView Component 

    * `Simulator` - The Simultor container imports this component which comprises of tableview page and search page

    * `TableView` - The result component UI for table page

    * `Tabs` - Implement the state tabs for the application

  * `configs` - Contain application config files mostly to interact with backend API
    
    * `appconfig.js` - main file which will render the config file based on the environment

    * `appconfig-local.js` - Local environment config file which has endpoints, baseurl etc

    * `appconfig-sit.js` - Sit environment config file which has endpoints, baseurl etc

    * `appconfig-qa.js` - QA environment config file which has endpoints, baseurl etc

    * `appconfig-prod.js` - Prod environment config file which has endpoints, baseurl etc


  * `containers` - Comprises of containers which take care of the business logic of the application

    * `SimulatorContainer` - Communicates with the application service to load the data for application

  * `locales` - Contains constant(s) files for the application

    * `constants` - Static text are stated inside this file which can be applied for application

  * `services` - Contain all the services necessary for the Frontend to communicate with backend 

    * `SimulatorService` - Loads the file mock data which is stored outside of the project

  * `utils` - Contain all the common functions which can be used across the application

    * `Utils.js` - Contain all the common functions which can be used across the application

## Notes

  1. `primereact` npm module is used for theming the application
  2. `Commitzen` npm module is used for standarizing commit conventions
  3. Most of the components in the application are `Lazy` loaded
  4. `Loading Spinner` implemented to indicate the user/customer that the page is loading till the components are completed loaded
  5. Introduced `React Hooks` concept for components to maintain its state
  6. The whole application is designed on the concept of `containermodule`
  7. Additional scripts have been introduced to `build the application in ease for different environments (package.json)`
  8. `SonarLint` plugin in VSCode to identify code issues so the application will follow the best standard format
  9. `Prettier - Code formatter` plugin in VSCode to format the code(s)



