import React, { Component } from 'react';
import { withHistory } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import LoginContainer from './LoginContainer';
import TableExampleComplex from '../components/SubjectList.jsx';

export default class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = this.getMeteorData();
    this.logout = this.logout.bind(this);
  }

  getMeteorData(){
    return { isAuthenticated: Meteor.userId() !== null };
  }

  componentWillMount(){
    if (!this.state.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.state.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  logout(e){
    e.preventDefault();
    Meteor.logout( (err) => {
        if (err) {
            console.log( err.reason );
        } else {
            this.props.history.push('/login');
        }
    });
    this.props.history.push('/login');
  }

  render() {
    let currentUser = this.props.currentUser;
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    return (
      <MuiThemeProvider>
        <div>
          <nav className="nav-extended">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Project Epsilon</a>
              <div>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li> <a href="#"><LoginContainer />          </a></li>
                  <li> <a href="#" onClick={this.logout}>Logout</a> </li>
                </ul>  
                {this.props.children}
              </div>
            </div>
          </nav>
            <div id="nav-wrapper">
                <TableExampleComplex />
                <Link to="/add_subject">Add subject </Link>
            </div>
        </div>
      </MuiThemeProvider>
    );
  }}