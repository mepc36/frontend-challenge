import React from 'react';
import PropTypes from 'prop-types';
import DashboardWidget from './DashboardWidget';
import FilterDate from './FilterDate';

class DashboardContainer extends React.Component {

  render() {
    return (
      <React.Fragment>
        <h1>Promotion Analytics:</h1>
        <FilterDate setDate={this.props.setDate}/>
        <DashboardWidget mostPopularAgreementOnBusiestDay={this.props.mostPopularAgreementOnBusiestDay} mostPopularAgreement={this.props.mostPopularAgreement} setLocation={this.props.setLocation} busiestDay={this.props.busiestDay}/>
      </React.Fragment>
    );
  }
}

export default DashboardContainer;
