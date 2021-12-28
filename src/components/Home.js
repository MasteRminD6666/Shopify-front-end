import React , {useEffect , useState} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { If, Else, Then, } from 'react-if';
import Buyer from './pages/Buyer';
import Seller from './pages/Seller'

function Home(props) {
    const [data, setData] = useState([]);
    const user = JSON.parse(window.localStorage.getItem('User'))  
  
    useEffect(() => {
        async function getUser() {
            let userToken = props.userToken
           const data= axios.get('http://localhost:3001/me', {
                headers: {
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*",   
                  'Authorization': `Basic ${userToken}` 
                }   
              }).then((result) => {
            
                  setData(result.data)
               
                window.localStorage.setItem('User', JSON.stringify(result.data));
              }).catch((error) => {
                  console.log(error);
              })
    
    }
    getUser()
     },[])
     return (
        <>
        <If condition={data.role === 1}>
                <Then>
                <Buyer></Buyer>
                </Then>
                <Else>
                  <Seller></Seller>
                </Else>
              </If>
        </>
    );
     


}

export default connect(function (state) {
    return state
  })(Home) 



