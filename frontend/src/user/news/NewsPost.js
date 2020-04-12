import React,{Component} from 'react'
import './NewsPost.css'
import Image from '../images/placeholder.png'
import { List, Button} from 'antd';
import {getNewsPosts} from '..//..//util/APIUtils'
import LoadingIndicator from '../../common/LoadingIndicator';


const stylez={
   // marginTop:"10px",
    backgroundColor:"#DCDCDC",
    
}


class ListNews extends Component{
    constructor(props){
        super(props);
        this.state = {
            postovi:[]
        }
        this.componentWillMount=this.componentWillMount.bind(this);
    }
    componentWillMount(){
        // this.setState({
        //     postovi:this.props.posts
        // })
        //console.log(this.props.posts)

    }
    componentDidMount(){
       // console.log(this.props.posts)
      //  console.log(this.props.postsFetched)
    }

   
   
    render(){
            if(this.props.postsFetched){
                console.log(this.props.posts[0])
                return (
                    <div>
                    <List
                        style={stylez}
                        itemLayout="horizontal"
                        dataSource={this.props.posts}
                        renderItem = {item =>
                        <List.Item><NewsPost posts = {item}/></List.Item>}
                        />
                    {/* <List>
                        <List.Item><NewsPost posts = {this.props.posts[0]}/></List.Item>
                        <List.Item><NewsPost posts = {this.props.posts[1]}/></List.Item>
                    </List> */}
                    </div>
                )
            }
        return(
            <LoadingIndicator/>
        )
    }

}


class NewsPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:{
                value:''
            },
            content:{
                value:''
            },
            path:{
                value:''
            },
            likes:{
                value:''
            }
        }
    }
    handleOnClick(e){
        e.preventDefault()
       console.log("neso")
    }
    render(){
        return(
            <div className="news-container">
                
                <div className="content-container">
                    <h1 className="news-title" >{this.props.posts.title }</h1>
                    <div className="content">
                        {this.props.posts.content }
                    </div>
                    <img src={Image}  alt="slika"></img>
                    </div>
                    
                    <input className="btn" type="button" value={this.props.posts.likes +  " Likes"}></input>
                    <input className="btn" type="button" value="Comment" onClick={e=>this.handleOnClick(e)}></input>
                    <input className="btn" type="button" value="Share" ></input>
                
            </div>
        )
    }
}

export default ListNews;


