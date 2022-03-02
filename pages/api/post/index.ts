import type { NextApiRequest, NextApiResponse } from 'next'
import {randomUUID} from "crypto";
import { createClient } from 'redis';

type ResponseData = {
    id?: string;
    message?: string;
}
export default async function create(req: NextApiRequest, res: NextApiResponse<ResponseData>){
    if(req.method != "POST"){
        res.status(405).json({
            message: "Use POST method"
        })
        return
    }
    if(!req.body.content){
        res.status(400).json({
            message: "Content was not sent!"
        })
        return
    }
    const client = createClient({
        url: process.env.REDIS_URL
    });
    await client.connect();
    const id = randomUUID();
    await client.set(id, req.body.content)
    client.disconnect()
    res.status(200).json({ id })
}