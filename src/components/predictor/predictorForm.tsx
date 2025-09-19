// src/App.tsx
import React, { useState } from 'react';
import type { EnvironmentalData, PredictionResult } from '../../interface/auth';
import { EnhancedSpoilagePredictor } from '../../helpers/storagePredictor';
import PreservativeSelector from '../../helpers/preservativeSelector';

function PredictorForm() {
  const [predictor] = useState(() => new EnhancedSpoilagePredictor());
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState<EnvironmentalData>({} as EnvironmentalData)
  const [selectedPreservatives, setSelectedPreservatives] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData({
      ...formData,
      [name]: name === 'temperature' || name === 'humidity' || name === 'storageDuration' || name === 'initialQuality' 
        ? Number(val) 
        : val
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = predictor.predict({...formData, traditionalPreservatives: selectedPreservatives});
      setPrediction(result);
      setIsLoading(false);
    }, 500);
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 border-red-500 text-red-700';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'low': return 'bg-green-100 border-green-500 text-green-700';
      default: return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  return (
    <div className="min-h-screen w-[75%] mx-auto text-[12px]">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-500/[0.09] rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold  mb-6">Storage Conditions</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={formData?.temperature}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="-10"
                  max="60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium  mb-2">
                  Humidity (%)
                </label>
                <input
                  type="number"
                  name="humidity"
                  value={formData?.humidity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium  mb-2">
                  Storage Duration (days)
                </label>
                <input
                  type="number"
                  name="storageDuration"
                  value={formData?.storageDuration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0"
                  max="365"
                />
              </div>

              <div>
                <label className="block text-sm font-medium  mb-2">
                  Crop Type
                </label>
                <select
                  name="cropType"
                  value={formData?.cropType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="maize">Maize</option>
                  <option value="rice">Rice</option>
                  <option value="beans">Beans</option>
                  <option value="cassava">Cassava</option>
                  <option value="wheat">Wheat</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium  mb-2">
                  Storage Type
                </label>
                <select
                  name="storageType"
                  value={formData?.storageType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="silo">Silo</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="bag_storage">Bag Storage</option>
                  <option value="open_air">Open Air</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="pestPresence"
                  checked={formData?.pestPresence}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm ">
                  Pest Presence Detected
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium  mb-2">
                  Initial Quality Score (1-10)
                </label>
                <input
                  type="number"
                  name="initialQuality"
                  value={formData?.initialQuality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1"
                  max="10"
                />
              </div>

              <PreservativeSelector selectedPreservatives={selectedPreservatives} onPreservativeChange={setSelectedPreservatives} cropType={formData?.cropType} />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Analyzing...' : 'Get Prediction'}
              </button>
            </form>
          </div>

          {/* Results Panel */}
          <div className="bg-gray-500/[0.09] rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold  mb-6">AI Predictions</h2>
            
            {prediction ? (
              <div className="space-y-6">
                <div className={`border-l-4 p-4 ${getAlertColor(prediction.alertLevel)}`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Spoilage Risk</h3>
                    <span className="text-2xl font-bold">
                      {(prediction.spoilageProbability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="mt-2">
                    Alert Level: <span className="font-semibold capitalize">{prediction.alertLevel}</span>
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Time to Spoilage</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {prediction.timeToSpoilage} days
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Estimated time before significant spoilage occurs
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold  mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {[...prediction.recommendations, ...prediction.preservativeRecommendations].map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50/[0.09] rounded-lg p-4">
                  <h3 className="font-semibold  mb-2">Optimal Selling Time</h3>
                  <p className="">
                    {prediction.timeToSpoilage > 14 
                      ? `Sell within the next ${Math.min(prediction.timeToSpoilage, 30)} days for best price` 
                      : 'Sell immediately to avoid losses'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-500">
                  Enter storage conditions to get AI-powered predictions
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default PredictorForm;