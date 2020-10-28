import React from "react";
import "./App.css";
import {
  ProgressBar,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInMinutes: -1,
      showInput: true,
      hours: 0,
      minutes: 0,
      seconds: 60,
      timerState: "",
      timeRemaining: 0,
    };
    this.timer = setInterval(() => this.startTimer(), props.timeout || 1000);
  }

  startTimer() {
    if (this.state.timerState === "start" && this.state.seconds > 0) {
      setInterval(this.countDown(), 1000);
    } else if (
      this.state.hours == 0 &&
      this.state.minutes == 0 &&
      this.state.seconds == 0 &&
      this.state.showInput == false
    ) {
      alert("Timer Finished");
    }
  }

  onSave = (event) => {
    event.preventDefault();
    let enteredVal = this.state.timeInMinutes;
    var hours = Math.floor(enteredVal / 60);
    var minutes = Math.floor(enteredVal - (hours * 3600) / 60);
    var seconds = Math.floor(enteredVal * 60 - hours * 3600 - minutes * 60);
    // if (hours < 10) {
    //   hours = "0" + hours;
    // }
    // if (minutes < 10) {
    //   minutes = "0" + minutes;
    // }
    // if (seconds < 10) {
    //   seconds = "0" + seconds;
    // }
    // console.log(this.state.timeRemaining * 60, "DDDDDDDDDDDDDDDDDDD");
    if (hours == 0) {
      if ((hours == 0) & (minutes == 0)) {
        hours = 0;
        minutes = 59;
      } else {
        hours = 0;
      }
    }
    if (seconds == 0) {
      seconds = 60;
      if (minutes == 0) {
        minutes = 0;
      } else {
        minutes = minutes - 1;
      }
    }
    if (minutes == 0) {
      minutes = 0;
    }
    this.setState({
      showInput: false,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
  };

  handleChange = (event) => {
    event.preventDefault();
    let enteredValue = event.target.value;
    this.setState({ timeInMinutes: enteredValue });
  };

  renderInputForTimer = () => {
    return (
      <InputGroup className="mb-3 inputClass">
        <InputGroup.Prepend>
          <Button
            variant="outline-secondary"
            onClick={(event) => this.onSave(event)}
          >
            Submit
          </Button>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Time in minutes ..."
          aria-label="timeInMinutes"
          aria-describedby="basic-addon1"
          onChange={(event) => this.handleChange(event)}
        />
      </InputGroup>
    );
  };

  startTime = (event) => {
    event.preventDefault();
    this.setState({ timerState: "start" });
  };

  stopTimer = (event) => {
    event.preventDefault();
    this.setState({
      timerState: "stop",
      hours: 0,
      minutes: 0,
      seconds: 0,
      showInput: true,
    });
  };

  pauseTimer = (event) => {
    event.preventDefault();
    this.setState({ timerState: "pause" });
  };

  renderButtonGroup = () => {
    return (
      <ButtonGroup aria-label="Basic example" className="buttonGroupClass">
        <Button variant="secondary" onClick={(event) => this.startTime(event)}>
          Start
        </Button>
        <Button variant="secondary" onClick={(event) => this.stopTimer(event)}>
          Stop
        </Button>
        <Button variant="secondary" onClick={(event) => this.pauseTimer(event)}>
          Pause
        </Button>
      </ButtonGroup>
    );
  };

  renderCountDownTimer = () => {
    let hours = this.state.hours;
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    return (
      <div className="timerClass">
        <h1>
          {hours} : {minutes} : {seconds}
        </h1>
        <br />
        {this.renderButtonGroup()}
      </div>
    );
  };

  renderInputOrTimer = () => {
    let showInput = this.state.showInput;
    if (showInput === true) {
      return <div>{this.renderInputForTimer()}</div>;
    } else {
      return <div> {this.renderCountDownTimer()} </div>;
    }
  };

  calculatePercentageofTimeRemaining = (hours, minutes, seconds) => {
    let timeLeftInSeconds = 0;
    let totalTimeInSeconds = this.state.timeInMinutes * 60;
    // console.log(totalTimeInSeconds, "FFFFFFFFFFFFFF");
    timeLeftInSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    let percentage = ((timeLeftInSeconds / totalTimeInSeconds) * 100).toFixed(
      1
    );
    return percentage;
  };

  countDown = () => {
    let seconds = this.state.seconds - 1;
    let minutes = this.state.minutes;
    let hours = this.state.hours;
    if (hours == 0) {
      if (hours == 0 && minutes == 0) {
        hours = 0;
        // minutes = 59;
      } else {
        hours = 0;
      }
    }
    if (seconds == 0) {
      seconds = 60;
      if (minutes == 0) {
        minutes = 0;
      } else {
        minutes = minutes - 1;
      }
    }
    if (minutes == 0) {
      if (hours == 0) {
        hours = 0;
      } else {
        hours = hours - 1;
      }
    }

    let timeLeftInSeconds = this.calculatePercentageofTimeRemaining(
      hours,
      minutes,
      seconds
    );
    this.setState({
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      timeRemaining: timeLeftInSeconds,
    });
  };

  renderProgressBar = () => {
    let percentage = this.state.timeRemaining;
    console.log(percentage, "PPPPPPPP");
    if (this.state.showInput) {
      return "";
    } else {
      return (
        <ProgressBar
          className="progressBar"
          now={percentage}
          label={percentage + "%"}
        />
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderInputOrTimer()}
        {this.renderProgressBar()}
      </div>
    );
  }
}

export default App;
