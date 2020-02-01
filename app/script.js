import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: '20:00',
    timer: null,
  };

  count () {
    const test = this.state.time.split(':');

    if( test[1] === '00'){
      test[0]--;
      test[1]=59;
    }
    else test[1]--;

    if( test[1] < 10 ) this.setState({ time: `${test[0]}:0${test[1]}`})
    else this.setState({ time: `${test[0]}:${test[1]}`});
  }

  runTimer () {
    const isZero =  this.state.time === '0:00';
    if(this.state.status === 'work')  {
      if(isZero) {
        this.setState({time: '0:20', status: 'rest'});
      }
      else this.count();
    }

    else if( this.state.status === 'rest' ) {
      if(isZero) {
        this.setState({time: '20:00', status: 'work'});
      }
      else this.count();
    }
  }

  action (type) {
    if( this.state.timer === null){
      setInterval( () => this.runTimer(), 1000);
      this.setState({timer: 'started'});
    };

    if( type === 'start'){
      this.setState({status: 'work'});
    }
    else if( type === 'stop') {
      this.setState({status: 'off'});
    }
    else if( type === 'exit') {
      window.close();
    }
  };

  render() {
    const { status, time } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') &&
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        }
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{time}</div>}
        {(status === 'off') && <button onClick={() => this.action('start')} className="btn">Start</button>}
        {(status !== 'off') && <button onClick={() => this.action('stop')} className="btn">Stop</button>}
        <button onClick={() => this.action('exit')} className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
