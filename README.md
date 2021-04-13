# Frontend

Frontend application for the MMS user interface.

## How do I get set up?

### Install NVM (https://github.com/nvm-sh/nvm)

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

or

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

Then

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install 10.22.0

```

## Running The Application (development)

```
npm install

npm start
```

## Build The Application (production)

```
npm run build
```

After that, all the static file inside "code/build" folder, serve that with any version of nginx/apache

### Development:

# Run `yarn storybook or npm run storybook`

- Select the docs to see the example code (https://gyazo.com/3fd36051d5f1cfd4b6674ebd6d3ba236)

# Using emotion:

add block of code below to the top of file

````
 /** @jsx jsx */
import { css, jsx } from "@emotion/core"; ```
````

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
