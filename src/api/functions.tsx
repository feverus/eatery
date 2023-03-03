export const cleanInput = (value:string) => {
    const cleanedValue = value.split('')
        .reduce((accumulator, current) => {
            if (current.match(/[A-Za-zА-Яа-я -]/)!==null) {
                if (accumulator.length===0) {
                    if (current!== ' ' && current!=='-') 
                        current = current.toUpperCase() 
                    else 
                        current = ''
                }
            } else {current = ''}
            accumulator+=current
            return accumulator
        }, '')

    return(cleanedValue)
}
