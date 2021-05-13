import React, { Component } from "react";

class Superheroes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      superheroes: [],
    };
  }
  componentDidMount() {
    if (!navigator.onLine) {
      if (localStorage.getItem("superheroes") === null)
        this.setState({ superheroes: ["loading..."] });
      else this.setState({ superheroes: JSON.parse(localStorage.getItem("superheroes")) });
    }

    fetch("https://gateway.marvel.com/v1/public/characters?ts=1&apikey=65e729c6327e41c991b277de10fbf198&hash=dc353756280fe3fbef02cfddfc773324")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ superheroes: res.data.results });
        this.forceUpdate();
        localStorage.setItem("superheroes", JSON.stringify(res.data.results));
      });
  }

  render() {
    const x = this.state;
    return (
      <div>
          <h1>Superheroes</h1>
          {x.superheroes.map((superheroe)=>
          <p>Nombre: {superheroe.name}</p>)}
      </div>
    );
  }
}

export default Superheroes;
