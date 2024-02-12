import React from "react";
import "../styles.css";
import { Link } from "react-router-dom";

class UseDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
    };
  }

  addItem(todoValue) {
    if (todoValue !== "") {
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false,
      };
      const list = [...this.state.list];
      list.push(newItem);

      this.setState({
        list,
        newItem: "",
      });
    }
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedlist = list.filter((item) => item.id !== id);
    this.setState({ list: updatedlist });
  }

  updateInput(input) {
    this.setState({ newItem: input });
  }

  render() {
    return (
      <div>
        <div>
           <h1>Welcome User</h1>
           <button className="u-btn"> <Link to="/signin">
            </Link>SignOut</button>

        </div>

        <h1 className="app-title"> URL Shortener</h1>
        <div className="container">
          Paste the URL to be shortened
          <br />
          <input
            type="text"
            className="input-text"
            placeholder="Enter the Link here"
            required
            value={this.state.newItem}
            onChange={(e) => this.updateInput(e.target.value)}
          />
          <button
            className="add-btn"
          >
            Shorten URL
          </button>
          <div className="list">

          </div>
        </div>
      </div>
    );
  }
}

export default UseDashBoard;
