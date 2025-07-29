import { NextRequest, NextResponse } from "next/server";

// Mock contact information data
let contactInfo = {
  id: "1",
  location: {
    id: "Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190, Indonesia",
    en: "123 Sudirman Street, South Jakarta, DKI Jakarta 12190, Indonesia"
  },
  phone: "+62 21 1234 5678",
  email: "contact@teknalogico.com",
  operationHours: {
    id: "Senin - Jumat, 09:00 - 17:00 WIB",
    en: "Monday - Friday, 09:00 - 17:00 WIB"
  }
};

// Mock contact messages data
const contactMessages = [
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
      data: {
        info: contactInfo,
        messages: contactMessages
      }
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch contact data"
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, location_id, location_en, phone, email, operationHours_id, operationHours_en } = body;

    if (!id || !location_id || !location_en || !phone || !email || !operationHours_id || !operationHours_en) {
      return NextResponse.json(
        {
          status: "error",
          message: "All fields including both language versions are required"
        },
        { status: 400 }
      );
    }

    // Update contact info with new bilingual structure
    contactInfo = {
      id,
      location: {
        id: location_id,
        en: location_en
      },
      phone,
      email,
      operationHours: {
        id: operationHours_id,
        en: operationHours_en
      }
    };

    return NextResponse.json({
      status: "success",
      message: "Contact information updated successfully",
      data: contactInfo
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to update contact information"
      },
      { status: 500 }
    );
  }
}
