import { LineHistogram, Response, HeatHistogram} from '../types';

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

export const lineChartParser = (range: Response): LineHistogram[] => {

    const yearCollection = []
    let year: string;

    for(year in range.datapoints){
                
        const ticks = Object.entries(range.datapoints[year]);
        const labels = ticks.map(t => t[0])
        const values = ticks.map(t => t[1])

        yearCollection.push({year, labels, datasets: [{name: year, values}]})
    }

    return yearCollection
}
