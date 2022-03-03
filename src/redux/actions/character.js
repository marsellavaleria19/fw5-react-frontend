import { default as axios } from 'axios'

export const getCharacter = () => {
    return {
        type: 'GET_CHARACTER',
        payload: axios.get('https://rickandmortyapi.com/api/character')
    }
}

export const filterCharacter = (name, gender) => {
    // const params = new URLSearchParams()
    // params.append('name', name)
    // params.append('gender', gender)
    return {
        type: 'GET_CHARACTER',
        payload: axios.get(`https://rickandmortyapi.com/api/character?name=${name}&gender=${gender}`)
            // payload: axios.post(`/auth/login`, params)
    }
}