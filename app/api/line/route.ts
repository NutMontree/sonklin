import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // รับค่าตามที่หน้าบ้านส่งมา (เพิ่ม phoneNumber)
    const { name, email, message, address, total, phoneNumber } = body;

    const TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const TO = process.env.LINE_TO;

    if (!TOKEN || !TO) {
      console.error("Missing LINE Config");
      return NextResponse.json({ success: false }, { status: 500 });
    }

    const displayUser = name || "ลูกค้าทั่วไป";
    const displayAddress = address || "ไม่ได้ระบุที่อยู่";
    const displayTotal = total || "0";
    const displayNote = message || "-";
    const displayPhone = phoneNumber || "ไม่ได้ระบุเบอร์โทร";
    const formattedDate = new Date().toLocaleString("th-TH");

    // สร้าง Flex Message
    const flexMessage = {
      type: "flex",
      altText: `📦 ออเดอร์ใหม่จากคุณ ${displayUser}`,
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "📦 รายการสั่งซื้อใหม่",
              weight: "bold",
              color: "#1DB446",
              size: "lg",
            },
            { type: "separator", margin: "md" },
            {
              type: "box",
              layout: "vertical",
              margin: "md",
              spacing: "sm",
              contents: [
                {
                  type: "text",
                  text: `👤 ชื่อ: ${displayUser}`,
                  size: "sm",
                  wrap: true,
                  weight: "bold",
                },
                {
                  type: "text",
                  text: `📞 เบอร์โทร: ${displayPhone}`,
                  size: "sm",
                  color: "#E53935",
                  weight: "bold",
                },
                {
                  type: "text",
                  text: `📧 อีเมล: ${email || "-"}`,
                  size: "sm",
                  wrap: true,
                },
                {
                  type: "text",
                  text: `🏠 ที่อยู่จัดส่ง:`,
                  size: "sm",
                  weight: "bold",
                  margin: "md",
                },
                {
                  type: "text",
                  text: displayAddress,
                  size: "sm",
                  wrap: true,
                  color: "#666666",
                },
                {
                  type: "text",
                  text: `📝 หมายเหตุ: ${displayNote}`,
                  size: "sm",
                  wrap: true,
                  color: "#ff6b00",
                },
              ],
            },
            { type: "separator", margin: "lg" },
            {
              type: "box",
              layout: "horizontal",
              margin: "lg",
              contents: [
                {
                  type: "text",
                  text: "ยอดรวมสุทธิ",
                  weight: "bold",
                  size: "md",
                },
                {
                  type: "text",
                  text: displayTotal,
                  align: "end",
                  weight: "bold",
                  size: "md",
                  color: "#E53935",
                },
              ],
            },
            {
              type: "text",
              text: `🕒 ${formattedDate}`,
              size: "xxs",
              color: "#aaaaaa",
              margin: "md",
              align: "end",
            },
          ],
        },
        // --- ส่วนที่เพิ่มปุ่มกด ---
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "primary",
              color: "#ff6b00",
              height: "sm",
              action: {
                type: "uri",
                label: "ดูรายละเอียดออเดอร์",
                uri: "https://sonklin.vercel.app/seller/orders",
              },
            },
          ],
        },
      },
    };

    const res = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ to: TO, messages: [flexMessage] }),
    });

    const resData = await res.json();

    if (!res.ok) {
      console.error("LINE API Error:", resData);
      return NextResponse.json(
        { success: false, error: resData },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
