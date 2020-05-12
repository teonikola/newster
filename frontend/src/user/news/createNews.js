import React, {Component} from 'react'
import { Form, Input, Button, notification, Radio} from 'antd';
import "./createNews.css"
import {createNewsPost}  from '../../util/APIUtils'
import Modal from 'react-awesome-modal'

const FormItem = Form.Item;
const { TextArea } = Input;

class CreateNews extends Component{
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
                value:'path'
            },
            tag:{
                value:'other'
            },
            visible:true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.validateTitle = this.validateTitle.bind(this);
        this.validateContent = this.validateContent.bind(this);
    }
    
    handleInputChange(event,validationFun){
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
       //nsole.log(event.target)
        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)     
            }     
        });  
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.props.currentUser.id)
        const newsPost = {
            title: this.state.title.value,
            content: this.state.content.value,
            path: this.state.path.value,
            tag: this.state.tag.value,
            owner: {
                id:this.props.currentUser.id
            }
            
        };
        createNewsPost(newsPost)
        .then(response => {
            notification.success({
                message: 'Newster',
                description: "Thank you! You're successfully posted on the website!",
            });          
            this.closeModal()
        }).catch(error => {
            if(error.message==="Unexpected end of JSON input"){
                this.props.history.push("/news");
                notification.success({
                    message: 'Newster',
                    description: "Thank you! You're successfully posted on the website!",
            })
        }else{
            notification.error({
                message: 'Newster',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        }
        });
    
    }
    openModal(){
        this.setState({
            visible: this.props.visible
        })
    }
    closeModal() {
        this.setState({
            visible : false
        
        });
        this.props.history.push("/news");
    }


    isFormInvalid() {
        return !(this.state.title.validateStatus === 'success' &&
            this.state.content.validateStatus === 'success' 
            
        );

    }

    render(){
        return(
            <Modal visible={this.state.visible} width="400px" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <div className="create-content">
                <h1>Create your post</h1>
                    <Form onSubmit={this.handleSubmit} className="create-form">
                        <FormItem
                            label = "Title"
                            validateStatus={this.state.title.validateStatus}
                            help={this.state.title.errorMsg}>
                            <Input //style={{textTransform: 'capitalize'}}
                                size = "large"
                                name = "title"
                                autoComplete = "off"
                                placeholder = "Enter title"
                                value = {this.state.title.value} 
                                onChange={(event)=> this.handleInputChange(event,this.validateTitle)}/>
                        </FormItem>
                        <FormItem
                            label = "Text"
                            validateStatus={this.state.content.validateStatus}
                            help={this.state.content.errorMsg}>
                            <TextArea rows={4} 
                                size = "large"
                                name = "content"
                                autoComplete = "off"
                                placeholder = "Enter text"
                                value = {this.state.content.value} 
                                onChange={(event)=> this.handleInputChange(event,this.validateContent)}/>
                        </FormItem>
                        <FormItem>
                        <Radio.Group name="tag" onChange={(event)=> this.handleInputChange(event,this.validateContent)}>
                            <Radio  value="science">Science</Radio>
                            <Radio  value="sports">Sports</Radio>
                            <Radio  value="entertainment">Entertainment</Radio>
                        </Radio.Group>
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                            htmlType="button"
                            size="large">Choose an image</Button>
                        </FormItem>

                        <FormItem>
                            <Button type="primary"
                            htmlType="submit"
                            disabled={this.isFormInvalid()}
                            size="large">Upload post</Button>
                        </FormItem>
                            
                    </Form>
                </div>

            
            </Modal>
        )
        }validateTitle = (title) =>{
        if(title.length === 0){
            return {
                validateStatus: 'error',
                errorMsg: 'The post must have a title!'
            }
        }
        if(title.length >30){
            return {
                validateStatus: 'error',
                errorMsg: 'The title cannot be longer than 30 letters!'
            }
        }else {
            return{
                validateStatus:'success',
                errorMsg:null
            };
        }
    }

    validateContent = (content) =>{
        return{
            validateStatus:'success',
            errorMsg:null
        };
    }
}



export default CreateNews;