import { z } from "zod";

const userSchema = z.object({
    user: z.string().min(1).max(10),
    password: z.string().min(1).max(15)
});

const validate =
    (schema) =>
        async (req, res, next) => {
            try {
                await schema.parseAsync(req.body);
                next();
            } catch (error) {
                console.log(error);
                return res.json({ status: 1700 });
            };
        };

export { userSchema, validate };