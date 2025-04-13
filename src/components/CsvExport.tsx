
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { LeadScore } from '@/utils/lead-scoring';

interface CsvExportProps {
  leadScore: LeadScore | null;
  disabled?: boolean;
}

const CsvExport: React.FC<CsvExportProps> = ({ leadScore, disabled }) => {
  const handleExport = () => {
    if (!leadScore) return;
    
    // Create CSV content
    const headers = ["Service Requested", "ZIP Code", "Source", "Score", "Reasoning", "Timestamp"];
    const data = [
      leadScore.leadData.serviceRequested,
      leadScore.leadData.zipCode,
      leadScore.leadData.source,
      leadScore.score,
      `"${leadScore.reasoning}"`, // Quotes to handle commas in reasoning
      leadScore.timestamp
    ];
    
    const csvContent = [
      headers.join(','),
      data.join(',')
    ].join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `lead-score-${new Date().getTime()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={disabled || !leadScore}
      className="text-gray-300 border-gray-700 hover:bg-gray-800"
    >
      <Download className="h-4 w-4 mr-2" />
      Export CSV
    </Button>
  );
};

export default CsvExport;
