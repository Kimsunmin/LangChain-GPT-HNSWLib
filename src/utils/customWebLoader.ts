import { Document } from 'langchain/document'
import { PuppeteerWebBaseLoader } from 'langchain/document_loaders/web/puppeteer'

export const customWebLoader = async (url: string) => {
    const loader = new PuppeteerWebBaseLoader(url)
    const oriDocs = await loader.load()

    const newDocs: Document[] = []
    for(let item of oriDocs){
        newDocs.push(new Document({
            pageContent: replaceText(item.pageContent),
            metadata: item.metadata
        }))
    }

    return newDocs
}

const replaceText = (text:string) :string =>
    text.replace(/<script .*?><\/script>/g, '')
        .replace(/(<[^>]*>?)|\t|\n|(\s{2,})|\&nbsp\;/g, '')