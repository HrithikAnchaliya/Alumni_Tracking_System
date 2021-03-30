export default function toCreateData(alumni){
    
    let row = [];

    const createData = (name, branch, degree, email, year, roll, id) => {
        return { name, branch, degree, email, year, roll, id };
    }

    alumni.forEach((data) => {
        let obj = createData(data.firstName, data.branch, data.degree, data.email, data.startYear, data.rollNumber, data._id);
        row.push(obj);
    })

    return row;
}
