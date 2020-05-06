import React,{Component,useState} from 'react'
import './NewsPost.css'
import Image from '../images/placeholder.png'
import { Button,Form,Input,Card} from 'antd';
import LoadingIndicator from '../../common/LoadingIndicator';
import Demo from '..//news/comment'
import {addComment} from '..//..//util/APIUtils'
const { TextArea } = Input;

const listStyle={
    backgroundColor:"#DCDCDC",
    marginTop:"65px",
    marginLeft:"0px" ,
    width:"550px"   
}

class ListNews extends Component{
    render(){
            if(this.props.postsFetched){
                return (
                    <div style = {listStyle}>
                        {this.props.posts.map((post) => 
                        <NewsPost 
                            key={post.id}
                            post={post} 
                            comments={post.comments} 
                            id={post.id} 
                            currentUser={this.props.currentUser}/>
                        )}  
                    </div>
                )
            }
        return(
            <LoadingIndicator/>
        )
    }
}

class NewsPost extends Component{
    render(){ 
        return(   
            <div>
            <Card title = {this.props.post.title}
                  style={{ width: 550 }}>
                <div>{this.props.post.content}</div><br></br>
                <div><img src={Image}  alt="slika"></img></div><br></br>
                <Button >Comment</Button>
                {this.props.comments.map((comment)=>
                    <Demo key = {comment.id} comment = {comment}/>)}
                <CommentForm post_id={this.props.post.id} currentUser={this.props.currentUser}/>
             </Card>
             </div>
        )
    }
}


// TODO: functionality to add a comment 
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