export function formatDate(date: Date | string, format: "short" | "long" = "short"): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (format === "long") {
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export function formatDateRange(start: Date | string, end?: Date | string): string {
  const startStr = formatDate(start, "short");

  if (!end) return startStr;

  const endDate = typeof end === "string" ? new Date(end) : end;
  const startDate = typeof start === "string" ? new Date(start) : start;

  if (startDate.getFullYear() === endDate.getFullYear()) {
    return `${formatDate(start, "short").split(" ").slice(0, 1).join(" ")} - ${formatDate(end, "short")}`;
  }

  return `${startStr} - ${formatDate(end, "short")}`;
}

export function getRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}