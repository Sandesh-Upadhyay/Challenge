
import React from 'react';
import { Button } from '@/components/ui/button';
import { DatabaseIcon, RefreshCw } from 'lucide-react';
import { LeadData } from '@/utils/lead-scoring';

interface DemoLeadsProps {
  onSelectLead: (lead: LeadData) => void;
}

const DemoLeads: React.FC<DemoLeadsProps> = ({ onSelectLead }) => {
  // Sample demo leads
  const demoLeads: LeadData[] = [
    {
      serviceRequested: "Premium Enterprise Consulting",
      zipCode: "10012",
      source: "Referral"
    },
    {
      serviceRequested: "Basic Support Package",
      zipCode: "90210",
      source: "Social Media"
    },
    {
      serviceRequested: "Standard Implementation",
      zipCode: "60611",
      source: "Organic Search"
    }
  ];
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <DatabaseIcon className="h-4 w-4 text-gray-400 mr-2" />
        <h3 className="text-sm font-medium text-gray-300">Demo Data</h3>
      </div>
      <div className="text-xs text-gray-500 mb-3">
        Click to load sample leads for demonstration
      </div>
      <div className="space-y-2">
        {demoLeads.map((lead, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelectLead(lead)}
            className="w-full justify-start text-left border-gray-700 hover:bg-gray-800 text-gray-300"
          >
            <div className="truncate">
              <span className="font-medium">{lead.serviceRequested}</span>
              <span className="text-gray-500 ml-2">({lead.source})</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DemoLeads;
