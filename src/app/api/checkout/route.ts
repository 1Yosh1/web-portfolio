import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tierId, tierName, amount, depositAmount, clientEmail, clientName, projectDetails } = body;

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    // If Stripe secret key is configured, create live Stripe Checkout Session
    if (stripeSecretKey) {
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2025-02-24.acacia" as unknown as Stripe.LatestApiVersion,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: clientEmail || undefined,
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: `${tierName} - 30% Project Kickoff Deposit`,
                description: `Initial sprint deposit for ${projectDetails || tierName}. Remaining balance invoiced at milestones.`,
              },
              unit_amount: Math.round(depositAmount * 100),
            },
            quantity: 1,
          },
        ],
        metadata: {
          tierId: tierId || "custom",
          clientName: clientName || "Client",
          totalProjectAmount: amount?.toString() || "0",
        },
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/?payment=success&tier=${tierId || "deposit"}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/?payment=cancelled`,
      });

      return NextResponse.json({ url: session.url, live: true });
    }

    // Otherwise, return simulated checkout response for immediate preview/client presentation
    return NextResponse.json({
      simulated: true,
      success: true,
      message: "Stripe live keys not detected in .env.local. Running in preview simulation mode.",
      receipt: {
        transactionId: `TX-${Date.now().toString(36).toUpperCase()}`,
        tierName,
        depositAmount,
        totalProjectAmount: amount,
        clientName: clientName || "Client",
        clientEmail: clientEmail || "client@example.com",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Checkout route error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
