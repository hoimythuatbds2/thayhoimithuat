import React from 'react';
import { INTEGRATION_COLORS } from '../data/integrationColors';
import { IntegrationType } from '../types';

export const IntegratedColorLegend: React.FC = () => {
  const types: IntegrationType[] = [
    'stem',
    'local_edu',
    'human_rights',
    'digital_competence',
    'defense_security',
    'ai_integration',
    'digital_citizenship',
    'traffic_safety'
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
          Bảng Quy Ước Màu Nội Dung Tích Hợp (Mục 21)
        </h3>
        <span className="text-xs text-slate-500 font-medium italic">Áp dụng ở cấp độ Run / Từ ngữ</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {types.map(key => {
          const cfg = INTEGRATION_COLORS[key];
          return (
            <div 
              key={key} 
              className="flex flex-col p-2 rounded-lg border text-xs transition-transform hover:scale-102"
              style={{ backgroundColor: cfg.bgHex, borderColor: `${cfg.hex}40` }}
            >
              <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs" 
                  style={{ backgroundColor: cfg.hex }}
                />
                <span className="truncate">{cfg.label}</span>
              </div>
              <span className="text-[10px] text-slate-600 mt-1 font-medium">Màu: {cfg.colorName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
