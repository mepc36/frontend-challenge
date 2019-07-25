import React from 'react';

class DashboardWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <form>
          <select onChange={(e) => this.props.setLocation(e)}>
            <option>Select a Location:</option>
            <option value="1">Center City</option>
            <option value="2">Main Line</option>
            <option value="3">Mount Laurel</option>
            <option value="4">Northern Liberties</option>
          </select>
        </form>
        <p>Busiest Day: {this.props.busiestDay}</p>
        <p>Most Popular Agreement: {this.props.mostPopularAgreement}</p>
        <p>Most Popular Agreement on Busiest Day: {this.props.mostPopularAgreementOnBusiestDay}</p>
      </div>
    )
  }
}

export default DashboardWidget;
