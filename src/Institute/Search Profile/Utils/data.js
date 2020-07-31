import store from '../../../Redux/store/storage'
let cities = require ('countries-cities');
var buildUrl = require('build-url');




export function selector(countries){
    let selection = [];
    countries.forEach((value) => {
        let obj = { value: `${value}`, label: `${value}` }
        selection.push(obj);
    })
    return selection;
};

export function cityList(country){
    let selection = [];
    let cityList = cities.getCities(country);
    cityList.forEach((value) => {
        let obj = { value: `${value}`, label: `${value}` }
        selection.push(obj);
    })
    return selection;
}

export function intoUrl(states){
    let state = store.getState();
    let user = state.Auth_user;
    let { searchvalue, yearvalue, selectedCity, selectedCollege, selectedBranch  } = states;
    let location = [];
    let colleges = [];
    let branches = [];
    if(selectedCity){
    selectedCity.forEach((city) => {
        let array = city.value
        location.push(array)
    })}
    if(selectedCollege){
        selectedCollege.forEach((college) => {
            let array = college.value
            colleges.push(array)
    })}
    if(selectedBranch){
        selectedBranch.forEach((branch) => {
            let array = branch.value
            branches.push(array);
    })}
    console.log(location)
    let url = buildUrl('https://alumni-backend-app.herokuapp.com',{
        path : `${user}/alumni`,   // no college
        disableCSV: true,
        queryParams : {
            search : searchvalue,
            endYear : yearvalue,
            'location.city' : location,
            collegeId : colleges,
            branch : branches
        }
    })
    return decodeURI(url);
}
