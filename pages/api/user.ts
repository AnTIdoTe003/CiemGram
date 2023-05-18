import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma"
type Data ={
    name: string
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const session = await getServerSession(req, res, authOptions)
    if(!session){
        return res.status(401).send({
            message:"Please login"
        })
    }

    try{
        if(req.method=== "GET"){
            const email = req.query.email as string
            if(email){
                const currentUser = await prisma.user.findUnique({
                    where:{
                        email: email
                    }
                })
                if(!currentUser) return res.status(200).send({message:"New user "})
                return res.status(200).send({message:"User found", user:currentUser})
            }
            return res.status(404).send({message:"User not found"})
        }
        if(req.method=== "POST"){
            const email = req.body as string
            if(email){
                const currentUser = await prisma.user.findUnique({
                    where:{
                        email: email
                    }
                })
                if(!currentUser) {
                    const user = await prisma.user.create({
                        data:req.body
                    })
                    return res.status(200).send({message:"Created Successfully", user})
                }else{
                    const user = await prisma.user.update({
                        where:{
                        email: email
                            },
                        {
                            data:req.body
                        },
                    })
                    res.status(200).send({message:"Updated Succesfully",})
                }
            }
        }
    }catch(error){
        console.log(error)
    }

}