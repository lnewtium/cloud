declare module "config" {
  interface IConfig {
    serverPort: number;
    dbUrl: string;
    secretKey: string;
    filePath: string;
    staticPath: string;
  }

  const config: IConfig;
  export = config;
}
