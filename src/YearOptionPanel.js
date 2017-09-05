import React, { Component } from 'react'

class YearOptionPanel extends Component {
  render() {
    const { years, selectedYear, _yearChanged, _disableMap, _enableMap } = this.props;
    return <div className='yearOptionPanel'>
      <h3>Year: {selectedYear}
        <input
          className='yearInput'
          type="range" value={selectedYear}
          onChange={_yearChanged}
          min={years[0]}
          max={years[years.length - 1]}
          onMouseEnter={_disableMap}
          onMouseLeave={_enableMap}
        />
      </h3>
    </div>
  }
}

export default YearOptionPanel;
