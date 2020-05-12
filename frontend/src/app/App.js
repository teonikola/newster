import React, { Component } from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import { getCurrentUser,getNewsPosts,getSportsPosts,
  getPostById,getSciencePosts,getEntertainmentPosts,
  getOtherPosts } from '../util/APIUtils'
import { ACCESS_TOKEN } from '..//constants';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import AppHeader from '../common/AppHeader';
import LoadingIndicator from '../common/LoadingIndicator';
import ListNews from '../user/news/NewsPost'
import Sidebar from '../common/Sidebar'
import { Layout, notification } from 'antd';
import CreateNews from '../user/news/createNews';
import Message from '../user/chat/Chat'
const { Content} = Layout;


const initialState = []

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      posts:[],
      sciencePosts:[],
      sportsPosts:[],
      entertainmetnPosts:[],
      othertPosts:[],
      searchedPosts:[]

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
  
  loadNewsPosts(){
    getNewsPosts().then(
      response=>{response.map((post)=>{
        getPostById(post).then(
          res=> {
            this.setState({
              posts:[...this.state.posts,res]
            })
         })
      })
    })  
  }
  fetchSciencePosts(){
    getSciencePosts().then(
      response=>{response.map((post)=>{
        getPostById(post).then(
          res=>{
              this.setState({
                sciencePosts:[...this.state.sciencePosts,res]
              })
          })
      })
    })
  }
  fetchSportsPosts(){
    getSportsPosts().then(
      response=>{response.map((post)=>{
        getPostById(post).then(
          res=>{
              this.setState({
                sportsPosts:[...this.state.sportsPosts,res]
              })
          }
        )
      })}
    )
  }
  fetchEntertainmentPosts(){
    getEntertainmentPosts().then(
      response=>{response.map((post)=>{
        getPostById(post).then(
          res=>{
              this.setState({
                entertainmetnPosts:[...this.state.entertainmetnPosts,res]
              })
          })
      })
    })
  }
  fetchOtherPosts(){
    getOtherPosts().then(
      response=>{response.map((post)=>{
        getPostById(post).then(
          res=>{
              this.setState({
                othertPosts:[...this.state.othertPosts,res]
              })
          })
      })
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
  }

  componentDidMount() {
    this.loadCurrentUser();
    this.fetchSciencePosts();
    this.fetchSportsPosts();
    this.fetchEntertainmentPosts();
    this.fetchOtherPosts();
    const sorted = this.state.posts.sort((a,b)=>b.createdAt - a.createdAt)
    console.log(sorted)
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

  searchCallback = (searchValue) =>{
    console.log(searchValue)
    this.setState({
      searchedPosts:initialState
    })
    this.state.posts.map((post)=>{
      if(post.title.toLowerCase().includes(searchValue.toLowerCase())){
        this.setState({
          searchedPosts:[...this.state.searchedPosts,post]
        })
      }
    })
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} 
            headerCallback={this.searchCallback}/>
            <Sidebar isAuthenticated={this.state.isAuthenticated}/>
          <Content className="app-content" >
            <div className="container">
              <Switch>      
                
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>

                {/* <Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route> */}


               <Route path="/news" render={(props)=> <ListNews 
                posts = {this.state.posts} 
                currentUser={this.state.currentUser} 
                {...props}/>}></Route>

                <Route path="/newss" render={(props)=> <Message 
                posts = {this.state.posts} 
                currentUser={this.state.currentUser} 
                {...props}/>}></Route>
                
                <Route path = "/createNews" render={(props)=> <CreateNews visible = {true}
                currentUser={this.state.currentUser}  {...props}/>}></Route>
                
                <Route path = "/science" render = {(props)=><ListNews 
                        posts={this.state.sciencePosts}
                        currentUser={this.state.currentUser} 
                        {...props}/>}></Route>

                <Route path = "/sports" render = {(props)=><ListNews 
                        posts={this.state.sportsPosts}
                        currentUser={this.state.currentUser} 
                        {...props}/>}></Route>
                
                <Route path = "/entertainment" render = {(props)=><ListNews 
                        posts={this.state.entertainmetnPosts}
                        currentUser={this.state.currentUser} 
                        {...props}/>}></Route>
                
                <Route path = "/other" render = {(props)=><ListNews 
                        posts={this.state.othertPosts}
                        currentUser={this.state.currentUser} 
                        {...props}/>}></Route>
                <Route path = "/search" render = {(props)=><ListNews 
                        posts={this.state.searchedPosts}
                        currentUser={this.state.currentUser} 
                        {...props}/>}></Route>
              </Switch>
            </div>
           
          </Content>
          
        </Layout>
       
    );
  }
}

export default withRouter(App);
