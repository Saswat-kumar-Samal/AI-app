import openAI from 'openai'
import sql from "../configs/db.js";
import {clerkClient} from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';





const AI = new openAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

/** this is the controller for generating article */

export const generateArticle = async (req, res)=> {

    /** in this try block we will fetch the data from the request */

    try{
        const {userId} = req.auth()   /** this auth will be added using clerk middleware */
        const {prompt, length}  =  req.body   /** we need prompt and length for generating the article from AI */
        const plan = req.plan
        const free_usage = req.free_usage

        if (plan !== 'premium' && free_usage >= 10) {  /** this means user in free plan and the free credits are exhausted */
            return res.json({
                success : false,
                message : 'limit reached and upgrade to continue'
            })
        }


        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
                    role: "user",
                    content: prompt,
                },
            ],
            temperature : 0.7,
            max_tokens : length
        });

        const content = response.choices[0].message.content   /** this is the response from AI */

        /** now we will store all the data into database */

        await sql `INSERT INTO creations(user_id, prompt, content, type) 
                    VALUES (${userId}, ${prompt}, ${content}, 'article')`

        if (plan !== 'premium'){   /** this means user is totally in free plan then we have increase the free credits */
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata : {
                    free_usage : free_usage + 1
                }
            })
        }

        res.json({
            success : true,
            content
        })

    }catch (error){
        console.log(error.message)
        res.json({
            success : false,
            message : error.message
        })
    }
}







export const generateBlogTitle = async (req, res)=> {

    /** in this try block we will fetch the data from the request */

    try{
        const {userId} = req.auth()   /** this auth will be added using clerk middleware */
        const {prompt}  =  req.body;
        const plan = req.plan;
        const free_usage = req.free_usage

        if (plan !== 'premium' && free_usage >= 10) {  /** this means user in free plan and the free credits are exhausted */
            return res.json({
                success : false,
                message : 'limit reached and upgrade to continue'
            })
        }


        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
                role: "user",
                content: prompt,
            },
            ],
            temperature : 0.7,
            max_tokens : 100
        });

        const content = response.choices[0].message.content   /** this is the response from AI */

        /** now we will store all the data into database */

        await sql `INSERT INTO creations(user_id, prompt, content, type) 
                    VALUES (${userId}, ${prompt}, ${content}, 'BlogArticle')`

        if (plan !== 'premium'){   /** this means user is totally in free plan then we have increase the free credits */
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata : {
                free_usage : free_usage + 1
            }
        })
        }

        res.json({
            success : true,
            content
        })

    }catch (error){
        console.log(error.message)
        res.json({
            success : false,
            message : error.message
        })
    }
}









export const generateImage = async (req, res)=> {

    /** in this try block we will fetch the data from the request */

    try{
        const {userId} = req.auth()   /** this auth will be added using clerk middleware */
        const {prompt, publish}  =  req.body   /** we need prompt and length for generating the article from AI */
        const plan = req.plan

        if (plan !== 'premium') {  /** this means user in free plan and the free credits are exhausted */
            return res.json({
                success : false,
                message : 'limit reached and upgrade to continue'
            })
        }


        const formData = new FormData()
        formData.append('prompt', prompt)

        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers : {'x-api-key': process.env.CLIPDROP_API_KEY},
            responseType : "arraybuffer",
        })


        const Base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;  /** this is image response */

        /** now we will store this image in cloud storage -- Cloudinary*/
        const {secure_url} = await cloudinary.uploader.upload(Base64Image)


        /** now we will store all the data into database */

        await sql `INSERT INTO creations(user_id, prompt, content, type, publish) 
                    VALUES (${userId}, ${prompt}, ${secure_url}, 'Image', ${publish ?? false})`



        res.json({
            success : true,
            content : secure_url
        })

    }catch (error){
        console.log(error.message)
        res.json({
            success : false,
            message : `error message from controller : ${error.message}`
        })
    }
}