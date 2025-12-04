import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { resend } from '@/app/config/resend';
import PurchaseReceiptEmail from '@/emails/PurchaseReceipt';

export const POST = async (req: NextRequest) => {
  const event = await Stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature')!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === 'checkout.session.completed') {
    await prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { id: event.data.object.metadata?.orderId },
        data: {
          paidAt: new Date(),
          isPaid: true,
          paymentResult: {
            id: event.data.object.id,
            status: event.data.object.status,
            email_address: event.data.object.customer_email,
            pricePaid: Math.round(event.data.object.amount_total! / 100),
          },
        },
        include: { orderItems: true, user: true },
      });
      for (const item of updatedOrder.orderItems) {
        await tx.product.updateMany({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.qty },
          },
        });
        await resend.emails.send({
          from: `Bayro <noreply@${process.env.RESEND_DOMAIN}>`,
          replyTo: process.env.REPLY_TO_GMAIL,
          to: event.data.object.customer_email!,
          subject: 'Order Confirmation',
          react: PurchaseReceiptEmail({ order: updatedOrder }),
        });
      }
    });

    return NextResponse.json({ message: 'Payment processed successfully' });
  } else {
    return NextResponse.json({ message: 'Payment Failed' });
  }
};
