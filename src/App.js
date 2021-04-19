import React, {Component} from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PriceList from './components/PriceList';
import {LIST_VIEW, CHART_VIEW} from './utility';
import ViewTab from './components/ViewTab';

const items = [
  {
    id: 1,
    title: '去云南旅行',
    price: 200,
    date: '2018-09-10',
    category: {
      id: 1,
      name: '旅行',
      type: 'outcome',
      iconName: "ios-plane"
    }
  },
  {
    id: 2,
    title: '去云南旅行',
    price: 400,
    date: '2018-10-10',
    category: {
      id: 1,
      name: '旅行',
      type: 'outcome',
      iconName: "ios-plane"
    }
  }
]

class App extends Component {

  render() {
    return (
      <div className="App">
        <ViewTab 
          activeTab={LIST_VIEW}
          onTabChange={(view) => console.log(view)}
        />
      </div>
    );
  }

}

export default App;
