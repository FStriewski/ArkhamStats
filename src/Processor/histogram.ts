import {Histogram, Investigator, DataPoint} from '../types';

export const histogram = (data: Investigator[], target: string):Histogram => {

    const meta = {
        title: "",
        x_title: "",
        y_title: "",
    }

    const cache: DataPoint[] = []

    const filterInvestigatorByName = () => 
        data.filter(inv => inv.investigator_name === target) 

    const filterInvestigatorByCode = () => 
        data.filter(inv => inv.investigator_code === target)
            
    const retrieveTargetSubset = () => {
        const byCode = filterInvestigatorByCode();
        const byName = filterInvestigatorByName();

        return byCode.length >= byName.length? byCode : byName;
    }

    const targetSubset = retrieveTargetSubset();

    targetSubset.map(parsed => {
        const date = parsed.date_creation;
        const item = cache.find(entry => entry.x === date)
        if (item){
            item.y += 1
        }
        else{
            cache.push({x: date, y: 1})
        } 
        return
    }
    )

    const result = {
        meta,
        datapoints: cache,
    }
    console.log(result)
    return result
}

