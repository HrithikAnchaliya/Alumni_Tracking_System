// This Page is to get the data from the component and return it as a json data to fetch request to the endpoint as it needed.

/*eslint-disable no-eval */

export function combine(Register) {
   

   const { firstName, lastName, country, state, city, collegeId, startYear, endYear,  
    degree, branch, rollNumber, school, course, eduStartYear, eduEndYear, workTitle, company, industry, workStartYear, workEndYear,
    email, password, mobileNumber, facebook, linkedin, skills, education_input, work_input  } = Register
    
    
    let education = [
        {
            "startYear": eduStartYear ,
            "endYear": eduEndYear,
            "course": course ,
            "school": school
        }
    ];
    let workExperiences= [
        {
            "startYear": workStartYear,
            "endYear": workEndYear,
            "company":  company,
            "workTitle": workTitle,
            "industry": industry
        }
    ];

    if(education_input !== 0){
    education_input.forEach((value) => {
        let obj = {
            "startYear": eval("Register.eduStartYear"+ value) ,
            "endYear": eval("Register.eduEndYear"+value),
            "course": eval("Register.course"+value) ,
            "school": eval("Register.school"+value)
        }
        education.push(obj);
    })}

    if(work_input !== 0){
        work_input.forEach((value) => {
            let obj = {
                "startYear": eval("Register.workStartYear"+ value),
                "endYear": eval("Register.workEndYear"+ value),
                "company":  eval("Register.company"+ value),
                "workTitle": eval("Register.workTitle"+ value),
                "industry": eval("Register.industry"+ value)
            }
            workExperiences.push(obj);
        })}



    const skills_array = skills.split(',');

    const alonevalues = { firstName, lastName, startYear, endYear,  
        degree, branch, rollNumber,
        email, password, mobileNumber, collegeId,
        "skills": skills_array,
        "adminId": "5e8c46bca49607e8acf58c46",
        "education" : education,
        "workExperiences": workExperiences,
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
        }
   
    }

    return alonevalues;
}









