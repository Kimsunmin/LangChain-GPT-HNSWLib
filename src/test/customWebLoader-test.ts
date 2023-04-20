import {customWebLoader} from '../utils/customWebLoader'

(async ()=>{
    const url = 'https://www.geumcheon.go.kr/portal/index.do'
    
    console.log(await customWebLoader(url))
})()