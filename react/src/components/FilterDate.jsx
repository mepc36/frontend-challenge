import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  padding-left: 20px;
  margin: 20px;
  border: '1px solid black';
`;

class FilterDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Container>
      <div>
        <h4>Filter Date:</h4>
        <form onChange={(e) => this.props.setDate(e, 'from')}>
          <input type="date"></input> to  
        </form>
        <form onChange={(e) => this.props.setDate(e, 'to')}>
          <input type="date"></input>
        </form>
      </div>
      </Container>
    )
  }
}

export default FilterDate;
