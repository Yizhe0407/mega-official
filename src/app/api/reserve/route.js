// app/api/reserve/route.js
import { db } from "@/lib/firebaseAdmin";

// 查詢 reserve 全部資料
export async function GET() {
  const snapshot = await db.collection("reserve").get();
  const items = [];
  snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
  return Response.json({ items });
}

// 新增一筆 reserve
export async function POST(request) {
  try {
    const data = await request.json();
    const docRef = await db.collection("reserve").add(data);
    return Response.json({ id: docRef.id, message: "寫入成功" });
  } catch (error) {
    console.error("Firestore 寫入失敗：", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
