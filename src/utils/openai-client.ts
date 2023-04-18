import { OpenAI } from 'langchain/llms'

export const openai = new OpenAI({
    temperature: 0,
})