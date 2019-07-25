import React from 'react';
import DashboardContainer from './components/DashboardContainer';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <div>App!</div>
        <DashboardContainer example="Coming soon!"/>
      </div>
    )
  }
}

export default App;
