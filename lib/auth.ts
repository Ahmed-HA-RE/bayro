import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP } from 'better-auth/plugins/email-otp';
import { Resend } from 'resend';
import VeloriaEmailVerification from '@/emails/VerifyEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 100,
  },

  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'email-verification') {
          const { error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Email Verification',
            react: VeloriaEmailVerification({ otp }),
          });
          console.log(error);
        } else {
          // Send  OTP for password reset
        }
      },
    }),
  ],
});
