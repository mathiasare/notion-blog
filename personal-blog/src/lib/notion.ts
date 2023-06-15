import { NotionAPI } from 'notion-client'

const notion = new NotionAPI({
    activeUser: process.env.NOTION_USER_ID,
    authToken: process.env.NOTION_TOKEN_V2
})
export default notion