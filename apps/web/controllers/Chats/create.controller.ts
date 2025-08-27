import { prisma } from "@repo/db"
import { AuthConfigs } from "../../app/config/AuthConfig"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { CreateChatSchema } from "@repo/types"

export const createChats = async (req: NextRequest) => {
    const UserDetails = await getServerSession(AuthConfigs);
    if (!UserDetails) {
        return NextResponse.json({ message: "Unauthorized user trying to create a chat please login" }, { status: 401 })
    }
    const userId = UserDetails?.user.id
    const body = await req.json();
    const parsedBody = CreateChatSchema.safeParse(body);

    if (!parsedBody.success) {

        return NextResponse.json({
            message: "Please provide every details",
            data: parsedBody.error.flatten?.() ?? parsedBody.error
        }, { status: 400 });
    }


    const { filePath, name } = parsedBody.data;

    try {
        const chatCreated = await prisma.chats.create({
            data: {
                filePath,
                name: name ?? filePath,
                user: {
                    connect: {
                        id: userId
                    }
                }

            }
        })

        return NextResponse.json({
            message: "Chat is created and video uploaded",
            data: chatCreated
        }, { status: 201 });

    } catch (error) {
        console.error("Internal Server Error in creating chat", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}