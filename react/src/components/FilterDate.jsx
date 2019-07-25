import React from 'react';

class FilterDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h4>Filter Date:</h4>
        <form onChange={(e) => this.props.setDate(e, 'from')}>
          <input type="date"></input> to  
        </form>
        <form onChange={(e) => this.props.setDate(e, 'to')}>
          <input type="date"></input>
        </form>
      </div>
    )
  }
}

export default FilterDate;
