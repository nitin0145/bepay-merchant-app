import { apiClient } from '@/services/api-client';
import type { DashboardSummary } from '@/types/domain';

export const dashboardService = {
  getSummary(params?: { startDate?: string; endDate?: string }): Promise<DashboardSummary> {
    return apiClient.get<DashboardSummary>('/dashboard/summary', params);
  },
};
