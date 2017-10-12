import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  renderJobs(listing) {
    const title = listing.title;

    return (
      <tr key={title}>
        <td>{title}</td>
      </tr>
    );
  }

  render() {
    if (this.props.listing) {
      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>{this.props.listing.map(this.renderJobs)}</tbody>
        </table>
      );
    }
    return <p>Loading</p>;
  }
}

function mapStateToProps(state) {
  return { listing: state.auth.listing };
}

export default connect(mapStateToProps, actions)(Feature);
