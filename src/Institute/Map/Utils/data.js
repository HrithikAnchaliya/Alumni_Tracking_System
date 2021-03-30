export default function getCity(data){
    let { address } = data;
    let city = (address.county) || (address.town) || (address.city) || (address.town);
    console.log(city);
    return city;
}

export function getCoorinates(data){
  console.log(data)
  let coordinates = [];
  data.forEach((alumni) => {
    if(alumni.locationPoint.coordinates){
    coordinates.push((alumni.locationPoint.coordinates))
  }})
  console.log(coordinates);
  return coordinates;
}

export function getCount(data){
  let count = data.length;
  return count;
}