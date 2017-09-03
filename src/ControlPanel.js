import React, {PureComponent} from 'react';

export default class ControlPanel extends PureComponent {
  render() {

    const { name, address, entries, exits, crimes} = this.props.selectedStation

    const closeButton = <button className='closeButton' onClick={this.props._hideControlPanel}>
      <i className="fa fa-times fa-2x colorTomato" aria-hidden="true"></i>
    </button>;

    return (
      <div className="control-panel">
        <div className="controlPanelInnerWrapper">
          <h3>{name}{closeButton}</h3>
          <p>{address}</p>
          <hr />
          <p>Entries: {entries} <span className='boldText paddingHorizontalTen'>|</span> Exits: {exits}</p>
          <hr />
          <p>Total crime in 2016: </p>
        </div>
      </div>
    );
  }
}
