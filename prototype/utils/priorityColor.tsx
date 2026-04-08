export const priorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "#f59e0b";
    case "Medium":
      return "#3b82f6";
    case "Low":
      return "#10b981";
    default:
      return "#3b82f6";
  }
};
