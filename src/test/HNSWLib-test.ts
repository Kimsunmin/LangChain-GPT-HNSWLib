import { HNSWLib } from "langchain/vectorstores/hnswlib"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"

(async () => {
    const vectorStore = await HNSWLib.load(
        process.env.INDEX_PATH || '',
        new OpenAIEmbeddings()
    )
    
    const result = await vectorStore.similaritySearch('', 1)
    console.log(result)
})()