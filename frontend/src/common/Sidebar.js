import React ,{Component} from 'react'
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom'


const {Sider} = Layout;

class Sidebar extends Component{
    render(){
      if(this.props.isAuthenticated){
        return(
            <Layout>
                <Sider
                  style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top:65
                  }}
                >
                  <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                      <Menu.Item key="1">
                      
                        <span className="nav-text">New</span>
                      </Menu.Item>
                      <Menu.Item key="2">
                        
                        <span className="nav-text">Top</span>
                      </Menu.Item>
                      <Menu.Item key="3">
                        
                        <span className="nav-text"><br></br></span>
                      </Menu.Item>
                      <Menu.Item key="4">
                    
                      <Link to="/news">All</Link>
                      </Menu.Item>
                      <Menu.Item key="5">
                      
                      <Link to="/science">Science</Link>
                      </Menu.Item>
                      <Menu.Item key="6">
                        
                      <Link to="/sports">Sports</Link>
                      </Menu.Item>
                      <Menu.Item key="7">
                        
                      <Link to="/entertainment">Entertainment</Link>
                      </Menu.Item>
                      <Menu.Item key="8">
                      
                      <Link to="/other">Other</Link>
                      </Menu.Item>
                      <Menu.Item key="9"><br></br> <br></br></Menu.Item>

                      <Menu.Item key="10">
                          <Link to="/createNews">Create New</Link>
                      </Menu.Item>
                    </Menu>
                </Sider>
              ></Layout>
                  )}
        else{
          return(
            <div></div>
          )
        }
    }
    
}


    export default Sidebar;