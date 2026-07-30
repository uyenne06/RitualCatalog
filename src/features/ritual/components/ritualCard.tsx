import type { Ritual } from "../type";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";

interface RitualCardProps {
  ritual: Ritual;
}
const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  dễ: {
    label: "Dễ",
    className: "bg-green-100 text-green-700",
  },
  khó: {
    label: "Khó",
    className: "bg-red-100 text-red-600",
  },
  "rất khó": {
    label: "rất khó",
    className: "bg-red-200 text-red-700",
  },
  default: {
    label: "deo co",
    className: "bg-yellow-100 text-yellow-600",
  },
};

export default function RitualCard({ ritual }: RitualCardProps) {
  const keyStatus = ritual.difficultyLevel.toLowerCase() ?? "default:";
  const configStatus = STATUS_CONFIG[keyStatus] ?? STATUS_CONFIG.default;
  return (
    <Card className="group justify-between border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-lg shadow-purple-500 hover:border-blue-200">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <CardTitle className="text-lg font-semibold text-blue-600 leading-snug group-hover:text-blue-700 transition-colors">
          {ritual.name}
        </CardTitle>
        <CardDescription
          className={`shrink-0 inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${configStatus.className}`}
        >
          {ritual.difficultyLevel}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-slate-600 line-clamp-3">
          {ritual.content || "Không có mô tả"}
        </p>

        <div className="flex flex-col gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-600">Âm lịch:</span>
            <span>{ritual.dateLunar}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-600">Dương lịch:</span>
            <span>{ritual.dateSolar || "Không có"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
