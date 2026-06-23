import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const transactionHandlers = [
  // List transactions
  http.get('/api/transactions', ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || undefined;
    const network = url.searchParams.get('network') || undefined;
    const token = url.searchParams.get('token') || undefined;
    const search = url.searchParams.get('search') || undefined;
    const startDate = url.searchParams.get('startDate') || undefined;
    const endDate = url.searchParams.get('endDate') || undefined;
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    const txs = db.getTransactions({ status, network, token, search, startDate, endDate });
    const total = txs.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTxs = txs.slice(startIndex, endIndex);

    return HttpResponse.json({
      transactions: paginatedTxs,
      total,
      page,
      limit,
      totalPages,
    });
  }),

  // Get transaction by ID
  http.get('/api/transactions/:id', ({ params }) => {
    const { id } = params;
    const tx = db.getTransactionById(id as string);

    if (!tx) {
      return new HttpResponse(
        JSON.stringify({ message: 'Transaction not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return HttpResponse.json(tx);
  }),
];
