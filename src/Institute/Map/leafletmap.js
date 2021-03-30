import React from 'react'
import Map from './map';
import { connect } from 'react-redux';
import { notifyError_with_msg } from '../Utils/Message'
import { base_url } from '../../Endpoint/endpoint';
import { getCoorinates } from './Utils/data'
import Profilecard from '../Search Profile/profilecard'

class GeoJsonMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      dropLocation : '',
      users : [],
      onChoose : 'alumni'
      }

    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onCity = this.onCity.bind(this);
    this.onChoose = this.onChoose.bind(this)
}

  componentDidMount = async () => {
      const values = {
        method : "GET",
        headers : {
            'x-auth' : this.props.token
        }
    }
    let user = this.props.user
    try{
    const fetchUser = await fetch(`${base_url}/${user}/alumni`,values);
    const json = await fetchUser.json()
    if(!fetchUser.ok){
        notifyError_with_msg(json.err);
    }
    console.log(json);
    if(fetchUser.ok){
      let coorinates = getCoorinates(json)
      this.setState({ stores : coorinates})
    }}
    catch(error){
        notifyError_with_msg('Unable To Fetch User Coordinates');
    }
  }

  onChangeLocation = (city) => {
    this.setState({ dropLocation : city })
    this.onCity();
  }

  onCity = async () => {
    const values = {
          method : "GET",
          headers : {
              'x-auth' : this.props.token
          }
      }
      console.log(values)
      try{
      const fetchUser = await fetch(`${base_url}/${this.props.user}/alumni?location.city=${this.state.dropLocation}`,values);
      const json = await fetchUser.json()
      if(!fetchUser.ok){
          notifyError_with_msg("Unable to find ..")
      }
      console.log(json);
      if(fetchUser.ok){
          this.setState({ users : json});
      }}
      catch(error){
          notifyError_with_msg("Unable to find ..")
          console.log(error);
      }
  }

  onChoose = (event) => {
    this.setState({ onChoose : event.target.name})
  }

  render() {    
    let { onChoose } = this.state
    let users = this.state.users
    return (
      <div>
      <div>
        <Map onChoose={onChoose} changeLocation ={this.onChangeLocation} stores={this.state.stores}/>
      </div>
      <br/>
      <br/>
      <div>
        <button name='alumni' type='button' onClick={this.onChoose}>Show Alumni</button><br/>
        <button name='marker' type='button' onClick={this.onChoose}>Use Marker To Fetch Alumni</button><br/>
        <br/>
        <br/>
        <div>
        {users.map((data,index) => 
          (<Profilecard 
              key={index} 
              id={data._id} 
              name={data.firstName}
              last={data.lastName}
              email={data.email}
              branch={data.branch}
              degree={data.degree}
              skills={data.skills}
              location={data.location}
              socialProfiles={data.socialProfiles}/>))}
        </div>
      </div>
      </div>
    );
  }
}

const mapStatesToProps = state => {
  return{
      token : state.Auth_token,
      user : state.Auth_user
  }
}


export default connect(mapStatesToProps,null) (GeoJsonMap);