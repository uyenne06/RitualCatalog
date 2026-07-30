// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuthStore } from "../stores/auth.store";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../hooks/useAuth";
import { loginSchema, type LoginSchemaType } from "../schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

export default function LoginPage() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const setTokens = useAuthStore((state) => state.setTokens);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const loginMutation = useLoginMutation(); // khai báo

  const {
    // function để đăng ký input với RHF
    register,
    handleSubmit, // wrapper cho submit handler - chạy validation trước
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    //mode: khi nào validata ?
    mode: "onTouched",
    // onSubmit: validate khi bấm submit (rcm cho beginners)
    // onChange: validate realtime khi gõ
    // onBlur: validate khi rời khỏi field
    // onTouched: validate sau khi đã touh field
    // resolver: kết nối zod schema với RHF
    resolver: zodResolver(loginSchema), // dapter chuyển zod validation => RHF errors format

    //defaultValues: Giá trị khởi tạo
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    // 1. Gọi API login, lấy access & refresh token
    // const email = data.email;
    // const password = data.password;
    // console.log(data);
    // const response = await authApi.login({ email, password });
    // console.log("Login thành công, token nhận được:", data);
    // // lưu 2 token trả về
    // setTokens(response.accessToken, response.refreshToken);
    // 2. Login xong quay lại đúng trang cũ
    // const from = (location.state as any)?.from?.pathname || "/";
    // navigate(from, { replace: true });
    loginMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Đăng nhập để tiếp tục</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className={errors.email ? "border-destructive" : ""}
                {...register("email")}
                required
              />
              {errors.email && (
                <p className="text-destructive text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className={errors.password ? "border-destructive" : ""}
                placeholder="••••••••"
                {...register("password")}
                required
              />
              {errors.password && (
                <p className="text-destructive text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending || isSubmitting}
            >
              {(loginMutation.isPending || isSubmitting) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {loginMutation.isPending || isSubmitting
                ? "Đang đăng nhập..."
                : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
