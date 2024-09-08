import React, { Component } from "react";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { apiRoot } from "../../config/config";
import { courses } from "../../config/ccm";
export default class ScheduleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      course: "MTS101",
      page: 1,
      changeScreen: false,
      limit: 0,
    };
  }
  Submit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiRoot}/setup`, {
        time: this.state.time,
        course: this.state.course,
        limit: this.state.limit,
      })
      .then((res) => {
        if (res.data.set_complete) {
          return swal(
            "Setup complete",
            "Students can now begin exam",
            "success"
          );
        }
      });
  };

  render() {
    return (
      <div
        onClick={() => this.props.close()}
        style={{ backgroundColor: "white" }}
        className="container schedule exam"
      >
        <form onSubmit={this.Submit} className="exam_form">
          <h4 className="mb-4">Setup test or exam</h4>
          <hr />
          <div class="form-group">
            <label>Select course</label>
            <select
              onChange={(e) => this.setState({ course: e.target.value })}
              class="custom-select"
            >
              {courses.map((c) => (
                <option selected value={c.key}>
                  {" "}
                  {c.value}
                </option>
              ))}
            </select>
          </div>
          <div class="form-group my-4">
            <label for="password">Enter time for exam (in minutes)</label>
            <input
              onChange={(e) => this.setState({ time: e.target.value })}
              type="number"
              class="form-control"
              id="password"
            />
          </div>
          <div class="form-group my-4">
            <label for="password">Enter question limit</label>
            <input
              onChange={(e) => this.setState({ limit: e.target.value })}
              type="number"
              class="form-control"
              id="password"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Setup{" "}
          </button>
        </form>
      </div>
    );
  }
}
