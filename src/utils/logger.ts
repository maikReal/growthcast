export class Logger {
  // Get a filename path to use in logs
  private static getCurrentFilePath() {
    const splittedFilepath = __filename.split("src")
    const filepath = splittedFilepath
      ? splittedFilepath[1]
      : "Outer app/ folder"
    return filepath
  }

  // All configurations are available in the root sentry files
  public static logInfo(message: string) {
    message = `✅ [DEBUG - ${this.getCurrentFilePath()}] ` + message
    console.log(message)
  }

  public static logError = (error: string) => {
    error = `❌ [ERROR - ${this.getCurrentFilePath()}]` + error
    console.log(error)
  }
}
