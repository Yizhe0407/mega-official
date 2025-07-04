// app/api/hello/route.js
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

export async function GET(request) {
  const querySnapshot = await getDocs(collection(db, "reserve"));
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return Response.json({ items });
}

export async function POST(request) {
  try {
    const data = await request.json();
    const docRef = await addDoc(collection(db, "reserve"), data);
    return Response.json({ id: docRef.id, message: "寫入成功" });
  } catch (error) {
    console.error("Firestore 寫入失敗：", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

