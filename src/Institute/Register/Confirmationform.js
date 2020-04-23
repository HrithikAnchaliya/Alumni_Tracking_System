import React from 'react';



export default class Confirmationform extends React.Component{
    constructor (props) {
        super(props)
        this.toFetch = this.toFetch.bind(this)
      }


    toGoBack = () => {
        this.props.goBack();
    }


     async toFetch() {
        this.props.Arraying();
        let collegeId = ''
        const { firstName, lastName,  collegeName, startYear, endYear,  
            degree, branch, rollNumber,
            email, password, mobileNumber, skills_array } = this.props.values

        const { country, state, city, school, course, eduStartYear, eduEndYear , workTitle, company, industry, workStartYear, workEndYear,
                facebook, linkedin  } = this.props.values

        if(collegeName === 'srm')
            {
              collegeId = "5e8ef0055ce96f14c95ad0a5"
            }
        if(collegeName === 'mnm')
            {
              collegeId = "5e8c49555de26fa5a43b69b2"
            }
        
        const alonevalues = { firstName, lastName, startYear, endYear,  
            degree, branch, rollNumber,
            email, password, mobileNumber, collegeId,
            "skills": skills_array,
            "adminId": "5e8c46bca49607e8acf58c46",
            "education": [
                {
                    "startYear": eduStartYear ,
                    "endYear": eduEndYear,
                    "course": course ,
                    "school": school
                }
            ],
            "workExperiences": [
                {
                    "startYear": workStartYear,
                    "endYear": workEndYear,
                    "company":  company,
                    "workTitle": workTitle,
                    "industry": industry
                }
            ],
            "location": {
                "city": city,
                "state": state,
                "country": country,
                "coordinates": {
                    "langitude": "",
                    "latitude": ""
                }
            },
            "socialProfiles": {
                "facebook": facebook,
                "linkedin": linkedin
            },
        }
        console.log(alonevalues)
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(alonevalues)
        }
        console.log(values)
        try{
            const response = await fetch('https://alumni-backend-app.herokuapp.com/alumni/register',values)
            const json = await response.json()
            console.log(json)
        }
        catch(error){
            console.log(error)
        }
    }



    render(){
        console.log(this.props.values)


        return(
            <div>
                <div>
                    <h5>Are you sure u wanna register</h5>
                    <p>Cause we might sell your data - (Jk), You can go back and check again if the information given is right</p>
                </div>
                <br/>
                <div>
                    <button onClick={this.toGoBack} type='button'>Back</button>
                    <button onClick={this.toFetch}type='button'>Submit</button>
                </div>
            </div>
        )
    }
}