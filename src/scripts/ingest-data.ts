import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import {HNSWLib} from 'langchain/vectorstores/hnswlib'
import {customWebLoader} from '../utils/customWebLoader'

const url = process.env.WEB_URL || ''
const path = process.env.INDEX_PATH || ''

export const run = async () => {
    try {
        const rawDocs = await customWebLoader(url)

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        })

        const docs = await textSplitter.splitDocuments(rawDocs)

        const vectorStore = await HNSWLib.fromDocuments(
            docs,
            new OpenAIEmbeddings(),
        )

        await vectorStore.save(path)

    } catch(e) {
        console.log(e)
        throw new Error('Failed to ingest your data')
    }
}

(async () => {
    await run()
    console.log('ingestion complete')
})()