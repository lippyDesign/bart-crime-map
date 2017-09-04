import React, {PureComponent} from 'react';

export default class ControlPanel extends PureComponent {
  render() {

    const { name, address, entries, exits, crimes} = this.props.selectedStation

    const closeButton = <button className='closeButton' onClick={this.props._hideControlPanel}>
      <i className="fa fa-times fa-2x colorTomato" aria-hidden="true"></i>
    </button>;

    const crimesPerYear = crimes.find(crimeYear => crimeYear.year === Number(this.props.selectedYear));
    const { robberies, assault, property } = crimesPerYear;

    return (
      <div className="control-panel">
        <div className="controlPanelInnerWrapper">
          <h3>{name}{closeButton}</h3>
          <p>{address}</p>
          <hr />
          <p>Entries: {entries} <span className='boldText paddingHorizontalTen'>|</span> Exits: {exits}</p>
          <hr />
          <p>{this.props.selectedYear} Total crimes: {robberies + assault + property}</p>
          <p>Robberies: {robberies}</p>
          <p>Assaults: {assault}</p>
          <p>Property: {property}</p>
        </div>
      </div>
    );
  }
}
