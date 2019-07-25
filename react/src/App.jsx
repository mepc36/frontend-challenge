import React from 'react';
import DashboardContainer from './components/DashboardContainer';
import $ from 'jquery';

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
      success: success => {
        console.log(`App.jsx success: ${JSON.stringify(success)}`);
      },
      error: error => {
        console.log(`App.jsx error: ${JSON.stringify(error)}`);
      }
    })
  }

  render() {
    return (
      <div>
        <DashboardContainer example="Coming soon!"/>
      </div>
    )
  }
}

export default App;
