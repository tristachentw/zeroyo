import './page.styl';
import { Component, PropTypes } from 'react';

export default class Page extends Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}
