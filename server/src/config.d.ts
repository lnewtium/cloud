declare module "config" {
  interface IConfig {
    serverPort: number;
    secretKey: string;
    filePath: string;
  }

  const config: IConfig;
  export = config;
}
