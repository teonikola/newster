import React,{Component,useState} from 'react'
import './NewsPost.css'
import { Button,Form,Input,Card,Typography, Row, Col} from 'antd';
import Demo from '..//news/comment'
import {addComment,likePost,unlikePost} from '..//..//util/APIUtils'
import Message from '..//chat/Chat'
const { TextArea } = Input;
const { Paragraph,Text } = Typography;

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
    paddingTop:"100px",
    paddingLeft:"400px",
    backgroundColor:"white",
    fontSize:"30px",
    fondFamily:"serif"
}
class ListNews extends Component{
    render(){
            /* user is logged in */
            if(this.props.posts.length===0){
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
            type: (this.props.isLiked[0] ) ? "primary" : "default",
            commentVisibility:"none",
            likes:this.props.post.likes,
            comments:this.props.comments
        }
    }
   
     handleLike=(e)=>{
        e.preventDefault()
        if(this.state.isLikedByCurrentUser){
            this.setState({
                isLikedByCurrentUser:false,
                type:"default",
                likes: this.state.likes-1
            })
              unlikePost(this.props.id,this.props.currentUser)
            
            
        }
        else{
            this.setState({
                isLikedByCurrentUser:true,
                type:"primary",
                likes: this.state.likes+1
            })
             likePost(this.props.id,this.props.currentUser)
           
        }
    }
    toggleLike=(e)=>{
        e.preventDefault()
        if(this.state.type2==="default"){
            this.setState({
                type2:"primary"
            })
        }
        else{
            this.setState({
                type2:"default"
            })
        }
    }
    toggleComment=(e)=>{
        e.preventDefault()
        if(this.state.commentVisibility==="none"){
            this.setState({
                commentVisibility:"block"
            })
        }
        else{
            this.setState({
                commentVisibility:"none"
            })
        }
    }
    commentCallback = (comment) =>{
        this.setState({
            comments:[...this.state.comments,comment]
        })
    }
    render(){ 
        return(  
            <div>
            <Card title = {this.props.post.title}
                  style={{ width: 550 }}>
                    <Text underline>u/{this.props.post.owner.username}  </Text>
                    <br></br><br></br>
                <div><Paragraph ellipsis={{ rows: 4, expandable: true }}>
                    {this.props.post.content}
                    </Paragraph>
                </div><br></br>
                <li >
                    <ul style={buttonStyle}><Button type={this.state.type} onClick={(e)=>this.handleLike(e)}>Like ({this.state.likes})</Button></ul>
                    <ul style={buttonStyle}><Button onClick={(e)=>this.toggleComment(e)}>Comment ({this.state.comments.length})</Button></ul>
                    <ul style={buttonStyle}><Button onClick={()=> window.open("https://www.facebook.com")}>Share</Button></ul>
                </li> 
                <div style={{display:this.state.commentVisibility}}>
                {this.state.comments.map((comment)=> 
                    <Demo key = {comment.id} comment = {comment}/>)}
                <CommentForm 
                post_id={this.props.post.newsPostId} 
                currentUser={this.props.currentUser}
                newsPostCallback={this.commentCallback}/>
                </div>
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
        e.preventDefault()
        const commentPayload = {
            comment: comment,
            newsPost : {
                newsPostId:props.post_id
            },
            user :{
                id:props.currentUser.id
            }
        }
        setComment("")
        props.newsPostCallback(commentPayload)
         addComment(commentPayload)
    }

    return(
        <Form >
            <Form.Item>
                <TextArea 
                rows={4}
                onChange={(e) => handleInputChange(e)}
                value = {comment}  
                />
            </Form.Item>
            <Form.Item>
                <Button onClick={(e)=>handleSubmit(e)}  type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </Form>
    )
}
export default ListNews;