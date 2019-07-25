import React from 'react';
import DashboardContainer from './components/DashboardContainer';
import $ from 'jquery';
import moment from 'moment'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/locations/1/member-checkins`,
      success: checkinData => {
        // console.log(`App.jsx success: ${JSON.stringify(checkinData[0])}`);
        var busiestDay = this.calculateBusiestDay(checkinData);
        console.log(`busiestDay: ${busiestDay}`);
      },
      error: error => {
        console.log(`App.jsx error: ${JSON.stringify(error)}`);
      }
    })
  }

  calculateBusiestDay(checkinInfo) {
    var date, dow, busiestDayString, busiestDayNumber;
    var dayCounter = [0, 0, 0, 0, 0, 0, 0];
    var numberToDayConverter = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    }

    for (var i = 0; i < checkinInfo.length; i++) {
      date = moment(checkinInfo[i].date);
      dow = date.day();
      dayCounter[dow] += 1;
    }

    busiestDayNumber = 0;

    for (var i = 1; i < dayCounter.length - 1; i++) {
      if (dayCounter[i] > dayCounter[busiestDayNumber]) {
        busiestDayNumber = i;
      }
    }
    busiestDayString = numberToDayConverter[busiestDayNumber];
    return busiestDayString;
  }

  render() {
    return (
      <div>
        <DashboardContainer example="Coming soon!" />
      </div>
    )
  }
}

export default App;
