## Installation:

- To allow yourself to install dependencies:
```
npm init
```
- To install the necessary dependencies from package.json:
```
npm install
```
- To start the server controller on port 3000:
```
npm run server
```
- To build the Webpack bundle:
```
npm run start
```
- To see the app, navigate to localhost:8080.

- To run tests:
```
npm run test
```

## Usage

On page splash, a /GET request will be triggered from the App's componentDidMount() life cycle method for the API's information on the location with id = 1. New information is loaded by selecting a new location from the drop down menu, upon which that location's information will be automatically loaded.
Selecting dates and then triggering another information request will filter out any checkin events that didn't occur between those 2 dates.
Clicking on the X will delete the first location widget.

## API:
/locations/:id/member-checkins

Sample Response: 

apiData[0] = {
  memberId: 720,
  date: 2019-07-25T21:26:44Z
}

/locations/:id/member-agreements

Sample Response:

apiData[0] = {
  memberId: 720,
  agreement: 0
}

  ^^^An 'agreement' property with a value of '1' refers to the 'Basic' Plan; an 'agreement' of '2' refers to the 'Standard' plan; and an 'agreement' of 3 refers to the 'Platinum' plan.


## Scalability:

The separation of member data into two differentiated endpoints means that this app will not scale as optimally as it could. Even at this prototype stage of development, there is a noticeable time lag between when the data is requested, and when it's rendered on the front end. It'd be more logical to serve a single JSON object that combines both check-in data and agreement data within a single response. In order to offset this time lag, I strove to make the algorithmic time complexity for assessing that data as linear as possible. However, it proved difficult to do so.

Also, the current way in which the app page is being served is very slow. If it hadn't been pre-configured for me, I would've served the index.html and bundle.js file from the static /dist folder with the app.use(express.static()) method. Even better, I would've used server-side rendering to cut down on the amount of data I'm sending back and forth even more. I'd also use a cache with a least frequently used eviction policy, like Redis, so that the most frequently-accessed location data was more readily availability.

I would support this data set with a SQL database on the back end, like MySQL or Postgres. This is because the data's schema is rather uniform and simple., and validation could be rather straightforward, especially with an ORM like Sequelize. 

## Repo Source:

https://github.com/mepc36/frontend-challenge

## Author
Martin Connor
Full Stack Engineer
267-664-3389
martinedwardconnor@gmail.com
https://www.linkedin.com/in/martin-connor/

## Demo Feedback

I loved this challenge! I think it went very well. I would've preferred to have been able to configure my own webpack and babel, however. My unfamiliarity with this version of webpack prevented me from properly implementing Jest. Thanks for taking a look at my work, hope to hear from you soon!

Best, —Martin Connor