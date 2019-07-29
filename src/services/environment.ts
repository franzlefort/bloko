// прописано в .env-файлах
const {
  BASE_URL,
  NODE_ENV,
  VUE_APP_GRAPHQL_URL,
  VUE_APP_PROJECT,
} = process.env;

class Environment {
  private _DEVELOPMENT: string;

  private _PRODUCTION: string;

  private _TEST: string;

  private _STAGING: string;

  constructor() {
    this._DEVELOPMENT = 'development';
    this._PRODUCTION = 'production';
    this._TEST = 'testing';
    this._STAGING = 'staging';
  }

  public get CurrentProject(): string {
    return VUE_APP_PROJECT || '';
  }

  public get isDevelopment(): boolean {
    return NODE_ENV === this._DEVELOPMENT || NODE_ENV === this._STAGING;
  }

  public get isStaging(): boolean {
    return NODE_ENV === this._STAGING;
  }

  public get isProduction(): boolean {
    return NODE_ENV === this._PRODUCTION;
  }

  public get baseUrl(): string {
    return BASE_URL || '';
  }

  public get CurrentAPI(): string {
    return this.CurrentEnvironmentAPI;
  }

  private get CurrentEnvironmentAPI(): string {
    return VUE_APP_GRAPHQL_URL || '';
  }
}

const EnvironmentService = new Environment();

export default EnvironmentService;
