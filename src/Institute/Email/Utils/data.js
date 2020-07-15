export default function CollegeOptions(colleges){
    let selection = [];
    colleges.forEach((value) => {
        let obj = { value: `${value._id}`, label: `${value.collegeName}` }
        selection.push(obj);
    })
    return selection;
};

export function YearOptions(){
    let selection = [];
    let StartYear = 2010;
    for(let i = 0 ; i < 30 ; i++){
        let obj = { value: parseInt(`${StartYear+i}`), label: parseInt(`${StartYear+i}`) }
        selection.push(obj);
    }
    return selection;
}

export function BranchOption(){
    let branch = ['Computer Science', 'Mechanical', 'Bio-Technology', 'Law', 'Civil', 'Musical'];
    let selection = [];
    branch.forEach((value) => {
        let obj = { value : `${value}`, label:`${value}`}
        selection.push(obj);
    })
    return selection;
}