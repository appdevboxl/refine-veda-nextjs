import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/config/cloudinary";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file provided" },
                { status: 400 }
            );
        }

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using upload_stream
        const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
            (resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "rigveda-products",
                        resource_type: "image",
                    },
                    (error, result) => {
                        if (error || !result) return reject(error ?? new Error("Upload failed"));
                        resolve({ secure_url: result.secure_url, public_id: result.public_id });
                    }
                );
                stream.end(buffer);
            }
        );

        return NextResponse.json(
            {
                success: true,
                message: "File uploaded successfully",
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("POST /api/upload error:", error);
        return NextResponse.json(
            { success: false, message: error?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
