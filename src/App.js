import React from "react";
import "./App.css";
import { ButtonGroup, Button, InputGroup, FormControl } from "react-bootstrap";

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
    };
    // this.startTimer = this.startTimer.bind(this);
    this.timer = setInterval(() => this.startTimer(), props.timeout || 1000);
  }

  startTimer() {
    if (this.state.timerState === "start" && this.state.seconds > 0) {
      setInterval(this.countDown(), 1000);
    } else if (
      this.state.hours == 0 &&
      this.state.minutes == 0 &&
      this.state.seconds == 0
    ) {
      alert("Timer Finished");
    } else {
      console.log("I AM IN THE DEFUALT CASE");
    }
  }

  onSave = (event) => {
    event.preventDefault();
    let enteredVal = this.state.timeInMinutes;
    var hours = Math.floor(enteredVal / 60);
    var minutes = Math.floor(enteredVal - (hours * 3600) / 60);
    var seconds = Math.floor(enteredVal * 60 - hours * 3600 - minutes * 60);
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (seconds == 0) {
      seconds = 60;
    }
    console.log(hours, " : ", minutes, " : ", seconds);
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

  startTime = () => {
    this.setState({ timerState: "start" });
  };

  renderButtonGroup = () => {
    return (
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" onClick={(event) => this.startTime()}>
          Start
        </Button>
        <Button variant="secondary">Stop</Button>
        <Button variant="secondary">Pause</Button>
      </ButtonGroup>
    );
  };

  renderCountDownTimer = () => {
    let hours = this.state.hours;
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    return (
      <div style={{ top: "100px", left: "200px" }}>
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

  countDown = () => {
    let seconds = this.state.seconds - 1;
    let minutes = this.state.minutes;
    let hours = this.state.hours;
    if (seconds == 0) {
      seconds = 60;
      minutes = minutes - 1;
    }
    if (minutes == 0) {
      hours = hours - 1;
    }
    this.setState({
      seconds: seconds,
      minutes: minutes,
      hours: hours,
    });
  };

  render() {
    return <div>{this.renderInputOrTimer()}</div>;
  }
}

export default App;
