'use client';
import { useSimulationStore } from '@/stores/useSimulationStore';

export function ProductionImpactChart() {
  const { activeDisruption } = useSimulationStore();
  const isRecovered = activeDisruption?.status === 'RECOVERED';
  const affectedPlants = activeDisruption?.summary?.affected_plants || 0;
  
  // Calculate a proportional impact metric based on the live simulation data
  // If we have recovered, the impact is neutralized
  const productionImpactPercent = (!isRecovered && affectedPlants > 0) ? Math.min(100, affectedPlants * 15) : 0;
  const normalUnits = 2000;
  const impactedUnits = Math.round(normalUnits * (1 - (productionImpactPercent / 100)));
  
  return (
    <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-4 flex flex-col h-[280px]">
      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Production Impact</h3>
      
      {activeDisruption && !isRecovered ? (
        <>
          <div className="mb-4">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{productionImpactPercent.toFixed(1)}%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Production capacity lost</div>
          </div>
          
          <div className="flex-1 flex flex-col justify-end space-y-5 pb-2">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{normalUnits.toLocaleString()} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">units/day</span></span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Baseline Capacity</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-slate-300 dark:bg-slate-600 h-full w-full"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{impactedUnits.toLocaleString()} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">units/day</span></span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Post-Disruption</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                <div className="bg-blue-600 h-full" style={{ width: `${100 - productionImpactPercent}%` }}></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mb-2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
           <p className="text-[13px] text-slate-500 font-medium">{isRecovered ? 'Capacity fully restored' : 'Awaiting simulation data'}</p>
        </div>
      )}
    </div>
  );
}
