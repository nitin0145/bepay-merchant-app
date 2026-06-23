import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const dashboardHandlers = [
  http.get('/api/dashboard/summary', () => {
    const summary = db.getDashboardSummary();
    return HttpResponse.json(summary);
  }),
];
