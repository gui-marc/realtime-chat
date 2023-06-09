import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../components/form/Button";
import Card from "../components/presentation/Card";
import CardRow from "../components/presentation/CardRow";
import Center from "../components/presentation/Center";
import FormInput from "../components/form/FormInput";
import { registerUserSchema } from "../schemas/userSchemas";
import { register as registerUser } from "../api/authentication";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(data: any) {
    const result = registerUserSchema.safeParse(data);

    if (!result.success) {
      console.error("invalid data");
      return;
    }

    await registerUser(result.data);

    // todo: Show toast
    // todo: Handle errors

    navigate("/login");
  }

  return (
    <Center>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Card className="w-full">
          <CardRow>
            <h1 className="font-bold">Register</h1>
            <p className="text-slate11 text-sm">Sign up to start chatting</p>
          </CardRow>
          <CardRow className="space-y-3">
            <FormInput
              placeholder="Type here your name"
              label="Full Name"
              {...register("name")}
              error={errors.name}
            />
            <FormInput
              placeholder="Type here your best email"
              label="Email"
              {...register("email")}
              error={errors.email}
            />
          </CardRow>
          <CardRow className="space-y-3">
            <FormInput
              placeholder="*******"
              label="Password"
              isPassword
              {...register("password")}
              error={errors.password}
            />
            <FormInput
              placeholder="*******"
              label="Confirm your password"
              isPassword
              {...register("confirm")}
              error={errors.confirm}
            />
          </CardRow>
          <CardRow className="space-y-5">
            <Button disabled={!isValid} fullWidth>
              Register
            </Button>
            <Button intent="secondary" fullWidth asChild>
              <Link to="/login">Login</Link>
            </Button>
          </CardRow>
        </Card>
      </form>
    </Center>
  );
}
