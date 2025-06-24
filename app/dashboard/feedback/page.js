import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function FeedbackTable() {
  const feedback = [
    { date: "2025-06-24", rating: 5, category: "Service", comment: "Great experience!", flagged: false },
    { date: "2025-06-23", rating: 2, category: "Cleanliness", comment: "Tables were dirty", flagged: true },
    { date: "2025-06-22", rating: 4, category: "Food", comment: "Tasty and fresh!", flagged: false },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Feedback</h1>

      <Input placeholder="Search feedback..." className="mb-4 max-w-sm" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Flag</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedback.map((item, idx) => (
            <TableRow key={idx} className={item.flagged ? "bg-red-50" : ""}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.rating} ⭐</TableCell>
              <TableCell>
                <Badge variant="outline">{item.category}</Badge>
              </TableCell>
              <TableCell>{item.comment}</TableCell>
              <TableCell>{item.flagged ? "🚩" : ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
