// This Page is to get the data from the component and return it as a json data to fetch request to the endpoint as it needed.

/*eslint-disable no-eval */

export function combine(Register) {
   
   const { firstName, lastName, location, startYear, endYear,  
    degree, branch, rollNumber, education, workExperiences,
    email, password, mobileNumber, socialProfiles, skills } = Register.data


    // let collegeId = ''
    // if(collegeName === 'srm')
    // {
    // collegeId = "5e8ef0055ce96f14c95ad0a5"
    // }
    // if(collegeName === 'mnm')
    // {
    // collegeId = "5e8c49555de26fa5a43b69b2"
    // }

    console.log(Register.education_input.length)
    // const EduField = [...Register.education];

    if(Register.education_input.length !== 0){
    Register.education_input.forEach((value,index) => {
        let obj = Register.education[index];
        education.push(obj);
    })
        Register.education = [];
        Register.education_input = [];
}

    const WorkField = [...Register.work];
    
    if(Register.work_input.lenght !== 0){
    Register.work_input.forEach((value,index) => {
        let obj = WorkField[index];
        workExperiences.push(obj);
    })
        Register.work = [];
        Register.work_input = [];
}

    const data = { firstName, lastName, location, startYear, endYear,  
        degree, branch, rollNumber, education, workExperiences,
        email, password, mobileNumber, socialProfiles, skills }

    console.log(data);

    return data;
}









