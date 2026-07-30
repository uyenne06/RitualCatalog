import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Fullname là bắt buộc" })
      .min(3, { message: "Fullname phải có ít nahast 3 ký tự" }),

    email: z
      .email({ message: "Email không đúng định dạng" })
      .min(1, { message: "Email là bắt buộc" }),

    password: z
      .string()
      .min(1, { message: "Password là bắt buộc" })
      .min(6, { message: "Password phải có ít nhất 6 ký tự" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Nhập lại mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .email({ message: "Email không đúng định dạng" })
    .min(1, { message: "Email là bắt buộc" }),

  password: z
    .string()
    .min(1, { message: "Password là bắt buộc" })
    .min(6, { message: "Password phải có ít nhất 6 ký tự" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
