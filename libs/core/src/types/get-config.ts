export interface PublicRuntimeConfig {
  analyticsWriteKey: string;
  segmentClientId: string;
  basePath: string;
}

export interface GetConfig {
  serverRuntimeConfig: unknown;
  publicRuntimeConfig: PublicRuntimeConfig;
}
