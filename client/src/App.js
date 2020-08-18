import React from "react";
import axios from "axios";
import { saveAs } from "file-saver";

class App extends React.Component {
  state = {
    name: "",
    recieptID: 0,
    price1: 0,
    price2: 0,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  createAndDowloadPdf = () => {
    console.log("hello");

    axios
      .post("/create-pdf", this.state)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "report.pdf");
      });
  };

  render() {
    return (
      <div className="App">
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={this.handleChange}
        />
        <br /> <br />
        <input
          type="number"
          placeholder="Reciept ID"
          name="recieptID"
          onChange={this.handleChange}
        />{" "}
        <br /> <br />
        <input
          type="number"
          placeholder="Price 1"
          name="price1"
          onChange={this.handleChange}
        />{" "}
        <br />
        <br />
        <input
          type="number"
          placeholder="Price 2"
          name="price2"
          onChange={this.handleChange}
        />{" "}
        <br /> <br />
        <button onClick={this.createAndDowloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default App;
