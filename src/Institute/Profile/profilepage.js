import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default class Profilepage extends React.Component{
    state = {
        showForm: true,
        showEdit: false,
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        address1:'',
        address2:'',
        city:'',state:'',zip:'',
        about:'',hobbies:''
      };

      profilejsx = () => {
        console.log("Toggled showForm");
        
        this.setState({ 
            showEdit:false,
            showForm: true});
      };
      
      editjsx = () => {
        console.log("Toggled showForm");
        this.setState({ 
            showForm: false,
            showEdit:true });
      };

      handleSubmit = e => {
        e.preventDefault();
      };

      onChangefunc = (event) =>{
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    render(){
      
        
      let toggleprofilevalue = null;
      
      if (this.state.showForm){
        toggleprofilevalue = (
            <div class="tab-pane active" id="profile">
            <h5 class="mb-3">User Profile</h5>
            <div class="row">
                <div class="col-md-6">
                {this.state.firstname ? (
                    <div>
                    <h6>Name</h6>
                    <p>
                        {this.state.firstname} {this.state.lastname}       
                    </p>
                    </div>
                    ) :
                    (
                    <div>
                    <h6>Name</h6>
                    <p>
                       You don't have name or something.  
                    </p>
                    </div>)}
                    {this.state.email ? (
                    <div>
                    <h6>Email</h6>
                    <p>
                        {this.state.email}       
                    </p>
                    </div>
                    ) :
                    (
                    <div>
                    <h6>Email</h6>
                    <p>
                       Yeah! Fine, i'll send a post.  
                    </p>
                    </div>)}
                    {this.state.password ? (
                    <div>
                    <h6>Password</h6>
                    <p>
                        Its a secret, or is it.       
                    </p>
                    </div>
                    ) : null}
                    {this.state.address1 ? (
                    <div>
                    <h6>Address</h6>
                    <p>
                        {this.state.address1}       
                    </p>
                    </div>
                    ) :
                    (
                    <div>
                    <h6>Address</h6>
                    <p>
                       Now, i cant even send a post.
                    </p>
                    </div>)}
                    {this.state.city && this.state.state ? (
                    <div>
                    <h6>City 'n' State</h6>
                    <p>
                        You are from {this.state.city} which is in {this.state.state}.              
                    </p>
                    </div>
                    ) : null}
                    {this.state.about ? (
                    <div>
                    <h6>About</h6>
                    <p>
                        {this.state.about}       
                    </p>
                    </div>
                    ) :
                    (
                    <div>
                    <h6>About</h6>
                    <p>Thats sad</p>
                    </div>
                    ) }
                    {this.state.hobbies ? (
                    <div>
                    <h6>Hobbies</h6>
                    <p>
                        {this.state.hobbies}       
                    </p>
                    </div>
                    ) :
                    null }

                </div>
                <div class="col-md-6">
                    <h6>Recent badges</h6>
                   
                    <a href="https://reactjs.org/" class="badge badge-dark badge-pill">React</a>
                    <a href="https://www.w3schools.com/java/java_intro.asp" class="badge badge-dark badge-pill">Javascript</a>
                    <a href="https://www.w3schools.com/js/" class="badge badge-dark badge-pill">Java</a>
                    <a href="https://www.w3schools.com/python/default.asp" class="badge badge-dark badge-pill">Python</a>
                </div>
            </div>
        </div>
        );
      }

      let toggleeditvalue = null;
      
      if (this.state.showEdit){
        toggleeditvalue = (

            <Form>
            <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name='firstname' value={this.state.firstname} onChange={this.onChangefunc} placeholder="First Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name='lastname' value={this.state.lastname} onChange={this.onChangefunc} placeholder="Last Name" />
            </Form.Group>
            </Form.Row>    
            <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name='email' value={this.state.email} onChange={this.onChangefunc} placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name='password' value={this.state.password} onChange={this.onChangefunc} placeholder="Password" />
            </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control name='address1' value={this.state.address1} onChange={this.onChangefunc} placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control name='address2' value={this.state.address2} onChange={this.onChangefunc} placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control name='city' value={this.state.city} onChange={this.onChangefunc} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control name='state' value={this.state.state} onChange={this.onChangefunc} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control name='zip' value={this.state.zip} onChange={this.onChangefunc} />
            </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAbout">
            <Form.Label>About</Form.Label>
            <Form.Control name='about' value={this.state.about} onChange={this.onChangefunc} placeholder="About you.." />
            </Form.Group>

            <Form.Group controlId="formGridHobbies">
            <Form.Label>Hobbies</Form.Label>
            <Form.Control name='hobbies' value={this.state.hobbies} onChange={this.onChangefunc} placeholder="Hobbies" />
            </Form.Group>

            <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button onClick={this.handleSubmit} variant="primary" type="submit">
            Submit
            </Button>
            </Form>
    
        );
      }

        return(
            <div>
                <div class="col-lg-8 order-lg-2">
                <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                <Nav.Link onClick={this.profilejsx} href="#">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link onClick={this.editjsx} eventKey="link-1">Edit</Nav.Link>
                </Nav.Item>
                </Nav>
                    {toggleprofilevalue}
                    {toggleeditvalue}
                    
            <div class="col-lg-4 order-lg-1 text-center">
                <img src="https://www.imagediamond.com/blog/wp-content/uploads/2019/07/hair-face-dp.jpg" class="mx-auto img-fluid img-circle d-block" alt="avatar"/>
                <h6 class="mt-2">Upload a different photo</h6>
                <label class="custom-file">
                    <input type="file" id="file" class="custom-file-input"/>
                    <span class="custom-file-control">Choose file</span>
                </label>
            </div>
        </div>
     </div>
     
        );
    }
}