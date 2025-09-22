// src/components/PreservativeSelector.tsx
import React, { useEffect, useState } from 'react';
import { traditionalPreservatives } from '../data/traditionalPreservatives';

interface PreservativeSelectorProps {
  selectedPreservatives: string[];
  onPreservativeChange: (preservatives: string[]) => void;
  cropType: string;
}

const PreservativeSelector: React.FC<PreservativeSelectorProps> = ({
  selectedPreservatives,
  onPreservativeChange,
  cropType
}) => {
  const handlePreservativeToggle = (preservative: string) => {
    if (selectedPreservatives.includes(preservative)) {
      onPreservativeChange(selectedPreservatives.filter(p => p !== preservative));
    } else {
      onPreservativeChange([...selectedPreservatives, preservative]);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [compatiblePreservatives, setCompatiblePreservatives] = useState<any>([])

  useEffect(() => {

    console.log(Object.entries(traditionalPreservatives).filter(([, preservative]) => {
      const compatibleCrops = preservative.crops || [];
      return compatibleCrops.includes("maize")
    }))
    setCompatiblePreservatives(Object.entries(traditionalPreservatives)
    .filter(([, preservative]) => {
      const compatibleCrops = preservative.crops || [];
      return compatibleCrops.includes(cropType);
    }))
  }, [cropType])

  return (
    <div className="space-y-4">

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
        {
        compatiblePreservatives.length === 0 ?
        <p>No traditional preservative available for the crop selected. Click next to continue</p>
        :
        compatiblePreservatives.map(([key, preservative]: [ key: string, preservative: { name: string, effectiveness: number } ]) => (
          <button
            key={key}
            type="button"
            onClick={() => handlePreservativeToggle(key)}
            className={`p-3 rounded-lg border text-left transition-all ${
              selectedPreservatives.includes(key)
                ? 'border-secondary bg-secondary/[0.2]'
                : 'border-gray-500/[0.2] hover:border-gray-300 bg-gray-500/[0.03]'
            }`}
          >
            <div className="font-medium">{preservative.name}</div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round(preservative.effectiveness * 100)}% effective
            </div>
          </button>
        ))}
      </div>

      {selectedPreservatives.length > 0 && (
        <div className="mt-4 p-4 bg-gray-500/[0.05] dark:bg-[#151515] rounded-lg border border-gray-500/[0.2]">
          <h4 className="font-medium text-primary mb-2">Selected Preservatives:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedPreservatives.map(preservative => {
              const preservativeData = traditionalPreservatives[preservative as keyof typeof traditionalPreservatives];
              return (
                <span 
                  key={preservative} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {preservativeData?.name || preservative}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreservativeSelector