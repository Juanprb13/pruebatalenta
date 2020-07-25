const runApi=() =>{
    consumoApi('films','').then(datos => {
        const films = datos.results
        console.log(films,convertidor(films));
    })
}

const consumoApi = async(param,index)=>{
    const url = `https://swapi.dev/api/${param}/${index}`
    const api = await fetch(url)
    const data = api.json()
    return data
}

const convertidor =(objeto)=>{
    let nuevoObjeto = []
    objeto.forEach(element => {
        nuevoObjeto.push({
            name:element.title ,
            planets: filtroObjeto(element.planets,'planets'),
            people: filtroObjeto(element.characters,'people') ,
            starships:filtroObjeto(element.starships,'starships') 
        })
    });
    return nuevoObjeto
}
const filtroObjeto = (objeto,tipo)=>{
    let nuevoObjeto = []
    objeto.forEach(element => {
        let id =  element.replace(`http://swapi.dev/api/${tipo}/`, "")
        consumoApi(tipo,id).then(info =>{
            switch (tipo) {
                case 'planets':
                    nuevoObjeto.push({
                        name:info.name ,
                        terrain:info.terrain,
                        gravity:info.gravity,
                        diameter:info.diameter,
                        population:info.population
                    })
                    break;
                case 'people':
                    nuevoObjeto.push({
                        name:info.name ,
                        gender:info.gender,
                        hair_color:info.hair_color,
                        skin_color:info.skin_color,
                        eye_color:info.eye_color,
                        height:info.height ,
                        homeworld:info.homeworld,
                        especie:info.species
                    })
                    break;
                case 'starships':
                    nuevoObjeto.push({
                        name:info.name ,
                        model:info.model,
                        manufacturer:info.manufacturer,
                        passengers:info.passengers,
                    })
                default:
                    break;
            }
            
        })
        
    });
    return nuevoObjeto
}

console.log(runApi());