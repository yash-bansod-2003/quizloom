import { ZodError } from "zod";
import { ErrorResponse } from "@/middlewares/error-handler";

const zodErrorAdapter = (error: ZodError): ErrorResponse => {
  return {
    name: "Validation Error",
    code: 400,
    errors: error.errors.map((err) => ({
      message: err.message,
      path: err.path.join(","),
    })),
  };
};

export default zodErrorAdapter;
