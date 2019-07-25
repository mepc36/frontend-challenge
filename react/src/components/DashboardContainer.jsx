import React from 'react';
import PropTypes from 'prop-types';
import DashboardWidget from './DashboardWidget';
import FilterDate from './FilterDate';
import styled from 'styled-components';
import NewWidget from './NewWidget';

const Container = styled.section`
  margin-top: 100px;
  padding-top: 20px;
  margin-left: 50px;
  padding-left: 50px;
`;

class DashboardContainer extends React.Component {

  render() {
    if (this.props.renderMock === false) {
      return (
        <React.Fragment>
          <h1>Promotion Analytics:</h1>
          <FilterDate setDate={this.props.setDate}/>
          <DashboardWidget renderChild={this.props.renderChild} closeWidget={this.props.closeWidget} mostPopularAgreementOnBusiestDay={this.props.mostPopularAgreementOnBusiestDay} mostPopularAgreement={this.props.mostPopularAgreement} setLocation={this.props.setLocation} busiestDay={this.props.busiestDay}/>
          <NewWidget addNewWidget={this.props.addNewWidget}/>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h1>Promotion Analytics:</h1>
          <FilterDate setDate={this.props.setDate}/>
          <DashboardWidget renderChild={this.props.renderChild} closeWidget={this.props.closeWidget} mostPopularAgreementOnBusiestDay={this.props.mostPopularAgreementOnBusiestDay} mostPopularAgreement={this.props.mostPopularAgreement} setLocation={this.props.setLocation} busiestDay={this.props.busiestDay}/>
          <DashboardWidget renderChild={this.props.renderChild} closeWidget={this.props.closeWidget} mostPopularAgreementOnBusiestDay={this.props.mostPopularAgreementOnBusiestDay} mostPopularAgreement={this.props.mostPopularAgreement} setLocation={this.props.setLocation} busiestDay={this.props.busiestDay}/>
          <NewWidget addNewWidget={this.props.addNewWidget}/>
        </React.Fragment>
      );
    }
  }
}

export default DashboardContainer;
