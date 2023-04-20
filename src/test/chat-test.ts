import {customWebLoader, makeChain, openai} from '../utils'
import {HNSWLib} from 'langchain/vectorstores/hnswlib'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'

const path = process.env.INDEX_PATH
let vectorStore: HNSWLib|undefined = undefined
    HNSWLib.load(path || '', new OpenAIEmbeddings({}))
        .then(async vectorStore => {
            const chain = makeChain(vectorStore)
            
            const res = await chain.call({
                question: '아직 군대 안갔는데 여권 발급 수수료 얼마야?',
                chat_history: [],
            })

            console.log(res)
        })

 