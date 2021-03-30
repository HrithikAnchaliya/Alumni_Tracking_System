import update from 'immutability-helper';

const Append = (data) => {
    let {event} = data
    const innerArray = update(event, { location: { $set: data.location } })
    return innerArray;
}

export default Append;