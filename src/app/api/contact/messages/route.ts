import { NextRequest, NextResponse } from "next/server";

// Mock contact messages data
let contactMessages = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Partnership Inquiry",
    message: "I am interested in partnering with your company...",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Service Question",
    message: "I have some questions about your services...",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      status: "success",
      data: contactMessages
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch contact messages"
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          status: "error",
          message: "Message ID is required"
        },
        { status: 400 }
      );
    }

    const messageIndex = contactMessages.findIndex(msg => msg.id === id);
    if (messageIndex === -1) {
      return NextResponse.json(
        {
          status: "error",
          message: "Message not found"
        },
        { status: 404 }
      );
    }

    contactMessages = contactMessages.filter(msg => msg.id !== id);

    return NextResponse.json({
      status: "success",
      message: "Message deleted successfully"
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to delete message"
      },
      { status: 500 }
    );
  }
}
