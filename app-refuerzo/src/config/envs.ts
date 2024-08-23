import 'dotenv/config';
import * as joi from 'joi';

interface EnvVariables {
  PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Enviroment variables has errors: ${error.message}`);
}

const envVariables: EnvVariables = value;

export const envs = {
  port: envVariables.PORT,
};
