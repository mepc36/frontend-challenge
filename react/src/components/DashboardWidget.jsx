import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  padding-left: 20px;
  margin: 20px;
  border: '1px solid black';
`;

class DashboardWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    if (this.props.renderChild) {
      return (
        <div style={{border: '1px solid black'}}>
        <Container>
          <div style={{fontSize: '40px'}} onClick={(e) => {this.props.closeWidget(e)}}>X</div>
          <form>
            <select onChange={(e) => this.props.setLocation(e)}>
              <option>Select a Location:</option>
              <option value="1">Center City</option>
              <option value="2">Main Line</option>
              <option value="3">Mount Laurel</option>
              <option value="4">Northern Liberties</option>
            </select>
          </form>
          <p><b>Busiest Day:</b> {this.props.busiestDay}</p>
          <p><b>Most Popular Agreement:</b> {this.props.mostPopularAgreement}</p>
          <p><b>Most Popular Agreement on Busiest Day:</b> {this.props.mostPopularAgreementOnBusiestDay}</p>
        </Container>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default DashboardWidget;
