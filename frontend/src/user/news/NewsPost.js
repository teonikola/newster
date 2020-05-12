import React,{Component,useState} from 'react'
import './NewsPost.css'
import Image from '../images/placeholder.png'
import { Button,Form,Input,Card,Typography, Row, Col} from 'antd';
//import LoadingIndicator from '../../common/LoadingIndicator';
import Demo from '..//news/comment'
import {addComment,likePost,unlikePost} from '..//..//util/APIUtils'
import Message from '..//chat/Chat'
const { TextArea } = Input;
const { Paragraph } = Typography;

const listStyle={
    backgroundColor:"#DCDCDC",
    marginTop:"45px",
    marginLeft:"300px" ,
    width:"550px"   
}
const buttonStyle={
    display:"inline-block"
}
const noPostsStyle={
    paddingTop:"300px",
    paddingLeft:"300px"
}
class ListNews extends Component{
    render(){
            /* user is logged in */
            if(this.props.posts===null){
                return(
                    <div style={noPostsStyle}>There aren't any post.Please create!</div>
                )
            }
                else{
                return (
                    <div style = {listStyle}>
                        <Row>
                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset:0 }}>
                            
                            
                                                    
                        {this.props.posts.map((post) => 
                        <NewsPost 
                            key={post.newsPostId}
                            post={post} 
                            comments={post.comments} 
                            id={post.newsPostId} 
                            currentUser={this.props.currentUser}
                            isLiked = {post.likedByUsers.map((user)=>{
                                if(user.id===this.props.currentUser.id)
                                    return true;
                                if(user===this.props.currentUser.id)
                                    return true;
                                else return false;
                                }
                                )}
                            /> 
                        )}
                        
                        </Col>
                            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 10,push:15}}>
                            <Message/>
                            </Col>
                        
                        </Row>
                    </div>
                )
            }
         
    }
}

class NewsPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLikedByCurrentUser:this.props.isLiked[0],
            type: (this.props.isLiked[0] ) ? "primary" : "default" 
        }
        //this.handleLike = this.handleLike().bind(this);
    }
     handleLike(e){
        e.preventDefault()
        console.log(this.state.isLikedByCurrentUser)
        if(this.state.isLikedByCurrentUser){
              unlikePost(this.props.id,this.props.currentUser)
            .then(response =>{
                console.log(response)
               this.setState({
                   isLikedByCurrentUser:false
               })
            })
        }
        else{
             likePost(this.props.id,this.props.currentUser)
            .then(response =>{
                console.log(response)
                this.setState({
                    isLikedByCurrentUser:true
                })
            })
        }
        console.log(this.state.isLikedByCurrentUser)
    }
    render(){ 
        return(  
            <div>
            <Card title = {this.props.post.title}
                  style={{ width: 550 }}>
                <div><Paragraph ellipsis={{ rows: 2, expandable: true }}>
                    {this.props.post.content}
                    </Paragraph>
                </div><br></br>
                <div><img src={Image}  alt="slika"></img></div><br></br>
                <li >
                    <ul style={buttonStyle}><Button type={this.state.type} onClick={e=>this.handleLike(e)}>Like ({this.props.post.likes})</Button></ul>
                    <ul style={buttonStyle}><Button >Comment</Button></ul>
                    <ul style={buttonStyle}><Button >Share</Button></ul>
                </li> 
                {this.props.comments.map((comment)=> 
                    <Demo key = {comment.id} comment = {comment}/>)}
                <CommentForm post_id={this.props.post.newsPostId} currentUser={this.props.currentUser}/>
             </Card>
             </div>
        )
    }
}

 
const CommentForm = (props) => {
    const [comment, setComment] = useState(0);
    

    const handleInputChange = (e)=>{
        const target = e.target;
        setComment(target.value)
    }
    const handleSubmit = (e)=>{
       // e.preventDefault()
        const commentPayload = {
            comment: comment,
            newsPost : {
                id:props.post_id
            },
            user :{
                id:props.currentUser.id
            }
        }
       
         addComment(commentPayload)
         .then(response => {
           console.log(response)
         })
         console.log(props.currentUser)
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Item>
                <TextArea 
                rows={4}
                onChange={(e) => handleInputChange(e)}  
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit"  type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </Form>
    )
}
export default ListNews;