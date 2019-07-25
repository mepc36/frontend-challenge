import React from 'react';
import DashboardContainer from './components/DashboardContainer';
import $ from 'jquery';
import moment from 'moment'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busiestDay: '',
      mostPopularPlan: '',
    }
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/locations/1/member-checkins`,
      success: checkinData => {
        var newBusiestDay = this.findBusiestDay(checkinData);
        this.setState({
          busiestDay: newBusiestDay,
        });
      },
      error: error => {
        console.log(`App.jsx error: ${JSON.stringify(error)}`);
      }
    })

    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/locations/1/member-agreements`,
      success: agreementData => {
        var newMostPopularPlan = this.findMostPopularAgreement(agreementData);
        this.setState({
          mostPopularPlan: newMostPopularPlan,
        })
      },
      error: error => {
        console.log(`App.jsx error: ${JSON.stringify(error)}`);
      }
    })
  }

  findBusiestDay(checkinInfo) {
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
      dayCounter[dow]++;
    }

    busiestDayNumber = 0;

    for (var i = 1; i < dayCounter.length; i++) {
      if (dayCounter[i] > dayCounter[busiestDayNumber]) {
        busiestDayNumber = i;
      }
    }
    busiestDayString = numberToDayConverter[busiestDayNumber];
    return busiestDayString;
  }

  findMostPopularAgreement(agreementInfo) {
    var agreementPlanNumber, mostPopularPlanNumber, mostPopularPlanString;
    var numberToAgreementConverter = {
      0: 'Basic',
      1: 'Standard',
      2: 'Platinum',
    }

    var agreementCounter = [0, 0, 0]

    for (var i = 0; i < agreementInfo.length; i++) {
      agreementPlanNumber = agreementInfo[i].agreement - 1;
      agreementCounter[agreementPlanNumber]++;
    }

    mostPopularPlanNumber = 0;
    for (var i = 1; i < agreementCounter.length; i++) {
      if (agreementCounter[i] > agreementCounter[mostPopularPlanNumber]) {
        mostPopularPlanNumber = i;
      }
    }
    mostPopularPlanString = numberToAgreementConverter[mostPopularPlanNumber];
    return mostPopularPlanString;
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
