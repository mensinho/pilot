import React from 'react'
import { createDevTools } from 'redux-devtools' // eslint-disable-line
import LogMonitor from 'redux-devtools-log-monitor' // eslint-disable-line
import DockMonitor from 'redux-devtools-dock-monitor' // eslint-disable-line
import SliderMonitor from 'redux-slider-monitor' // eslint-disable-line
import Inspector from 'redux-devtools-inspector' // eslint-disable-line
import ChartMonitor from 'redux-devtools-chart-monitor' // eslint-disable-line
import Dispatcher from 'redux-devtools-dispatch' // eslint-disable-line
import MultipleMonitors from 'redux-devtools-multiple-monitors' // eslint-disable-line

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    defaultIsVisible
  >
    <MultipleMonitors>
      <LogMonitor theme="tomorrow" />
      <Dispatcher />
    </MultipleMonitors>
    <SliderMonitor keyboardEnabled />
    <Inspector />
    <ChartMonitor />
  </DockMonitor>
)

export default DevTools
