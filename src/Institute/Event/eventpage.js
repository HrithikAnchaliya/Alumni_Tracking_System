import React from 'react';


export default class Eventpage extends React.Component{
    constructor(props){
        super(props)
        this.state = {                                     
            loading: true,
            posts : null
            }
            // this.getdata = this.getdata.bind(this)    //No need to  bind anything bcaz of using the componentdidmount funct
        }          
        /*{ <tbody>
            {items.map(item => <ObjectRow key={item.id} name={item.name} />)}    //To loop the componrnt multiple times
          </tbody> }*/                        // Not needed here just for peice of info

     
        async componentDidMount(){
            const url = 'https://jsonplaceholder.typicode.com/posts';
            const response = await fetch(url);
            const posts = await response.json();
            this.setState({posts:posts[0],loading:false})       //no name for the json so its "posts[0]" or else it would be "posts.nameofthejson[0]" to get he data.
            // console.log(posts[0].title)                      //consoling it
        }
       

        render(){
      return(
            <div>
                {this.state.loading || !this.state.posts ? 
                (<h1>Loading...</h1>) : 
                (<div>
                     <div>
                    <h1>{this.state.posts.title}</h1>
                    <span>
                        <span>The Time</span>
                        <br/>
                        <span>And Date</span>
                    </span>
                </div>
                <div>
                    <div>
                    <p>
                       <br/>
                        </p>
                        <p>
                       <strong>The Subtitle</strong>
                        </p>
                        <p>
                       <br/>
                        </p>
                        <p>
                       <strong>Date :</strong>
                        </p>
                        <p>
                       <br/>
                        </p>
                        <p>
                       <strong>Time :</strong>
                        </p>
                        <p>
                       <br/>
                        </p>
                        <p>
                       <strong>Location</strong>
                        </p>
                        <p>
                       <br/>
                        </p>
                        <p>
                       <strong>Spaeker</strong>
                        </p>
                        <p>
                       <br/>
                        </p>
                        <p>
                       <strong>Description</strong><br/>
                       {this.state.posts.body}
                        </p>
                        <p>
                       <br/>
                        </p>
                        <p>
                       <strong>Speaker-Bio</strong>
                        </p>
                        <div>
                            {/* {
                                this.state.title.map((data,i) => {
                                return <p key={i}>{data}</p>
                                })

                            }
                         */}
                        </div>
                        <button type='submit'>Lets Go</button>
                    </div>
                </div>
                </div>)
                }
            </div>
        );
    }
}