import { NextResponse } from "next/server";

export async function GET() {
  // Placeholder data for platforms
  const platforms = [
    {
      id: "platform-1",
      name: {
        id: "React",
        en: "React"
      },
      description: {
        id: "Library JavaScript untuk membangun antarmuka pengguna",
        en: "A JavaScript library for building user interfaces"
      },
      imageUrl: "/platforms/react.png",
      category: "Frontend Framework",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "platform-2",
      name: {
        id: "Node.js",
        en: "Node.js"
      },
      description: {
        id: "Runtime JavaScript yang dibangun di atas mesin JavaScript V8 Chrome",
        en: "JavaScript runtime built on Chrome's V8 JavaScript engine"
      },
      imageUrl: "/platforms/nodejs.png",
      category: "Backend Runtime",
      createdAt: "2024-01-20T14:15:00Z"
    }
  ];

  return NextResponse.json({
    status: "success",
    data: platforms
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name_id = formData.get("name_id") as string;
    const name_en = formData.get("name_en") as string;
    const description_id = formData.get("description_id") as string;
    const description_en = formData.get("description_en") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    if (!name_id || !name_en || !description_id || !description_en) {
      return NextResponse.json(
        {
          status: "error",
          message: "Name and description in both languages are required"
        },
        { status: 400 }
      );
    }

    // Simulate saving the platform
    const newPlatform = {
      id: `platform-${Date.now()}`,
      name: {
        id: name_id,
        en: name_en
      },
      description: {
        id: description_id,
        en: description_en
      },
      category: category || "General",
      imageUrl: image ? `/platforms/${image.name}` : "/platforms/default.png",
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      status: "success",
      data: newPlatform,
      message: "Platform created successfully"
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create platform"
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept-Language"
    }
  });
}
