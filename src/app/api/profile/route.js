// api/profile/route.js
import { db } from "@/lib/firebaseAdmin";

export async function GET() {
    const snapshot = await db.collection("profile").get();
    const profiles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return Response.json(profiles);
}

export async function POST(request) {
    const data = await request.json();
    const newProfile = {
        userId: data.userId,
        name: data.name,
        phone: data.phone,
        license: data.license
    };
    const docRef = await db.collection("profile").add(newProfile);
    return Response.json({ id: docRef.id, ...newProfile });
}

export async function PUT(request) {
    const data = await request.json();
    const { id, ...updatedProfile } = data;
    await db.collection("profile").doc(id).update(updatedProfile);
    return Response.json({ id, ...updatedProfile });
}
