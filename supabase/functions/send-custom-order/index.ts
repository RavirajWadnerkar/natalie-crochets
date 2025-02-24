
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CustomOrderRequest {
  name: string;
  email: string;
  phone?: string;
  itemType: string;
  colors: string;
  timeline: string;
  recipientEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      phone,
      itemType,
      colors,
      timeline,
      recipientEmail,
    }: CustomOrderRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Natalie Crochets <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `New Custom Order Request from ${name}`,
      html: `
        <h1>New Custom Order Request</h1>
        <h2>Contact Information:</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        
        <h2>Order Details:</h2>
        <p><strong>Item Description:</strong><br>${itemType}</p>
        <p><strong>Color Preferences:</strong><br>${colors || "Not specified"}</p>
        <p><strong>Timeline:</strong><br>${timeline || "Not specified"}</p>
        
        <p>Please reply to ${email} to discuss this custom order request.</p>
      `,
    });

    // Send confirmation email to the customer
    await resend.emails.send({
      from: "Natalie Crochets <onboarding@resend.dev>",
      to: [email],
      subject: "We've Received Your Custom Order Request",
      html: `
        <h1>Thank you for your custom order request!</h1>
        <p>Dear ${name},</p>
        <p>We've received your request for a custom crochet piece. We'll review your requirements and get back to you soon!</p>
        
        <h2>Your Request Details:</h2>
        <p><strong>Item Description:</strong><br>${itemType}</p>
        <p><strong>Color Preferences:</strong><br>${colors || "Not specified"}</p>
        <p><strong>Timeline:</strong><br>${timeline || "Not specified"}</p>
        
        <p>If you have any questions in the meantime, feel free to reply to this email.</p>
        
        <p>Best regards,<br>Natalie Crochets Team</p>
      `,
    });

    console.log("Emails sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-custom-order function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
