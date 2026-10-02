import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Log the contact inquiry for server observability
    console.log(`[CONTACT_INQUIRY] New project inquiry received from ${name} (${email}):`, {
      subject: subject || "General Inquiry",
      budget: budget || "Not specified",
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    // In production with Resend/SendGrid/EmailJS keys, dispatch live email here.
    // If credentials are not set, return verified receipt.
    return NextResponse.json({
      success: true,
      message: "Inquiry received and logged successfully.",
      inquiryId: `INQ-${Date.now().toString(36).toUpperCase()}`,
      clientName: name,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Internal server error";
    console.error("Contact API error:", error);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
