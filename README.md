# Personal blog website
Author: Mathias Are

## Description
NextJS blog website with Notion as CMS

## Idea
The idea of the project was to create a personal blog website where
to showcase my studies and life in Belgium. The technical goal was
to create a performant and minimalistic website that has a simplistic, but pleasing UI.
The website integrates with Notion via its API to fetch the latest articles. The website
uses both NextJS local cache and a Redis instance to reduce the number of API calls made to the Notion API and speed up the loading times.

## Technologies used
- Typescript
- NextJS
- Vercel KV
- Upstash Ratelimit API
- React Notion X

## Shoutouts
Big shoutout and thanks to [@transitive bullshit](https://github.com/transitive-bullshit) and the contributors of [React Notion X](https://github.com/NotionX/react-notion-x) for providing this amazing open source library.

Licence: MIT

