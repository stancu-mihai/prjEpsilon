import React, { Component } from 'react';
import { withHistory } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';

import MainContainer from './MainContainer.jsx';

import TableExampleComplex from '../SubjectList.jsx';
import AppBarExampleComposition from '../AppBar.jsx';

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

  render(){
    return (//MuiThemeProvider expects only one child element
      <MuiThemeProvider>
        <div>
          <div>
            <div id="AppBar">
                <AppBarExampleComposition/>
            </div>
            <div id="SubjectList">
                <Link to="/add_subject">Add subject </Link>
                <TableExampleComplex />
            </div>
          </div>
           <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
               <div className="navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href="#" onClick={this.logout}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav> 
          <MainContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}
