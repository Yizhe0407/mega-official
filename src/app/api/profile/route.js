// api/profile/route.js
import { db } from "@/lib/firebaseAdmin";

export async function GET(request) {
    const { searchParams} = new URL(request.url);
    const id = searchParams.get("userId");

    if (id) {
        const docRef = db.collection("profile").doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return Response.json({ message: "Profile not found" }, { status: 404 });
        }
        
        return Response.json({ id: docSnap.id, ...docSnap.data() });
    }
}

export async function POST(request) {
    const data = await request.json();
    const { userId, name, phone, license } = data;

    if (!userId) {
        return Response.json({ message: "userId is required" }, { status: 400 });
    }

    const docRef = db.collection("profile").doc(userId);
    const profileData = { name, phone, license }; 
    
    // 使用 set 直接覆蓋或創建文件
    await docRef.set(profileData);

    return Response.json({ id: userId, ...profileData });
}