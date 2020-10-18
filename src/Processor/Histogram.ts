import {Histogram, Investigator, HistogramValue} from '../types';
import { default as json } from '../Resources/sample.json';

export const histogram = (investigators: Investigator[], target: string):Histogram => {

    const meta = {
        title: "",
        x_title: "",
        y_title: "",
    }

    const cache: HistogramValue[] = []

    const filterInvestigatorByName = () => 
        investigators.filter(inv => inv.investigator_name === target) 

    const filterInvestigatorByCode = () => 
        investigators.filter(inv => inv.investigator_code === target)
            
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
        values: cache,
    }
    
    return result
}

