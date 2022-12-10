class Logger {
  constructor(private readonly name: string) {}

  info(...messages: string[]) {
    console.log(`[${this.name}]`, ...messages);
  }

  error(...messages: string[]) {
    console.error(`[${this.name}]`, ...messages);
  }
}

export default Logger;
