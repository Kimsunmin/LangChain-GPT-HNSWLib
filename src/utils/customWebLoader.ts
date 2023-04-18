import { Document } from 'langchain/document'
import { PuppeteerWebBaseLoader } from 'langchain/document_loaders/web/puppeteer'

export const customWebLoader = async (url: string) => {
    const loader = new PuppeteerWebBaseLoader(url)
    const oriDocs = await loader.load()

    const newDocs: Document[] = []
    for(let item of oriDocs){
        newDocs.push(new Document({
            pageContent: item.pageContent.replace(/(<[^>]*>?)/g, ''),
            metadata: item.metadata
        }))
    }
    
    return newDocs
}