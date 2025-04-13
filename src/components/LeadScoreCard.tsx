
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LeadScore } from '@/utils/lead-scoring';

interface LeadScoreCardProps {
  leadScore: LeadScore;
  className?: string;
}

const LeadScoreCard: React.FC<LeadScoreCardProps> = ({ leadScore, className }) => {
  // Determine score category and styling
  const getScoreCategory = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'bg-green-600 text-white' };
    if (score >= 60) return { label: 'Good', color: 'bg-blue-500 text-white' };
    if (score >= 40) return { label: 'Average', color: 'bg-yellow-500 text-white' };
    return { label: 'Poor', color: 'bg-red-500 text-white' };
  };

  const scoreCategory = getScoreCategory(leadScore.score);

  return (
    <Card className={`overflow-hidden border-gray-800 bg-operatorOS ${className}`}>
      <CardHeader className="bg-operatorOS-accent py-4 px-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white">Lead Score Results</CardTitle>
          <Badge className={scoreCategory.color}>
            {scoreCategory.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Score</span>
            <span className="text-2xl font-bold">{leadScore.score}/100</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full bg-blue-500"
              style={{ width: `${leadScore.score}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-gray-400 mb-2">AI Reasoning</h3>
          <p className="text-white">{leadScore.reasoning}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-800 p-3 rounded-md">
            <div className="text-gray-400 text-sm mb-1">Service Requested</div>
            <div className="font-medium">{leadScore.leadData.serviceRequested}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-md">
            <div className="text-gray-400 text-sm mb-1">ZIP Code</div>
            <div className="font-medium">{leadScore.leadData.zipCode}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-md">
            <div className="text-gray-400 text-sm mb-1">Source</div>
            <div className="font-medium">{leadScore.leadData.source}</div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-4">
          Evaluated on: {new Date(leadScore.timestamp).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadScoreCard;
