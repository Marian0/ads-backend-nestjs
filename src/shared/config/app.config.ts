import { ConfigModuleOptions } from "@nestjs/config";
import * as Joi from "joi";

// Application settings type
export type AppConfigType = {
  NODE_ENV: "development" | "production";
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_DATABASE: string;
  APP_PORT: number;
};

export const AppConfig: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object<AppConfigType>({
    NODE_ENV: Joi.string().valid("development", "production").required(),
    MYSQL_HOST: Joi.string().required(),
    MYSQL_PORT: Joi.number().required(),
    MYSQL_USER: Joi.string().required(),
    MYSQL_PASSWORD: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().required(),
    APP_PORT: Joi.number().required(),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
