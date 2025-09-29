// PreservativeRecommendation.tsx
import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InfoIcon } from "@phosphor-icons/react";

interface Recommendation {
  name: string;
  concentration: string;
  dryingRequired: boolean;
  dryingTemp: string;
  dryingTime: string;
  description: string;
  type: 'traditional' | 'modern';
}

interface PreservativeRecommendationProps {
  cropType: string;
  temperature: string;
  humidity: string;
}

const PreservativeRecommendation: React.FC<PreservativeRecommendationProps> = ({ 
  cropType, 
  temperature, 
  humidity,
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch your API_KEY
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const getAIRecommendations = async (): Promise<Recommendation[]> => {
    if (!cropType) return [];
    
    const prompt = `
      As an agricultural expert, provide specific preservative recommendations for ${cropType} considering:
      - Current temperature: ${temperature}°C
      - Current humidity: ${humidity}%
      
      Format your response as a JSON array with these fields:
      [
        {
          "name": "Preservative name",
          "concentration": "Dosage/concentration",
          "dryingRequired": true/false,
          "dryingTemp": "Temperature if drying required",
          "dryingTime": "Time if drying required",
          "description": "Brief explanation of effectiveness",
          "type": "traditional" or "modern"
        }
      ]
      
      Include both traditional (natural/botanical) with cloves extract, neem leaves, tumeric, garlic etc as preferences due to availability and mixing them (e.g clove + drying)
       and modern (synthetic/technological) methods.
       i have tested the clove extracts using 20g/L, 40g/L and 60g/L of water togehter with drying and addition of salts.I discovered the optimal clove concentration is 40g/L with better antimicrobial effect and safe for human consumption. I did tests such as peroxide value, microbial test, shrinkage, sensory analysis and TVBN. 60g/L gave darker color and more clove smell revealing higher concentration might affect human health. The drying temperature i analyzed where 70degrees, 80degrees and 90degrees with the 90 being the best.
       Just based on other data also, provide the best recommendations which doesn't necessarily have to align with mine 
      Prioritize methods suitable for the given environmental conditions.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response (in case Gemini adds extra text)
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']') + 1;
      const jsonString = text.substring(jsonStart, jsonEnd);
      
      const aiRecommendations: Recommendation[] = JSON.parse(jsonString);
      
      // Validate and return recommendations
      return aiRecommendations.filter(rec => 
        rec.name && rec.description && rec.type
      );
    } catch (err) {
      console.error('Gemini API Error:', err);
      setError('Failed to get AI recommendations. Using default methods.');
      return []
    }
  };

  useEffect(() => {
    if (!cropType) return;

    if (cropType !== "" && temperature !== "" && humidity !== "") {

      const fetchRecommendations = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          // Try AI recommendations first
          const aiRecs = await getAIRecommendations();
          setRecommendations(aiRecs);
        } catch (err) {
          // Fallback to default recommendations
          console.log(err)
        } finally {
          setIsLoading(false);
        }
      };

      fetchRecommendations();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropType, temperature, humidity]);

  if (!cropType) {
    return (
      <div className="bg-gray-500/[0.05] border border-gray-500/[0.1] rounded-lg p-4 text-center">
        <InfoIcon size={24} className="mx-auto text-gray-400 mb-2" />
        <p className="text-gray-500 text-sm">
          Select a crop type to see preservative recommendations
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <span className="ml-3 text-gray-600">Analyzing optimal preservative methods...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-700 text-sm">{error}</p>
      </div>
    );
  }

  // Group recommendations by type
  const traditionalRecs = recommendations.filter(rec => rec.type === 'traditional');
  const modernRecs = recommendations.filter(rec => rec.type === 'modern');

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-[14px] flex items-center gap-2">
        <InfoIcon size={16} />
        Preservative Recommendations for {cropType.charAt(0).toUpperCase() + cropType.slice(1)}
      </h3>
      
      <div className="grid gap-4">
      {traditionalRecs.length > 0 && (
        <div>
          <h4 className="font-semibold text-[12px] mb-2 flex items-center gap-1">
            🌿 Traditional Methods
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {traditionalRecs.map((rec, index) => (
              <div 
                key={`traditional-${index}`} 
                className="border border-green-500/[0.2] rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-[13px] ">{rec.name}</h4>
                  <span className="text-[10px] bg-green-500/[0.05] text-gray-800 px-2 py-1 rounded">
                    Traditional
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                  <div className="bg-green-500/[0.05] p-2 rounded">
                    <p className="text-green-600">Concentration</p>
                    <p className="font-medium">{rec.concentration}</p>
                  </div>
                  <div className="bg-green-500/[0.05] p-2 rounded">
                    <p className="text-green-600">Drying Required</p>
                    <p className="font-medium">{rec.dryingRequired ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                
                {rec.dryingRequired && (
                  <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                    <div className="bg-green-500/[0.05] p-2 rounded">
                      <p className="text-green-600">Drying Temperature</p>
                      <p className="font-medium">{rec.dryingTemp}</p>
                    </div>
                    <div className="bg-green-500/[0.05] p-2 rounded">
                      <p className="text-green-600">Drying Time</p>
                      <p className="font-medium">{rec.dryingTime}</p>
                    </div>
                  </div>
                )}
                
                <p className="text-[11px] text-gray-800">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {modernRecs.length > 0 && (
        <div>
          <h4 className="font-semibold text-[12px] mb-2 flex items-center gap-1">
            🔬 Modern Methods
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {modernRecs.map((rec, index) => (
              <div 
                key={`modern-${index}`} 
                className="border border-gray-500/[0.2] rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-[13px] ">{rec.name}</h4>
                  <span className="text-[10px] bg-gray-500/[0.05] text-gray-800 px-2 py-1 rounded">
                    Modern
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                  <div className="bg-secondary/[0.05] p-2 rounded">
                    <p className="text-secondary">Concentration</p>
                    <p className="font-medium">{rec.concentration}</p>
                  </div>
                  <div className="bg-secondary/[0.05] p-2 rounded">
                    <p className="text-secondary">Drying Required</p>
                    <p className="font-medium">{rec.dryingRequired ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                
                {rec.dryingRequired && (
                  <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                    <div className="bg-secondary/[0.05] p-2 rounded">
                      <p className="">Drying Temperature</p>
                      <p className="font-medium">{rec.dryingTemp}</p>
                    </div>
                    <div className="bg-secondary/[0.05] p-2 rounded">
                      <p className="">Drying Time</p>
                      <p className="font-medium">{rec.dryingTime}</p>
                    </div>
                  </div>
                )}
                
                <p className="text-[11px] text-gray-800">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
      
      {parseFloat(temperature) > 30 && (
        <div className="bg-gray-500/[0.05] border border-yellow-200 rounded-lg p-3">
          <p className="text-[11px] text-yellow-700 flex items-start gap-2">
            <InfoIcon size={16} className="flex-shrink-0 mt-0.5" />
            <span>
              <span className="font-semibold">High Temperature Alert:</span> 
              Consider reducing storage temperature by 5-10°C to extend shelf life
            </span>
          </p>
        </div>
      )}
      
      {parseFloat(humidity) > 70 && (
        <div className="bg-red-500/[0.05] border border-red-200 rounded-lg p-3">
          <p className="text-[11px] text-red-700 flex items-start gap-2">
            <InfoIcon size={16} className="flex-shrink-0 mt-0.5" />
            <span>
              <span className="font-semibold">High Humidity Alert:</span> 
              Immediate moisture control required. Consider additional desiccants
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PreservativeRecommendation;