import { SeverityChart } from "@/components/dashboard/SeverityChart";
import { AlertsTimelineChart } from "@/components/dashboard/AlertsTimelineChart";
import { IncidentStatusChart } from "@/components/dashboard/IncidentStatusChart";
import { SourceChart } from "@/components/dashboard/SourceChart";
import { OrgSecurityScore } from "@/components/dashboard/OrgSecurityScore";
import { ConnectorHealth } from "@/components/dashboard/ConnectorHealth";
import { useRealtimeIncidents } from "@/hooks/useRealtimeIncidents";

export default function Analytics() {
  // Subscribe to real-time incident updates
  useRealtimeIncidents();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Security metrics and trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-2">
          <OrgSecurityScore />
        </div>
        <div className="col-span-1 md:col-span-2">
          <ConnectorHealth />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsTimelineChart />
        <SeverityChart />
        <IncidentStatusChart />
        <SourceChart />
      </div>
    </div>
  );
}
