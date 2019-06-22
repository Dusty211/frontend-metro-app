[SimpleAFMetro.com (Back End)](https://github.com/Dusty211/backend-metro-app)

## SimpleAFMetro.com (Front End)
This is the front end for [SimpleAFMetro.com](https://www.simpleafmetro.com) - a web app for the DC Metrorail system. SimpleAFMetro is a single page web application that was designed with mobile use in mind. It is a simple and straightforward way to find the closest Metro station and navigate you there if you so choose. Simplicity and utility were the first priorities when designing this app.

## Features
- Mobile-optimized selectors for starting and ending stations
- Selectable option to sort stations by distance from the user (HTML5 Geolocation)
- It can open the device's native GPS navigation app and route the user to the selected station
- Live arrivals that update and re-render automatically every 30 seconds
- Live Alerts and Incidents
- Trip information including distance, time, and currently applicable fare.

## Motivation for SimpleAFMetro.com
I created this project mainly for two reasons.

First: There were several technologies I thought it would be good to learn more about. I wanted to work on something where I could learn more about making use of a third party API that provides live data. I wanted to use Redux.js to be able to update and render live data to various React.js components. I also wanted to create a project that was designed to be used on mobile devices and use location data.

Second: I wanted to create something that solved a problem. I felt like there wasn't really a simple way to get just the relevant DC Metrorail information I needed and nothing else, so I decided to make it a project of mine.

## Made with:

- [React.js](https://github.com/facebook/create-react-app)
- [React-redux](https://github.com/reduxjs/react-redux)
- [Redux-thunk](https://github.com/reduxjs/redux-thunk)
- [Material-ui](https://github.com/mui-org/material-ui)

## Development Environment Installation
#### Fork and clone the repo.

#### Install all packages with npm:
`$ cd <root dir of clone>`  
`$ npm install`

#### Start the local React dev server:
`$ npm start`

## API Reference

Information on the API can be found here: [SimpleAFMetro.com (Back End)](https://github.com/Dusty211/backend-metro-app)

## Contribute

If you would like to contribute, feel free to submit a pull request or reach me at [personincharge@simpleAFMetro.com](mailto:personincharge@simpleAFMetro.com).

## License
#### The code that is specific to SimpleAFMetro.com and any other elements that are specific to its design are the property of Kyle Houghton and may not be used in any way without his express consent.  
© Kyle Houghton 
