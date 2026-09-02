'use client';
import { AlertCircle, Zap, AlertTriangle, ArrowRight, Activity, Globe } from 'lucide-react';
import Link from 'next/link';
import { useSimulationStore } from '@/stores/useSimulationStore';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';

export default function DisruptionsIndexPage() {
  const { activeDisruption } = useSimulationStore();
  const router = useRouter();

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] bg-slate-50 dark:bg-[#0A0F1C] overflow-y-auto">
      <div className="max-w-[1600px] mx-auto w-full px-6 pt-4 pb-12 flex-1 flex flex-col">
        <div className="mb-6 flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Disruptions Queue</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Monitor, analyze, and recover from active supply chain disruptions</p>
          </div>
          <Link href="/command-center" className="flex items-center px-4 py-2 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-semibold rounded-lg shadow-sm transition-colors text-sm">
            <Zap className="w-4 h-4 mr-2" />
            New Simulation
          </Link>
        </div>

        {!activeDisruption ? (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#111827] shadow-sm py-32 text-center">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Active Disruptions</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Your supply chain is currently operating nominally. Run a simulation from the Command Center to model potential vulnerabilities and cascade impacts.
            </p>
            <Link href="/command-center" className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors">
              <Zap className="w-4 h-4 mr-2" />
              Go to Command Center
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Disruption Target</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Severity & Duration</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Revenue at Risk</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer" onClick={() => router.push(`/disruptions/${activeDisruption.simulation_id}`)}>
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4 border border-red-200 dark:border-red-800 shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-[15px]">{activeDisruption.disruption.affected_entity_id}</div>
                        <div className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{activeDisruption.disruption.disruption_type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-[14px] font-semibold text-slate-900 dark:text-white">{(activeDisruption.disruption.severity * 100).toFixed(0)}% Capacity Loss</div>
                    <div className="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">{activeDisruption.disruption.duration_days} Days Expected</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-[15px] font-mono font-bold text-slate-900 dark:text-white">{formatCurrency(activeDisruption.summary?.revenue_at_risk || 0)}</div>
                    <div className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">{activeDisruption.summary?.affected_orders || 0} Orders Blocked</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span> Active
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Link href={`/disruptions/${activeDisruption.simulation_id}`} onClick={(e) => e.stopPropagation()} className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors border border-blue-200 dark:border-blue-800/50">
                      View Analysis <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
