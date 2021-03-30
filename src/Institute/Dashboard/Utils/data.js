export default function split(chatData, chartName){
    let data = chatData
    let norepeat_data = [...new Set(data)];
    let ChartData = innersplit(norepeat_data, data);

    function innersplit(originalValues, values){
        let alumnus = []
        for (let i = 0 ; i < originalValues.length ; i++){
            let k = 0;
            for(let j = 0 ; j < values.length ; j++){
                if(originalValues[i] === values[j]){
                    k++;
                    alumnus[i] = k;
                }
            }
        }
        return alumnus;
    }

    if(chartName === 'Alumni'){
    return{
        labels: norepeat_data,
        datasets: [
          {
            label: 'Alumni',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: ChartData
          }
        ]}
    }
    if(chartName === 'Interviews'){
        return{
            labels: norepeat_data,
            datasets: [
              {
                label: 'Interviews',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: ChartData
              }
            ]}
        }
    
    if(chartName === 'Jobs'){
        return{
            labels: norepeat_data,
            datasets: [
              {
                label: 'Jobs',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: ChartData
              }
            ]}
    }
}
