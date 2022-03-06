import { default as axios } from 'axios'
import qs from 'qs'
import AxiosCostum from '../../helpers/AxiosCostum'


export const getListSearchFilter = (dataParams) => {
    const filledParams = ['category_id', 'location', 'payment_id', 'name', 'date']
    const url = (dataParams) => {
        var result = "";
        filledParams.forEach((item) => {
            if (dataParams[item]) {
                if (result == "") {
                    result = `${item}=${dataParams[item]}`;
                } else {
                    result += `&${item}=${dataParams[item]}`;
                }
            }
        })
        if (dataParams.sort) {
            if (result == "") {
                result = `sort=${dataParams.sort}&order=${dataParams.order}`
            } else {
                result += `&sort=${dataParams.sort}&order=${dataParams.order}`
            }
        }

        return `${result}&limit=16`
    }
    return {
        type: 'SEARCH_FILTER',
        payload: AxiosCostum().get(`/search?${url(dataParams)}&limit=16`)
    }
}