import React from 'react';
import { Content } from './components/Content';

import { SideBar } from './components/SideBar';

import './styles/global.scss';

import {MovieProvider} from '../MovieContext';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MovieProvider>
        <SideBar/>
        <Content/>
      </MovieProvider>
    </div>
  )
}