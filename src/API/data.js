const host = 'https://api.calorieninjas.com';
const endPoint = '/v1/nutrition';
const key = process.env.REACT_APP_API_KEY

export async function searchFood(foodItem, grams = "") {
    const query = `${grams}g ${foodItem}`
    let requestURL = `${host}${endPoint}?query=${query}`;
    let response = await fetch(requestURL, {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': key
        }
    })
    if (response.status !== 200) {
        throw new Error(`Response: ${response.status}. Check Connection`)
    }
    const data = await response.json();
    if (data.items.length === 0) {
        throw new Error(`Nothing found for "${foodItem}"`)
    }
    return {
        text: data.items[0].name,
        grams: data.items[0].serving_size_g,
        calories: data.items[0].calories
    }
}