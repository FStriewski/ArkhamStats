import { ParsedLineChartInput, Response, HeatHistogram} from '../types';

const dateparser = (date: string):string => {
    const year = +date.slice(0,4);
    const month = +date.slice(4,6);
    const day = +date.slice(6,8);
    const newdate = (new Date(year,month,day)).toString()
    return Date.parse(newdate).toString().slice(0,10)
}

export const ymdSlashtoDateString = (date: string):string => {
    const year = +date.slice(0,4);
    const month = +date.slice(5,7);
    const day = +date.slice(8,9);
    const newdate = (new Date(year,month,day)).toString()
    return Date.parse(newdate).toString().slice(0,10)
}

export const heatmapParser = (range: Response): HeatHistogram[] => {

    const yearCollection = []
    let year: string;
    for(year in range.datapoints){
        // let thisYearData = {}

        // let obj;
        // for(obj in range.datapoints[year]){
        //     const newKey = obj //ymdSlashtoDateString(obj)
        //     thisYearData[newKey] = range.datapoints[year][obj]
        // }

        const startDate = `${year}-01-01`
        const endDate = `${year}-12-31`

        const dataset = {
            year,
            ticks: range.datapoints[year],
            start: startDate,
            end: endDate,
        }
        yearCollection.push(dataset)
    }

    return yearCollection
}
export const lineParser = (range: Response): HeatHistogram[] => {

    const yearCollection = []
    let year: string;
    for(year in range.datapoints){
                
        const tick = Object.entries(range.datapoints[year]);
        yearCollection.push({
            year,
            tick})

    }

    return yearCollection
}

export const lineChartParser = (input): ParsedLineChartInput => {

    const {datapoints } = input

    const labels = datapoints.map(val => dateparser(val.x))
    const values = datapoints.map(val => val.y)


    return {labels, datasets: [{values}]}
}
