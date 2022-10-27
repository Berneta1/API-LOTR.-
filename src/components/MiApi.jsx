import { useState, useEffect } from "react"

const MiApi = () => {
    //1 Registramos 2 datas, 1ra para guardar toda la data la 2da para registrar el filtro
    const [allData, setAllData] = useState([])
    const [data, setData] = useState([])
//5.1  Guardamos lo que se escriba en el imput de busqueda 
    const [value, setValue] = useState("")
    const [order,setOrder] = useState("asc")
    
    //3 creamos un useEffect que va a llamar a getData cuando el array este vacio, o sea al principio
    useEffect(() => {
        getData()
    }, [])
//5.2 Creamos useEfeect para filtrar ( cuando value cambie ejecutamos filterData)
    useEffect(()=> {
        filterData()
    }, [value])
    
    useEffect(()=> {
        const sorted = sortData(data)
        setData(sorted)
    }, [order])
    
    //2 Funcion para obtener la data
    const getData = () => {
        const url = 'https://the-one-api.dev/v2/character'
        fetch(url, {
            headers:{
                'Accept': 'application/json',
                'Authorization':'Bearer Lb3bgsu6VI-JQS88lQi6'}
            })
// console.log(json) --> optativo, para ver que devuelve la api
            .then((res) => res.json())
            .then((json) => {
                
                const sorted = sortData(json.docs)
                setAllData(sorted)
                setData(sorted)
            })
// funcion del catch es agarrar algun error, en este caso lo mostrara en el console.log
            .catch((e)=> console.log(e))
     }
// 6 Funcion Informacion filtrada que incluye los parametros name y race
     const filterData = ()=> {
        const search = value.toLowerCase()
        const filtered = allData.filter((character)=> {
            const name = character.name.toLowerCase()
            const race = character.race.toLowerCase()

            return name.includes(search) || race.includes(search)
        })
        const sorted = sortData(filtered)
        setData(sorted)
     }

     const sortData = (data)=> {
        const sortedData = [...data]
        
        if(order === 'asc') {
            sortedData.sort((a, b)=> a.name.localeCompare(b.name))
        } else {
            sortedData.sort((a, b)=> b.name.localeCompare(a.name))
        }

        return sortedData
        }

    return (
        <main>
            <h2>Middle earth Characters</h2>
            <div className="inputs">
                <input type="text" placeholder="Search by Name or race" onChange={(e)=> setValue(e.target.value)} />
                {/* cuando ocurra el cambio se va setear el estado order en el value seleccionado */}
                <select  onChange={(e)=> setOrder(e.target.value)}>
                    <option value="asc">Name from A-Z</option>
                    <option value="desc">Name from Z-A</option>
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Race</th>
                        <th>WikiLink</th>

                    </tr>
                </thead>
                <tbody>
{/* 4 trasladamos data a un map para mostrar informacion  */}
                    {
                        data.map((character) => {
                            return (
                                <tr key={character._id}>
                                    <td>{character.name}</td>
                                    <td>{character.gender}</td>
                                    <td>{character.race}</td>
                                    <td> <a href={character.wikiUrl} target="_blank">wikiUrl</a></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </main>
    )

}

export default MiApi