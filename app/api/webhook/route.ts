import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type PropsBody = {
  title: string;
  content: string;
};

// POST 메서드 핸들러
export async function POST(req: Request) {
  const body = (await req.json()) as PropsBody;
  console.log(body);

  try {
    // Google API 로직
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({ auth, version: "v4" });
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:B1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[body.title, body.content]],
      },
    });

    return NextResponse.json({ message: response.data }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json({ error: "문제가 발생했습니다.", details: e.message }, { status: 500 });
  }
}

// GET 메서드 핸들러
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send("GET 요청 수신");
}
