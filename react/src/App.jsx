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
    }
  }

  componentDidMount() {
    const randomId = Math.round(Math.random() * 4) + 1;
    var checkinPromise = new Promise ((resolve, reject) => {
      this.getApiData('member-checkins', randomId, () => {
        resolve();
      });
    })
    var agreementsPromise = new Promise ((resolve, reject) => {
      this.getApiData('member-agreements', randomId, () => {
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
        if (endpoint === 'member-checkins') {
          var newBusiestDay = this.findBusiestDay(apiData);
          this.setState({
            busiestDay: newBusiestDay,
            allCheckinData: apiData,
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
    var membersWithMultipleCheckinsDates = [];
    var oneMembersCheckins = [];
    var allCheckInsOnBusiestDay = [];
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
    
    // Find members with multiple check ins:
    // var memberIds = {};
    // for (var i = 0; i < checkinData.length; i++) {
    //   if (memberIds.hasOwnProperty(checkinData[i].memberId) === true) {
    //     memberIds[checkinData[i].memberId]++;
    //   } else {
    //     memberIds[checkinData[i].memberId] = 1;
    //   }
    // }

    // // Get the dates of members with multiple check ins;
    // for (var key in memberIds) {
    //   if (memberIds[key] > 1) {
    //     for (var i = 0; i < checkinData.length; i++) {
    //       if (checkinData[i].memberId === parseInt(key)) {
    //         membersWithMultipleCheckinsDates.push(checkinData[i]);
    //       }
    //     }
    //   }
    // }
    // console.log(membersWithMultipleCheckinsDates);

    // // Find each member's earliest check in:
    // for (var i = 0; i < membersWithMultipleCheckinsDates.length; i++) {
    //   for (var j = 1; j < membersWithMultipleCheckinsDates.length; j++) {
    //     if (membersWithMultipleCheckinsDates[i].memberId === membersWithMultipleCheckinsDates[j].memberId) {
    //       oneMembersCheckinsDates.push(membersWithMultipleCheckinsDates[i]);
    //       oneMembersCheckinsDates.push(membersWithMultipleCheckinsDates[j]);
    //     }

    //   }
    // }


    // Find all check-ins that happened on my most popular day:
    for (var i = 0; i < checkinData.length; i++) {
      date = moment(checkinData[i].date);
      dayOfWeek = date.day();
      if (dayOfWeek === mostPopularDayNumber) {
        allCheckInsOnBusiestDay.push(checkinData[i]);
      }
    }



    // Count up how many times each plan was signed up for on the busiest day:
    for (var i = 0; i < allCheckInsOnBusiestDay.length; i++) {
      for (var j = 0; j < agreementData.length; j++) {
          if (allCheckInsOnBusiestDay[i].memberId === agreementData[j].memberId) {
            busiestDayAgreementCounter[agreementData[j].agreement - 1]++;
          }
      }
    }

    // Identify the most popular plan by number:
    mostPopularAgreementOnBusiestDayNumber = 0
    for (var i = 1; i < busiestDayAgreementCounter; i++) {
      if (busiestDayAgreementCounter[i] > mostPopularAgreementOnBusiestDay) {
        mostPopularAgreementOnBusiestDayNumber = i;
      }
    }

    // Convert that number to a string:
    mostPopularAgreementOnBusiestDayString = numberToAgreementConverter[mostPopularAgreementOnBusiestDayNumber];
    return mostPopularAgreementOnBusiestDayString;
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
