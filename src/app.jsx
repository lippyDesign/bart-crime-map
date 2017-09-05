import React from 'react';
import ExampleMap from './ExampleMap';

import '../styles/index.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className='paddingHorizontalTen'>
          <h1>BART Crime Data</h1>
          <p>The data was <span className="redBg">not verified</span>, therefore may not be used as a valid information source.</p>
          <p><span className='colorOrange'>Orange</span> circles represent number of entries and exits.</p>
          <p>Bars represent number of yearly crimes.</p>
          <p className='colorTomato boldText'>Click on the base of each bar (on the <span className='colorOrange'>orange</span> circle) for additional details about each station!!!</p>
          <p>Enjoy!</p>
        </div>
        <div>
          <ExampleMap />
        </div>
      </div>
    )
  }
}
