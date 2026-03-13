import { Upload, FileText, Image, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const records = [
  { name: "Blood Test Report", type: "Lab Report", date: "Mar 10, 2026", verified: true },
  { name: "ECG Report", type: "Diagnostic", date: "Mar 5, 2026", verified: true },
  { name: "Dr. Chen Prescription", type: "Prescription", date: "Feb 28, 2026", verified: false },
  { name: "Chest X-Ray", type: "X-Ray", date: "Feb 15, 2026", verified: true },
  { name: "Thyroid Panel Results", type: "Lab Report", date: "Jan 20, 2026", verified: true },
];

const MedicalRecords = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Medical Records</h1>
          <p className="text-muted-foreground mt-1">Upload and manage your health documents securely</p>
        </div>

        {/* Upload Section */}
        <div className="rounded-xl border-2 border-dashed border-border bg-card p-8 text-center">
          <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="font-semibold text-foreground mb-1">Upload Medical Documents</h3>
          <p className="text-sm text-muted-foreground mb-4">Prescriptions, lab reports, X-rays (PDF, JPG, PNG)</p>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Choose Files
          </Button>
        </div>

        {/* Records List */}
        <div className="space-y-3">
          {records.map((record, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-medical-blue-light text-primary">
                {record.type === "X-Ray" ? <Image className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{record.name}</h4>
                <p className="text-xs text-muted-foreground">{record.type} · {record.date}</p>
              </div>
              <div className="flex items-center gap-2">
                {record.verified ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-medical-green">
                    <Shield className="h-3.5 w-3.5" />
                    Blockchain Verified
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">Pending verification</span>
                )}
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecords;
