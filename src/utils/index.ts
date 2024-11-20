
//formated a number to format currency money
export function formatCurrency(amount:number){
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount)// a esto le aplicamos el formarCurrency
}

export function toBoolean(str:string){
    return str.toLowerCase() === 'true'//false
}