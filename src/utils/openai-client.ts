import { OpenAI } from 'langchain/llms/openai'

export const openai = new OpenAI({
    temperature: 0,
})