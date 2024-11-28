import { InferType, object, string, ValidationError } from 'yup';

export enum NODE_ENV_ENUM {
  development = 'development',
  production = 'production',
}

export const envConfigSchema = object({
  NODE_ENV: string().required().oneOf(Object.values(NODE_ENV_ENUM)),
  APP_SECRET: string().required().nonNullable(),
  API_URL: string().required().nonNullable(),
  API_COOKIE_KEY: string().required().nonNullable(),
  FRONTEND_URL: string().required().nonNullable(),
});

export type IEnvConfig = InferType<typeof envConfigSchema>;

/**
 * Configuration
 */
export default (): IEnvConfig => ({
  NODE_ENV: process.env?.NODE_ENV as IEnvConfig['NODE_ENV'],
  APP_SECRET: process.env?.APP_SECRET as string,
  API_URL: process.env?.API_URL as string,
  API_COOKIE_KEY: process.env?.API_COOKIE_KEY as string,

  FRONTEND_URL: process.env?.FRONTEND_URL as string,
});

/**
 * Validate
 */
export function validate(config: Record<string, unknown>) {
  try {
    return envConfigSchema.validateSync(config);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new Error(error.message);
    }
    throw error;
  }
}
