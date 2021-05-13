import React, { Component } from "react";

class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {
        joke: "joke",
    };
  }
  componentDidMount() {
    if (!navigator.onLine) {
      if (localStorage.getItem("joke") === null)
        this.setState({ joke: "loading..." });
      else this.setState({ joke: localStorage.getItem("joke") });
    }

    fetch("https://api.chucknorris.io/jokes/random")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ joke: res.value });
        this.forceUpdate();
        console.log("fetch "+this.state.joke);
        localStorage.setItem("joke", res.value);
      });
  }

  render() {
    const x  = this.state;
    console.log("render "+x.joke);
    return (
      <div>
          <h1>Joke</h1>
        <p>{x.joke}</p>
      </div>
    );
  }
}

export default Joke;
