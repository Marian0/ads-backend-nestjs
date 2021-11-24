type LogTypes = "info" | "error";

export const printLog = (content: string, type: LogTypes = "info"): void => {
  switch (type) {
    case "info":
      console.info(`>>> 💬 ${content}`);
      break;
    case "error":
      console.info(`>>> 🔴 ${content}`);
      break;
    default:
      console.log(`>>> ${content}`);
      break;
  }
};
