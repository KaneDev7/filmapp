
export const filterNullImg = (arr) =>{
    const newArr = [...arr]
    return newArr.filter(el =>el?.primaryImage !== null)
}