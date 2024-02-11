![Read 1](Read%201.png)

The OC Elementary School must efficiently track students' homework activities, such as reading and mathematics exercise time. Parents still use paper forms for monitoring times, and PTO (Parent Teacher Organization) members then have to process all those forms manually to provide statistics to the school staff. Our team is developing an efficient and straightforward tool to track children's activities to reach educational goals, stimulate students' progress, and participate in school competitions in reading and math. Web service "Minutes Tracker" provides a convenient way to track times, get statistics, and set specific time goals. Parents will use a link from a PTO website to our web service, and, with their local login credentials or Google Single sign-on, they will put in the number of minutes of reading/math and the name of the book their children read in the appropriate day fields. School staff and designated PTO members will have more comprehensive access to all data to gather educational statistics and reveal the winners in the school competitions.

#Deployment:

Web service can be deployed on the client’s server or into the cloud. For development purposes we use Google Cloud Platform

#Developer instructions:

In progress, to be updated.

#Testing:

Service needs access to GCP MySQL to run. Per security reasons, please add your personal login/password in dbconfig.js file before running.

#ERD
![Read 1](Read%202.png)


![Read 1](Read%203.png)
![Read 1](Read%204.png)






# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Node Modules to Install

Run these commands in the project directory:

npm install npm-run-all --save

npm install mysql --save

npm install cors --save

npm install axios --save

npm install express --save

npm install google --save

npm install bcrypt --save

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://127.0.0.1:3000](http://127.0.0.1:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
