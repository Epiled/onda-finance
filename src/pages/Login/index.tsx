import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/hooks/useAuthStore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";

import { Mail, Lock, EyeOff, Eye } from "lucide-react";

import { loginSchema, type LoginFormValues } from "./login-schema";

import { useTransactionStore } from "@/hooks/useTransactionStore";

import { USERS_MOCK } from "@/mocks/users.mock";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const { login } = useAuthStore();
  
  const transactions = useTransactionStore((state) => state.transactions);

  useEffect(() => {
    if (!localStorage.getItem("onda-finance-transations")) {
      useTransactionStore.setState({ transactions: transactions });
    }
  }, [transactions]);

  const [isVisible, setIsVisible] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    const user = USERS_MOCK.find((user) => user.email === data.email);
    const { password, ...userParse } = user;

    console.log(user, userParse);

    if (!user || user.password !== data.password) {
      form.setError("root", {
        message: "E-mail ou senha inválidos.",
      });
      return;
    }

    if (user.status === "INACTIVE") {
      form.setError("root", {
        message: "Sua conta está desativada. Contate o suporte.",
      });
      return;
    }

    login(userParse);

    navigate("/dashboard");
  }

  return (
    <div className="grid min-h-screen w-full place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle variant={"huge"} className="mb-5">
            Sign in to Onda Finance
          </CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet className="w-full">
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email-form">E-mail:</FieldLabel>
                      <InputGroup className="min-h-10">
                        <InputGroupAddon align="inline-start" className="px-2">
                          <Mail className="text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                          {...field}
                          id="email-form"
                          type="text"
                          placeholder="max.leiter@example.com"
                          aria-invalid={fieldState.invalid}
                        />
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <div className="flex flex-col items-center gap-2">
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password-form">
                          Password:
                        </FieldLabel>
                        <InputGroup className="min-h-10">
                          <InputGroupAddon
                            align="inline-start"
                            className="px-2"
                          >
                            <Lock className="text-muted-foreground" />
                          </InputGroupAddon>
                          <InputGroupInput
                            {...field}
                            id="password-form"
                            type={isVisible ? "text" : "password"}
                            placeholder="••••••••"
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon
                            align="inline-end"
                            className="px-2"
                            onClick={() => setIsVisible((prev) => !prev)}
                          >
                            {isVisible ? (
                              <EyeOff className="text-muted-foreground" />
                            ) : (
                              <Eye className="text-muted-foreground" />
                            )}
                          </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </FieldGroup>
            </FieldSet>
          </form>
          {form.formState.errors.email && (
            <FieldError errors={[form.formState.errors.email]} />
          )}
          {form.formState.errors.root && (
            <FieldError errors={[form.formState.errors.root]} />
          )}
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Field>
            <Button
              type="submit"
              className="w-full"
              size="lg3"
              form="login-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner />
                  Wait
                </>
              ) : (
                "Login"
              )}
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account? <a href="#">Sign up</a>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
