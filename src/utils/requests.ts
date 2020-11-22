export const BASEURL = "127.0.0.1:5000"

export const getIDeckByDate = async (icode: string) => {
    const route = `/bydate/${icode}`
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