import { useState, useEffect } from 'react'

import useFood from './hook'

const FoodList = () => {
    const [food] = useFood()    
    console.log(food)
    return (
        <>
        {food.filteredFood.map((item, id) => <div key={id}>{item.name}</div>)}
        </>
    )
}

export default FoodList