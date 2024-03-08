import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"



export async function POST(
    request: Request
){
    try {
        const body = await request.json();
        const currentuser = await getCurrentUser()

        const {
            name,
            image
        } = body;

        if(!currentuser?.id){
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const updateUser = await prisma.user.update({
            where:{
                id: currentuser.id
            },
            data:{
                image: image,
                name: name
            }
        })

        return NextResponse.json(updateUser)
        
    } catch (error) {
        console.log(error, 'ERROR_SETTINGS');
        return new NextResponse('Internal Error', { status: 500 })
    }
}