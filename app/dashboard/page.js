import { Card, CardContent } from "@/components/ui/card";

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Total Feedback", value: "128" },
          { label: "Average Rating", value: "4.6 ⭐" },
          { label: "Flagged Responses", value: "5" },
        ].map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-xl font-semibold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border h-64 flex items-center justify-center text-gray-400">
          Pie Chart Placeholder
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border h-64 flex items-center justify-center text-gray-400">
          Line Chart Placeholder
        </div>
      </div>
    </div>
  );
}
