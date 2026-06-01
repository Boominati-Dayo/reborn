import type { IOrder } from "@/lib/models/Order";

interface EmailParams {
  to_email: string;
  to_name?: string;
  subject?: string;
  message: string;
  order_reference?: string;
  order_details?: string;
}

export async function sendOrderConfirmationEmail(order: IOrder) {
  // Only send if EmailJS is configured
  if (
    !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
    !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ORDER_CONFIRMATION
  ) {
    console.warn("EmailJS not configured, skipping email");
    return;
  }

  try {
    // Format order details for email
    const orderItems = order.items
      .map(
        (item) =>
          `- ${item.name} (Qty: ${item.quantity}) - $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    const orderTotal = order.payment.totalAmount.toFixed(2);

    const customerMessage = `
Thank you for your order request!

Order Reference: ${order.orderReference}

Items:
${orderItems}

Total: $${orderTotal}

Shipping Address:
${order.shipping.address}
${order.shipping.city}, ${order.shipping.state || ""} ${order.shipping.zipCode}
${order.shipping.country}

Payment Method: ${order.payment.preferredMethod}

We will contact you shortly with payment details. Please keep this order reference for your records.

Thank you for choosing Reborn Babies!
    `.trim();

    // Send to customer
    await sendEmail({
      to_email: order.customer.email,
      to_name: order.customer.name,
      subject: `Order Confirmation - ${order.orderReference}`,
      message: customerMessage,
      order_reference: order.orderReference,
      order_details: orderItems,
    });

    // Send admin notification if template is configured
    if (process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN_ALERT) {
      const adminEmail = process.env.ADMIN_EMAIL || "babybloomdoll@gmail.com";
      const adminMessage = `
New Order Received!

Order Reference: ${order.orderReference}
Customer: ${order.customer.name} (${order.customer.email})
${order.customer.phone ? `Phone: ${order.customer.phone}` : ""}

Items:
${orderItems}

Total: $${orderTotal}

Shipping:
${order.shipping.address}
${order.shipping.city}, ${order.shipping.state || ""} ${order.shipping.zipCode}
${order.shipping.country}

Payment Method: ${order.payment.preferredMethod}
      `.trim();

      await sendEmail({
        to_email: adminEmail,
        to_name: "Admin",
        subject: `New Order: ${order.orderReference}`,
        message: adminMessage,
        order_reference: order.orderReference,
        order_details: orderItems,
      });
    }
  } catch (error) {
    console.error("EmailJS error:", error);
    throw error;
  }
}

async function sendEmail(params: EmailParams) {
  // This will be called from client-side or server-side
  // For now, we'll use a server action or API route
  // EmailJS requires client-side calls, so we'll need to handle this differently
  
  // For server-side, we can use the EmailJS API directly
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ORDER_CONFIRMATION!;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  // EmailJS REST API endpoint
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: params.to_email,
        to_name: params.to_name || "",
        subject: params.subject || "Order Confirmation",
        message: params.message,
        order_reference: params.order_reference || "",
        order_details: params.order_details || "",
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`EmailJS API error: ${error}`);
  }

  return response.json();
}

