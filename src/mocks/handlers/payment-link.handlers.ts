import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { mockTokens } from '../mockData';
import { Network } from '@/types/domain';

export const paymentLinkHandlers = [
  // List payment links
  http.get('/api/payment-links', ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || undefined;
    const search = url.searchParams.get('search') || undefined;
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    const links = db.getPaymentLinks({ status, search });
    const total = links.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedLinks = links.slice(startIndex, endIndex);

    return HttpResponse.json({
      paymentLinks: paginatedLinks,
      total,
      page,
      limit,
      totalPages,
    });
  }),

  // Get payment link by ID
  http.get('/api/payment-links/:id', ({ params }) => {
    const { id } = params;
    const link = db.getPaymentLinkById(id as string);

    if (!link) {
      return new HttpResponse(
        JSON.stringify({ message: 'Payment link not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return HttpResponse.json(link);
  }),

  // Create payment link
  http.post('/api/payment-links', async ({ request }) => {
    try {
      const body = (await request.json()) as {
        amount: number;
        fiatCurrency: string;
        description?: string;
        supportedTokens: string[];
        supportedNetworks: string[];
        expiresAt?: string;
        redirectUrl?: string;
        referenceId?: string;
        internalNotes?: string;
        partialPayments?: boolean;
        customerDetails?: {
          name?: string;
          phone?: string;
          email?: string;
        };
      };

      // Basic backend validation checks
      if (!body.amount || body.amount <= 0) {
        return new HttpResponse(
          JSON.stringify({ message: 'Amount must be greater than zero' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (!body.supportedTokens || body.supportedTokens.length === 0) {
        return new HttpResponse(
          JSON.stringify({ message: 'At least one supported token must be selected' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Map token strings to domain Token objects
      const resolvedTokens = mockTokens.filter(t => body.supportedTokens.includes(t.symbol));
      // Map network strings to domain Network enums
      const resolvedNetworks = body.supportedNetworks as Network[];

      const created = db.createPaymentLink({
        merchantId: 'mch_bepay_demo_01',
        amount: body.amount,
        fiatCurrency: body.fiatCurrency,
        description: body.description,
        supportedTokens: resolvedTokens,
        supportedNetworks: resolvedNetworks,
        expiresAt: body.expiresAt,
        redirectUrl: body.redirectUrl,
        referenceId: body.referenceId,
        internalNotes: body.internalNotes,
        partialPayments: body.partialPayments,
        customerDetails: body.customerDetails,
      });

      return HttpResponse.json(created, { status: 201 });
    } catch {
      return new HttpResponse(
        JSON.stringify({ message: 'Invalid payload body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }),
];
