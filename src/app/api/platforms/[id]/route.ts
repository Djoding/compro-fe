import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const name_id = formData.get("name_id") as string;
    const name_en = formData.get("name_en") as string;
    const description_id = formData.get("description_id") as string;
    const description_en = formData.get("description_en") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    if (!id || !name_id || !name_en || !description_id || !description_en) {
      return NextResponse.json(
        {
          status: "error",
          message: "ID, name and description in both languages are required"
        },
        { status: 400 }
      );
    }

    // Simulate updating the platform
    const updatedPlatform = {
      id,
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
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      status: "success",
      data: updatedPlatform,
      message: "Platform updated successfully"
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to update platform"
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          status: "error",
          message: "Platform ID is required"
        },
        { status: 400 }
      );
    }

    // Simulate deleting the platform
    // In a real app, you would delete from database

    return NextResponse.json({
      status: "success",
      message: "Platform deleted successfully"
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to delete platform"
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
