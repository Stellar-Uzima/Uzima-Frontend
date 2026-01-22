import { Badge } from "@/components/ui/badge";

interface SyncBadgeProps {
  status: "pending" | "synced";
}

export default function SyncBadge({ status }: SyncBadgeProps) {
  if (status === "synced") {
    return (
      <Badge variant="default" className="bg-green-500 hover:bg-green-600">
        <svg
          className="w-3 h-3 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        Synced
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
      <svg
        className="w-3 h-3 mr-1 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      Pending
    </Badge>
  );
}
