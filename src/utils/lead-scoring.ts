
// This file contains utility functions for lead scoring

// OpenAI API client mock
const evaluateLeadWithAI = async (leadData: LeadData): Promise<{ score: number; reasoning: string }> => {
  try {
    // This is a simplified mock of an OpenAI API call
    // In a real application, this would make an actual API call to OpenAI
    console.log("Evaluating lead with OpenAI:", leadData);
    
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Scoring algorithm (mock)
    let score = 50; // Base score
    
    // Service requested relevance (basic heuristic)
    const highValueServices = ["consulting", "premium", "enterprise", "full service"];
    if (leadData.serviceRequested && highValueServices.some(service => 
      leadData.serviceRequested.toLowerCase().includes(service)
    )) {
      score += 20;
    }
    
    // ZIP code evaluation (mock geographic targeting)
    const highValueZipPrefixes = ["100", "941", "606", "945", "902"]; // Example high-value areas
    if (leadData.zipCode && highValueZipPrefixes.some(prefix => 
      leadData.zipCode.startsWith(prefix)
    )) {
      score += 15;
    }
    
    // Source evaluation
    const highValueSources = ["referral", "direct", "organic", "partner"];
    if (leadData.source && highValueSources.some(source => 
      leadData.source.toLowerCase().includes(source)
    )) {
      score += 15;
    }
    
    // Add some randomness to simulate AI variance
    score += Math.floor(Math.random() * 10);
    
    // Cap the score between 1-100
    score = Math.max(1, Math.min(100, score));
    
    const reasoning = generateReasoning(leadData, score);
    
    return { 
      score,
      reasoning 
    };
  } catch (error) {
    console.error("Error evaluating lead with AI:", error);
    return {
      score: 30, // Default lower score on error
      reasoning: "Error occurred during evaluation. Score based on limited data."
    };
  }
};

// Generate a human-readable reasoning for the score
const generateReasoning = (leadData: LeadData, score: number): string => {
  const reasons = [];
  
  // Service evaluation
  if (leadData.serviceRequested) {
    if (leadData.serviceRequested.toLowerCase().includes("premium") || 
        leadData.serviceRequested.toLowerCase().includes("enterprise")) {
      reasons.push("High-value service requested");
    } else {
      reasons.push(`Service type "${leadData.serviceRequested}" has moderate conversion potential`);
    }
  }
  
  // ZIP code evaluation
  if (leadData.zipCode) {
    const highValueZipPrefixes = ["100", "941", "606", "945", "902"];
    if (highValueZipPrefixes.some(prefix => leadData.zipCode.startsWith(prefix))) {
      reasons.push(`Lead from high-value location (${leadData.zipCode})`);
    } else {
      reasons.push(`Location (${leadData.zipCode}) has typical conversion rates`);
    }
  }
  
  // Source evaluation
  if (leadData.source) {
    if (leadData.source.toLowerCase().includes("referral")) {
      reasons.push("Referral leads typically have high conversion rates");
    } else if (leadData.source.toLowerCase().includes("organic")) {
      reasons.push("Organic traffic indicates genuine interest");
    } else if (leadData.source.toLowerCase() === "social") {
      reasons.push("Social media leads have variable conversion rates");
    } else {
      reasons.push(`Lead source "${leadData.source}" has average quality indicators`);
    }
  }
  
  // Add score-based summary
  if (score > 80) {
    reasons.push("Overall excellent prospect based on combined factors");
  } else if (score > 60) {
    reasons.push("Above average potential for conversion");
  } else if (score > 40) {
    reasons.push("Moderate likelihood of conversion");
  } else {
    reasons.push("May require additional nurturing before conversion");
  }
  
  return reasons.join(". ") + ".";
};

// Simulate CRM integration
export const updateCRM = async (leadData: LeadData, score: number, reasoning: string): Promise<boolean> => {
  try {
    // This would be a real API call to a CRM in a production app
    console.log("Updating CRM with lead score:", { leadData, score, reasoning });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Always return success in this mock
    return true;
  } catch (error) {
    console.error("Error updating CRM:", error);
    return false;
  }
};

// Export the lead scoring function
export async function scoreLeadWithAI(leadData: LeadData): Promise<LeadScore> {
  const result = await evaluateLeadWithAI(leadData);
  
  return {
    leadData,
    score: result.score,
    reasoning: result.reasoning,
    timestamp: new Date().toISOString()
  };
}

// Types
export interface LeadData {
  serviceRequested: string;
  zipCode: string;
  source: string;
  [key: string]: string; // Allow additional fields
}

export interface LeadScore {
  leadData: LeadData;
  score: number;
  reasoning: string;
  timestamp: string;
}
