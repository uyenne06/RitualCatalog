import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../hooks/useAuth";
import { registerSchema, type RegisterSchemaType } from "../schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";

// import { registerSchema, type RegisterSchemaType } from "../utils/rules";
// import { useRegisterMutation } from "@/hooks/useAuth";

export default function RegisterPage() {
  console.log("component render...");
  // const navigate = useNavigate();
  // const location = useLocation();
  // const setTokens = useAuthStore((state) => state.setTokens);
  // const [fullName, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const registerMutation = useRegisterMutation(); // khai báo

  const {
    register, // function để đăng ký input với RHF
    handleSubmit, // wrapper cho submit handler - chạy validation trước
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    //mode: khi nào validata ?
    mode: "onTouched",
    // onSubmit: validate khi bấm submit (rcm cho beginners)
    // onChange: validate realtime khi gõ
    // onBlur: validate khi rời khỏi field
    // onTouched: validate sau khi đã touh field
    // resolver: kết nối zod schema với RHF
    resolver: zodResolver(registerSchema), // dapter chuyển zod validation => RHF errors format

    //defaultValues: Giá trị khởi tạo
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    // const email = data.email;
    // const password = data.password;
    // console.log(data);
    // const response = await authApi.register({ email, password });
    // console.log("Đăng ký thành công, token nhận được:", data);
    // // console.log(data.accessToken, data.refreshToken);
    // // lưu 2 token trả về
    // setTokens(response.accessToken, response.refreshToken);
    registerMutation.mutate(data);
    // registerMutation.mutate(data);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription>Đăng ký để bắt đầu học react </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                className={errors.fullName ? "border-destructive" : ""}
                type="text"
                placeholder="John Doe"
                //Spread operator này tương đương"

                {...register("fullName")}
                required
              />
              {errors.fullName && (
                <p className="text-destructive text-xs">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className={errors.email ? "border-destructive" : ""}
                placeholder="m@example.com"
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
                className={errors.password ? "border-destructive" : ""}
                type="password"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                className={errors.confirmPassword ? "border-destructive" : ""}
                placeholder="••••••••"
                {...register("confirmPassword")}
                required
              />
              {errors.confirmPassword && (
                <p className="text-destructive text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending || isSubmitting}
            >
              {(registerMutation.isPending || isSubmitting) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {registerMutation.isPending || isSubmitting
                ? "Đang đăng ký..."
                : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
