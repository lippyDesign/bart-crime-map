import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import DeckGL, { ScatterplotLayer } from 'deck.gl';
import anime from 'animejs'

import ControlPanel from './ControlPanel';
import YearOptionPanel from './YearOptionPanel';
import BartOverlay from './BartOverlay';

import bartStations from './bart-station.json';

// mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoibnVtYmVyMWljZSIsImEiOiJjajZ6cTMwd3Qwc3VuMzJwbm9ibm43cXBmIn0.lqMeYXEV6KE183Nq1HCU3Q';

export default class App extends Component {

  state = {
    viewport: {
      latitude: 37.785164,
      longitude: -122.41669,
      zoom: 12,
      bearing: -20.55991,
      pitch: 60,
      width: window.innerWidth,
      height: window.innerHeight
    },
    settings: {
      dragPan: true,
      dragRotate: true,
      scrollZoom: true,
      touchZoomRotate: true,
      doubleClickZoom: true,
      minZoom: 0,
      maxZoom: 20,
      minPitch: 0,
      maxPitch: 85
    },
    selectedStation: null,
    years: [],
    selectedYear: Number((new Date()).getFullYear()) - 1 // previous year is default
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
    // find out the values (years) for the input range and set them into component levele state
    this._getInputRange()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _onViewportChange = viewport => this.setState({viewport});

  _onSettingChange = (name, value) => this.setState({
    settings: {...this.state.settings, [name]: value}
  });

  _hideControlPanel = () => this._controlPanelAnimation('close')

  _controlPanelAnimation = motion => {
    const obj = motion === 'close' ? { width: '0', height: '0', opacity: '0', right: '-370' } : { width: '340', height: '400', opacity: '1', right: '0' };
    anime({
      targets: document.querySelector('.control-panel'),
      width: {
        value: obj.width,
        duration: 250,
        easing: 'easeInOutSine'
      },
      height: {
        value: obj.height,
        duration: 250,
        easing: 'easeInOutSine'
      },
      right: {
        value: obj.right,
        duration: 250,
        easing: 'easeInOutSine'
      },
      opacity: {
        value: obj.opacity,
        duration: 250,
        easing: 'easeInOutSine'
      }
    });
  }

  _renderControlPanel() {
    const { selectedStation, selectedYear } = this.state;
    return selectedStation ? <ControlPanel selectedYear={selectedYear} selectedStation={selectedStation} _hideControlPanel={this._hideControlPanel} /> : null;
  }

  _stationClicked = station => {
    this.setState({ selectedStation: station.object });
    this._controlPanelAnimation('open');
  }

  _getInputRange = () => {
    let years = [];
    bartStations.forEach(station => {
      station.crimes.forEach(crime => {
        if (years.indexOf(crime.year) === -1) {
          years.push(crime.year)
        }
      });
    });
    years = years.sort((a, b) => a - b)
    this.setState({ years });
  }

  _yearChanged = event => {
    this.setState({ selectedYear: event.target.value });
  }
  // disables the map drag
  _disableMap = () => this.setState({ settings: { ...this.state.settings, dragPan: false } })
  // enables the map drag
  _enableMap = () => this.setState({ settings: { ...this.state.settings, dragPan: true } })

  render() {
    const { viewport, settings, years, selectedYear } = this.state;

    const layer = new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: bartStations,
      getPosition: e => e.coordinates,
      getColor: e => [255,140,0],
      getRadius: e => {
        return Math.sqrt(Number(e.entries) + Number(e.exits))
      },
      pickable: true,
      onClick: e => this._stationClicked(e),
      className: 'station'
    });

    return <MapGL
      {...viewport}
      {...settings}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={this._onViewportChange}
      mapboxApiAccessToken={MAPBOX_TOKEN} >
      {/* <BartOverlay
        viewport={viewport}
        data={bartStations.coordinates || []}
      /> */}

      <DeckGL radiusMinPixels={75} {...viewport} layers={[layer]} />
      {this._renderControlPanel()}
      <YearOptionPanel
        selectedYear={selectedYear}
        years={years}
        _yearChanged={this._yearChanged}
        _disableMap={this._disableMap}
        _enableMap={this._enableMap}
      />
    </MapGL>
  }
}