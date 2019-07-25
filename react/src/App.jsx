import React from 'react';
import DashboardContainer from './components/DashboardContainer';
import $ from 'jquery';
import moment from 'moment'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busiestDay: '',
      allCheckinData: [],
      allAgreementData: [],
      mostPopularAgreement: '',
      mostPopularAgreementOnBusiestDay: '',
      locationId: 1,
      fromDate: null,
      toDate: null,
    }
  }

  componentDidMount() {
    this.refreshPagesInfo();
  }

  refreshPagesInfo() {
    const locationId = this.state.locationId
    var checkinPromise = new Promise((resolve, reject) => {
      this.getApiData('member-checkins', locationId, () => {
        resolve();
      });
    })
    var agreementsPromise = new Promise((resolve, reject) => {
      this.getApiData('member-agreements', locationId, () => {
        resolve();
      });
    })
    Promise.all([checkinPromise, agreementsPromise]).then(() => {
      var newMostPopularAgreementOnBusiestDay = this.findMostPopularAgreementOnBusiestDay();
      this.setState({
        mostPopularAgreementOnBusiestDay: newMostPopularAgreementOnBusiestDay,
      })
    })
  }

  getApiData(endpoint, locationId, callback) {
    $.ajax({
      url: `http://localhost:3000/locations/${locationId}/${endpoint}`,
      success: apiData => {
        var filteredDates = [];
        if (endpoint === 'member-checkins') {

          for (var i = 0; i < apiData.length; i++) {
            var fromDate = new Date(this.state.fromDate);
            var toDate = new Date(this.state.toDate);
            var apiDataDate = new Date(apiData[i].date);
            if (moment(apiDataDate).isAfter(fromDate) && moment(apiDataDate).isBefore(toDate)) {
              filteredDates.push(apiData[i])
            }
          }

          var newBusiestDay = this.findBusiestDay(apiData);
          this.setState({
            busiestDay: newBusiestDay,
            allCheckinData: filteredDates,
          });
        } else {
          var newMostPopularAgreement = this.findMostPopularAgreement(apiData);
          this.setState({
            mostPopularAgreement: newMostPopularAgreement,
            allAgreementData: apiData,
          })
        }
        callback();
      },
      error: error => {
        console.log(`App.jsx error: ${JSON.stringify(error)}`);
      }
    })
  }

  findBusiestDay(checkinInfo) {
    var date, dayOfWeek, busiestDayString;
    var busiestDayNumber = 0;
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
      dayOfWeek = date.day();
      dayCounter[dayOfWeek]++;
    }

    for (var i = 1; i < dayCounter.length; i++) {
      if (dayCounter[i] > dayCounter[busiestDayNumber]) {
        busiestDayNumber = i;
      }
    }
    busiestDayString = numberToDayConverter[busiestDayNumber];
    return busiestDayString;
  }

  findMostPopularAgreement(agreementInfo) {
    var agreementNumber, mostPopularAgreementString;
    var mostPopularAgreementNumber = 0;
    var agreementCounter = [0, 0, 0];
    var numberToAgreementConverter = {
      0: 'Basic',
      1: 'Standard',
      2: 'Platinum',
    }

    for (var i = 0; i < agreementInfo.length; i++) {
      agreementNumber = agreementInfo[i].agreement - 1;
      agreementCounter[agreementNumber]++;
    }

    for (var i = 1; i < agreementCounter.length; i++) {
      if (agreementCounter[i] > agreementCounter[mostPopularAgreementNumber]) {
        mostPopularAgreementNumber = i;
      }
    }
    mostPopularAgreementString = numberToAgreementConverter[mostPopularAgreementNumber];
    return mostPopularAgreementString;
  }

  findMostPopularAgreementOnBusiestDay() {
    var mostBusyDay = this.state.busiestDay;
    var checkinData = this.state.allCheckinData;
    var agreementData = this.state.allAgreementData;
    var membersEarliestCheckin = {};
    var membersWhoCheckedInOnEarliestDay = [];
    var date, dayOfWeek, mostPopularAgreementOnBusiestDayNumber, mostPopularAgreementOnBusiestDayString;
    var dayToNumberConverter = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6,
    }
    var numberToAgreementConverter = {
      0: 'Basic',
      1: 'Standard',
      2: 'Platinum',
    }

    var busiestDayAgreementCounter = [0, 0, 0]
    var mostPopularDayNumber = dayToNumberConverter[mostBusyDay];

    for (var i = 0; i < checkinData.length; i++) {
      if (membersEarliestCheckin.hasOwnProperty(checkinData[i].memberId)) {
        membersEarliestCheckin[checkinData[i].memberId].push(checkinData[i].date);
      } else {
        var newDate = [];
        newDate.push(checkinData[i].date);
        membersEarliestCheckin[checkinData[i].memberId] = newDate;
        newDate = [];
      }
    }

    for (var key in membersEarliestCheckin) {
      if (membersEarliestCheckin[key].length > 1) {
        var earliestDate = new Date(membersEarliestCheckin[key][0]);
        for (var i = 1; i < membersEarliestCheckin[key].length; i++) {
          var nextDate = new Date(membersEarliestCheckin[key][i])
          if (moment(nextDate).isBefore(earliestDate)) {
            earliestDate = nextDate;
          }
        }
        var newDates = [];
        newDates.push(earliestDate);
        membersEarliestCheckin[key] = newDates;
      }
    }

    console.log(`membersEarliestCheckin: ${JSON.stringify(membersEarliestCheckin)}`);

    for (var key in membersEarliestCheckin) {
      date = moment(membersEarliestCheckin[key][0]);
      dayOfWeek = date.day();
      if (dayOfWeek === mostPopularDayNumber) {
        membersWhoCheckedInOnEarliestDay.push(key);
      }
    }

    for (var i = 0; i < membersWhoCheckedInOnEarliestDay.length; i++) {
      for (var j = 0; j < agreementData.length; j++) {
        if (membersWhoCheckedInOnEarliestDay[i] === agreementData[j].memberId) {
          busiestDayAgreementCounter[agreementData[j].agreement - 1]++;
        }
      }
    }

    mostPopularAgreementOnBusiestDayNumber = 0
    for (var i = 1; i < busiestDayAgreementCounter; i++) {
      if (busiestDayAgreementCounter[i] > mostPopularAgreementOnBusiestDay) {
        mostPopularAgreementOnBusiestDayNumber = i;
      }
    }

    mostPopularAgreementOnBusiestDayString = numberToAgreementConverter[mostPopularAgreementOnBusiestDayNumber];
    return mostPopularAgreementOnBusiestDayString;
  }

  setLocation(e) {
    e.preventDefault();
    this.setState({
      locationId: parseInt(e.target.value),
    })
    this.refreshPagesInfo();
  }

  setDate(e, fromOrTo) {
    e.preventDefault();
    if (fromOrTo === 'from') {
      this.setState({
        fromDate: new Date(e.target.value).toISOString(),
      });
    } else {
      this.setState({
        toDate: new Date(e.target.value).toISOString(),
      });
    }
  }

  render() {
    return (
      <div>
        <DashboardContainer setDate={this.setDate.bind(this)} mostPopularAgreementOnBusiestDay={this.state.mostPopularAgreementOnBusiestDay} mostPopularAgreement={this.state.mostPopularAgreement} busiestDay={this.state.busiestDay} setLocation={this.setLocation.bind(this)} />
      </div>
    )
  }
}

export default App;
