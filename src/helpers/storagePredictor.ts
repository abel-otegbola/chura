// src/lib/enhancedSpoilagePredictor.ts
import { traditionalPreservatives, cropPreservativeCompatibility } from '../data/traditionalPreservatives';
import type { EnvironmentalData, PredictionResult } from '../interface/auth';

export class EnhancedSpoilagePredictor {
  predict(data: EnvironmentalData): PredictionResult {
    // Get base prediction
    const basePrediction = this.getBasePrediction(data);
    
    // Calculate traditional preservative impact
    const preservativeImpact = this.calculatePreservativeImpact(data);
    
    // Adjust predictions based on traditional methods
    const adjustedProbability = Math.max(0, basePrediction.spoilageProbability - (preservativeImpact.effectivenessBoost / 100));
    const extendedTime = Math.round(basePrediction.timeToSpoilage * (1 + preservativeImpact.timeExtension / 100));
    
    // Generate preservative-specific recommendations
    const preservativeRecommendations = this.generatePreservativeRecommendations(data, preservativeImpact);
    
    return {
      ...basePrediction,
      spoilageProbability: adjustedProbability,
      timeToSpoilage: extendedTime,
      preservativeImpact: preservativeImpact.overallScore,
      traditionalMethodsScore: preservativeImpact.effectivenessBoost,
      preservativeRecommendations
    };
  }
  
  private calculatePreservativeImpact(data: EnvironmentalData) {
    if (!data.traditionalPreservatives || data.traditionalPreservatives.length === 0) {
      return {
        effectivenessBoost: 0,
        timeExtension: 0,
        overallScore: 0
      };
    }
    
    let totalEffectiveness = 0;
    let compatibilityScore = 0;
    let durationBonus = 0;
    
    // Calculate effectiveness of each preservative
    data.traditionalPreservatives.forEach(preservative => {
      const preservativeData = traditionalPreservatives[preservative as keyof typeof traditionalPreservatives];
      if (preservativeData) {
        totalEffectiveness += preservativeData.effectiveness;
        
        // Check compatibility with crop
        const compatibleCrops = cropPreservativeCompatibility[data.cropType as keyof typeof cropPreservativeCompatibility];
        if (compatibleCrops && compatibleCrops.includes(preservative)) {
          compatibilityScore += 0.2; // 20% bonus for good compatibility
        }
      }
    });
    
    // Average effectiveness
    const avgEffectiveness = totalEffectiveness / data.traditionalPreservatives.length;
    
    // Duration bonus
    switch (data.preservativeDuration) {
      case 'More than 6 months': durationBonus = 0.15; break;
      case '3-6 months': durationBonus = 0.10; break;
      case '1-3 months': durationBonus = 0.05; break;
    }
    
    // Effectiveness rating bonus
    let effectivenessBonus = 0;
    switch (data.preservativeEffectiveness) {
      case 'Very Effective': effectivenessBonus = 0.20; break;
      case 'Somewhat Effective': effectivenessBonus = 0.10; break;
      case 'Not Very Effective': effectivenessBonus = -0.10; break;
    }
    
    const overallEffectiveness = Math.min(1, avgEffectiveness + compatibilityScore + durationBonus + effectivenessBonus);
    
    return {
      effectivenessBoost: overallEffectiveness * 40, // Up to 40% reduction
      timeExtension: overallEffectiveness * 50, // Up to 50% time extension
      overallScore: overallEffectiveness * 100
    };
  }
  
  private generatePreservativeRecommendations(data: EnvironmentalData, impact: {
    effectivenessBoost: number;
    timeExtension: number;
    overallScore: number;
}) {
    const recommendations: string[] = [];
    
    if (data.traditionalPreservatives?.length === 0) {
      recommendations.push("Consider using traditional preservatives like cloves or neem leaves");
      return recommendations;
    }
    
    // Positive feedback
    if (impact.overallScore > 70) {
      recommendations.push("Your traditional preservation methods are highly effective! Continue using them.");
    } else if (impact.overallScore > 40) {
      recommendations.push("Your traditional methods are helping, but there's room for improvement.");
    }
    
    // Specific preservative advice
    data.traditionalPreservatives.forEach(preservative => {
      const preservativeData = traditionalPreservatives[preservative as keyof typeof traditionalPreservatives];
      if (preservativeData) {
        // Check if this preservative is good for the crop
        const compatibleCrops = cropPreservativeCompatibility[data.cropType as keyof typeof cropPreservativeCompatibility];
        if (compatibleCrops && compatibleCrops.includes(preservative)) {
          recommendations.push(`✓ ${preservativeData.name} is excellent for ${data.cropType}`);
          recommendations.push(`  → Use: ${preservativeData.application}`);
        } else {
          recommendations.push(`⚠ ${preservativeData.name} may not be optimal for ${data.cropType}`);
        }
      }
    });
    
    // Quantity advice
    if (data.preservativeQuantity === 'light') {
      recommendations.push("Consider increasing the amount of preservatives for better protection");
    } else if (data.preservativeQuantity === 'heavy') {
      recommendations.push("Using too much preservative may affect crop quality. Follow recommended amounts.");
    }
    
    // Additional suggestions
    const compatibleOptions = cropPreservativeCompatibility[data.cropType as keyof typeof cropPreservativeCompatibility] || [];
    const unusedCompatible = compatibleOptions.filter(opt => 
      !data.traditionalPreservatives.includes(opt)
    );
    
    if (unusedCompatible.length > 0) {
      const suggestion = unusedCompatible[0];
      const preservativeData = traditionalPreservatives[suggestion as keyof typeof traditionalPreservatives];
      if (preservativeData) {
        recommendations.push(`💡 Try adding ${preservativeData.name} for enhanced protection`);
      }
    }
    
    return recommendations;
  }
  
  private getBasePrediction(data: EnvironmentalData): Omit<PredictionResult, 'preservativeImpact' | 'traditionalMethodsScore' | 'preservativeRecommendations'> {
    // Your existing prediction logic here
    // This is a simplified version for demonstration
    let probability = 0.1;
    let days = 30;
    
    // Temperature impact
    if (+data.temperature > 30 || +data.temperature < 10) {
      probability += 0.3;
      days -= 10;
    }
    
    // Humidity impact
    if (+data.humidity > 70) {
      probability += 0.2;
      days -= 5;
    }
    
    // Pest impact
    if (data.pestPresence) {
      probability += 0.4;
      days -= 15;
    }
    
    // Quality impact
    if (data.initialQuality && data.initialQuality < 5) {
      probability += 0.2;
      days -= 8;
    }
    
    // Duration impact
    probability += Math.min(+data.storageDuration / 100, 0.5);
    days -= +data.storageDuration / 5;
    
    // Clamp values
    probability = Math.min(Math.max(probability, 0), 1);
    days = Math.max(days, 1);
    
    let alertLevel: 'low' | 'medium' | 'high' = 'low';
    if (probability > 0.7) alertLevel = 'high';
    else if (probability > 0.4) alertLevel = 'medium';
    
    const recommendations: string[] = [];
    if (+data.temperature > 30) {
      recommendations.push('Reduce storage temperature below 25°C');
    }
    if (+data.humidity > 70) {
      recommendations.push('Improve ventilation or use dehumidifiers');
    }
    if (data.pestPresence) {
      recommendations.push('Apply appropriate pest control measures immediately');
    }
    if (probability > 0.6) {
      recommendations.push('Consider selling immediately to minimize losses');
    }
    if (recommendations.length === 0) {
      recommendations.push('Storage conditions are optimal. Continue monitoring.');
    }
    
    return {
      spoilageProbability: probability,
      timeToSpoilage: Math.round(days),
      alertLevel,
      recommendations
    };
  }
}