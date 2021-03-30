export default function Interviews(Interview) {
    const { company, workTitle, industry , difficulty, description, feedback, toTopics } = Interview

    let topics;
    if(toTopics){
        let listToArray = toTopics.split(',');
        console.log(listToArray)
        topics = listToArray;
    }

    const values = { company, workTitle, industry , difficulty, description, feedback, topics };
    console.log(values);
    return values;
    
}