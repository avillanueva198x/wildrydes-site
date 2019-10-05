import React, { Component } from 'react';
import valuesService from './services/valuesService';

class Values extends Component {
  state = {
    values: []
  };

  async componentDidMount() {
    const { data: values } = await valuesService.getValues();
    this.setState({ values });
  }

  render() {
    const { values } = this.state;

    return (
      <div>
        <h1>Values List</h1>
        {values.map(item => (
          <p key={item.id}>
            id: {item.id} value: {item.name}
          </p>
        ))}
      </div>
    );
  }
}

export default Values;
