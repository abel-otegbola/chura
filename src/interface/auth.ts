export interface User {
    email: string,
    password: string
}
// src/types/index.ts
export interface EnvironmentalData {
  temperature: number | string;
  humidity: number | string;
  uvExposure?: 'high' | 'medium' | 'low' | 'none';
  storageDuration: number | string;
  cropType: string;
  storageType: string;
  pestPresence: boolean;
  initialQuality?: number;
  
  // Traditional preservatives data
  traditionalPreservatives: string[]; // Array of selected preservatives
  preservativeDuration?: string; // How long used
  preservativeEffectiveness?: string; // Self-rated effectiveness
  preservativeQuantity?: string; // 'light', 'moderate', 'heavy'
}

export interface PredictionResult {
  spoilageProbability: number;
  timeToSpoilage: number;
  alertLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  
  // Traditional preservative insights
  preservativeImpact: number; // 0-100% effectiveness boost
  traditionalMethodsScore: number; // Overall effectiveness rating
  preservativeRecommendations: string[]; // Specific advice for preservatives
}