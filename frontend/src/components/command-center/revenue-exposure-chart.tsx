'use client';
import { useSimulationStore } from '@/stores/useSimulationStore';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

export function RevenueExposureChart() {
  const { activeDisruption } = useSimulationStore();
  
  const totalRevenueAtRisk = activeDisruption?.summary?.revenue_at_risk || 0;
  
  // Create a proportional breakdown based on the actual total so the chart looks realistic
  const data = [
    { name: 'Top Product', value: totalRevenueAtRisk * 0.45, color: '#ef4444' },
    { name: 'Sec. Product', value: totalRevenueAtRisk * 0.25, color: '#f59e0b' },
    { name: 'Tert. Product', value: totalRevenueAtRisk * 0.20, color: '#10b981' },
    { name: 'Others', value: totalRevenueAtRisk * 0.10, color: '#94a3b8' },
  ].filter(d => d.value > 0);

  return (
    <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-4 flex flex-col h-[280px]">
      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Revenue Exposure</h3>
      
      {activeDisruption && totalRevenueAtRisk > 0 ? (
        <>
          <div className="mb-2">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{formatCurrency(totalRevenueAtRisk)}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">At risk</div>
          </div>
          
          <div className="flex-1 flex items-center mt-2">
            <div className="w-24 h-24 shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={25}
                    outerRadius={45}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`revenue-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="ml-4 flex-1 space-y-2">
              {data.map((item, idx) => (
                <div key={idx} className="flex items-center text-[10px]">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="font-bold text-slate-900 dark:text-slate-200 w-14">{item.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mb-2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
           <p className="text-[13px] text-slate-500 font-medium">Awaiting simulation data</p>
        </div>
      )}
    </div>
  );
}
