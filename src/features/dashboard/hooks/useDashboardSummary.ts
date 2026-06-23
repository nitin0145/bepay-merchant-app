import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { queryKeys } from '../../queryKeys';

export function useDashboardSummary(filters?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(filters),
    queryFn: () => dashboardService.getSummary(filters),
    staleTime: 5000, // 5 seconds for dashboard summary
  });
}
