import React, { Component } from "react";
import "./home.css";
import OngoingLecture from "./ongoingLecture";
import UpcomingLecture from "./upcomingLecture";
import PastLecture from "./pastLecture";
import CarouselContainer from "./highlights";
import axios from "axios";
import CountBox from "./count";
import Approval_section from "./approval_section";
import {
  Navbar,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Home extends Component {
  state = {
    type: "user",
    section: 1,
  };
  constructor() {
    super();
    this.getdata();
  }

  async getdata() {
    await axios
      .post(`https://aglm.herokuapp.com/`, {
        uid: localStorage.getItem("userID"),
      })
      .then((res) => {
        console.log(res.data.type);
        this.setState({ type:  res.data.type  });
      });
  }

  my() {
    this.setState({ section: 2 });
  }

  all() {
    this.setState({ section: 1 });
  }

  approve() {
    this.setState({ section: 3 });
  }

  create() {
    this.setState({ section: 4 });
    this.props.history.push("/lecture-create");
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundImage: `url("https://wallpaperaccess.com/full/692084.png")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <CarouselContainer />
          <CountBox />
        </div>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                style={{
                  color: this.state.section === 1 ? "yellow" : "white",
                  cursor: "pointer",
                  "&:hover": { background: "#efefef" },
                }}
                onClick={this.all.bind(this)}
              >
                Home
              </a>
            </li>
            {(this.state.type==="manager")?
            <div></div>
            :
            <li className="nav-item">
              <a
                className="nav-link"
                style={{
                  color: this.state.section === 2 ? "yellow" : "white",
                  cursor: "pointer",
                }}
                onClick={this.my.bind(this)}
              >
                My Registrations
              </a>
            </li>
            }
            {(this.state.type!=="manager")?
            <div></div>
            :
            <li className="nav-item">
              <a
                className="nav-link"
                style={{
                  color: this.state.section === 3 ? "yellow" : "white",
                  cursor: "pointer",
                }}
                onClick={this.approve.bind(this)}
              >
                Sign-in Approvals
              </a>
            </li>
              }
              {(this.state.type!=="manager")?
            <div></div>
            :
            <li className="nav-item">
              <a
                className="nav-link"
                style={{
                  color: this.state.section === 4 ? "yellow" : "white",
                  cursor: "pointer",
                }}
                onClick={this.create.bind(this)}
              >
                Create Lecture
              </a>
            </li>
  }
          </ul>
        </Navbar>
        <br />
        {this.state.section === 1 ? (
          <>
            <OngoingLecture all={true} setDataLecture={(e)=>this.props.setDataLecture(e,1)}/>
            <UpcomingLecture all={true} setDataLecture={(e)=>this.props.setDataLecture(e,2)}/>
            <PastLecture all={true} setDataLecture={(e)=>this.props.setDataLecture(e,3)}/>
          </>
        ) : this.state.section === 2 ? (
          <>
            <UpcomingLecture all={false} setDataLecture={(e)=>this.props.setDataLecture(e,2)}/>
            <OngoingLecture all={false} setDataLecture={(e)=>this.props.setDataLecture(e,1)}/>
            <div></div>
            <PastLecture all={false} setDataLecture={(e)=>this.props.setDataLecture(e,3)}/>
          </>
        ) : (
          <Approval_section />
        )}
      </div>
    );
  }
}

export default withRouter(Home);

/*



*/