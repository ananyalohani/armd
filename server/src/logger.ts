class Logger {
  constructor(private readonly name: string) {}

  info(message: string) {
    console.log(`[${this.name}] ${message}`);
  }

  error(message: string) {
    console.error(`[${this.name}] ${message}`);
  }
}

export default Logger;
