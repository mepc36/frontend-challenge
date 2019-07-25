import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  width: 500px;
  height: 130px;
  text-align: center;
  padding-top: 90px;
  margin-top: 20px;
`;

class NewWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Container style={{border: '1px solid black'}}>
        <div onClick={(e) => this.props.addNewWidget(e)}>Add a new location!</div>
      </Container>
    )
  }
}

export default NewWidget;
