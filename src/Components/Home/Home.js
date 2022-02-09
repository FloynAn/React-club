import React from 'react';
import Content from './Content/Content';
import Sidebar from './Sidebar/Sidebar';


const Home = () => {

    return (
        <div style={{backgroundColor:'#fee8d9'}}>
           <Sidebar/>
           <Content/>            
        </div>
    );
};

export default Home;