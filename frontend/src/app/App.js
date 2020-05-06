import React, { Component } from 'react';
import './App.css';
import {Route,
        Switch
} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import { getCurrentUser,getNewsPosts,getComments } from '../util/APIUtils'
import { ACCESS_TOKEN } from '..//constants';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import AppHeader from '../common/AppHeader';
import LoadingIndicator from '../common/LoadingIndicator';
import ListNews from '../user/news/NewsPost'
import Sidebar from '../common/Sidebar'
import { Layout, notification } from 'antd';
import CreateNews from '../user/news/createNews';
const { Content,Sider } = Layout;




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      postsFetched: false,
      posts:[],
      comments:[]
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.componentWillMount=this.componentWillMount.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }
  loadComments(){
    getComments().then(response=>{
      this.setState({
        comments:response
      })
     //  console.log(response[0]);
    })
  }
  loadNewsPosts(){
    // get method getAllNewsPosts()
    getNewsPosts()
    .then(response=>{
      this.setState({
        posts:response,
        postsFetched: true
      })
      console.log(response)
    })
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentWillMount(){
    this.loadNewsPosts();
    this.loadComments();
    // console.log(this.state.postsFetched)
    // console.log(this.state.posts)
  }
  componentDidMount() {
    this.loadCurrentUser();
    
   // console.log(this.state.posts)
   // this.loadNewsPosts();
   
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Newster',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Newster',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/news");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />
            <Sidebar/>
          <Content className="app-content" >
            <div className="container">
              <Switch>      
                {/* <Route exact path="/" 
                  render={(props) => <PollList isAuthenticated={this.state.isAuthenticated} 
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route> */}
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                {/* <Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route> */}


               <Route path="/news" render={(props)=> <ListNews comments = {this.state.comments}
                postsFetched = {this.state.postsFetched} 
                posts = {this.state.posts} 
                currentUser={this.state.currentUser} 
                {...props}/>}></Route>
                <Route path = "/createNews" render={(props)=> <CreateNews visible = {true} {...props}/>}></Route>
              </Switch>
            </div>
           
          </Content>
              <Sider >
              </Sider>
          
        </Layout>
       
    );
  }
}

export default withRouter(App);
