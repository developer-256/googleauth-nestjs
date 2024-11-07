namespace NodeJS {
  interface ProcessEnv {
    AUTH_SECRET: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_SECRET: string;
    GOOGLE_CALLBACK_URL: string;

    AZURE_CLIENT_ID: string;
    AZURE_CLIENT_SECRET: string;
    AZURE_CALLBACK_URL: string;
    AZURE_TENANT_ID: string;
  }
}
