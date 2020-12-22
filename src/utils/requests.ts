export const BASEURL = "127.0.0.1:5000"

export const getInvestigatorByDate = async (icode: string) => {
    const route = `/investigator/${icode}`
    const result = await fetch(route, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
        referrerPolicy: 'same-origin'
    }).then(
        response => response.json()
    )
    return result
}
export const getCountsByClass = async (iclass: string) => {
    const route = `/decks/total/${iclass}`
    const result = await fetch(route, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
        referrerPolicy: 'same-origin'
    }).then(
        response => response.json()
    )
    return result
}

export const getInvestigatorComparisonByDate = async (icodes: string[]) => {

    const params = {}
    icodes.forEach((code, index) => params[`i${index}`] = code);
    console.log(params)

    const queryString =  new URLSearchParams(params)
    const route = `/investigatorComparison?${queryString}`
    const result = await fetch(route, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
        referrerPolicy: 'same-origin'
    }).then(
        response => response.json()
    )
    return result
}