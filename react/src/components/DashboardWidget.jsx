import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  padding-left: 20px;
  margin: 20px;
`;

class DashboardWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div style={{border: '1px solid black'}}>
      <Container>
        <div style={{fontSize: '40px'}}>X</div>
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
      </Container>
      </div>
    )
  }
}

export default DashboardWidget;
