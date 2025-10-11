// Schemas para Swagger
export const userSwaggerSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    phone: { type: "string" },
    role: { type: "string", enum: ["user", "admin"] },
    dni: { type: "string" },
    birthdate: { type: "string", format: "date" },
    address: { type: "string" },
    postalCode: { type: "string" },
    dniImg: { type: "string" },
    profileImg: { type: "string" },
  },
};

export const createUserSwaggerSchema = {
  type: "object",
  required: ["firstName", "lastName", "email", "password", "dni", "birthdate", "address"],
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    phone: { type: "string" },
    password: { type: "string", minLength: 6 },
    dni: { type: "string" },
    birthdate: { type: "string", format: "date" },
    address: { type: "string" },
    postalCode: { type: "string" },
    dniImg: { type: "string" },
    profileImg: { type: "string" },
    role: { type: "string", enum: ["user", "admin"], default: "user" },
  },
};

export const updateUserSwaggerSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    phone: { type: "string" },
    address: { type: "string" },
    postalCode: { type: "string" },
    dniImg: { type: "string" },
    profileImg: { type: "string" },
  },
};
