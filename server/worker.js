import dotenv from 'dotenv';
dotenv.config();
import { Worker } from 'bullmq';
import { json } from 'node:stream/consumers';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import  { Document } from "@langchain/core/documents";
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CharacterTextSplitter } from '@langchain/textsplitters';


const worker = new Worker('file-upload-queue', async job => {

    console.log(`Processing job: `, job.data);
    const data = JSON.parse(job.data);

    const load = new PDFLoader(data.path);
    const docs = await load.load();


    const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small',
  apiKey: process.env.OPEN_AI_KEY, 
});

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
     {
    url: 'http://localhost:6333',
    collectionName: "langchainjs-testing",
    });
    
    await vectorStore.addDocuments(docs);
    console.log( console.log(`All docs are added to vector store`));
    
    
  }
 , { concurrency: 100,
 connection:{
    host: "localhost",
    port: '6379'
 }}
);