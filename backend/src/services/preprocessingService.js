import Joi from "joi";

export const telemetrySchema = Joi.object({
  ts: Joi.date().required(),
  machine_id: Joi.string().required(),
  temp: Joi.number().required(),
  vib: Joi.number().required(),
  current_a: Joi.number().optional(),
  rpm: Joi.number().optional(),
});

export function validateTelemetry(payload) {
  const { error, value } = telemetrySchema.validate(payload);
  if (error) throw new Error(error.details[0].message);
  return value;
}
