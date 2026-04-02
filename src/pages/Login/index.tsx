import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { WaveBackground } from "@/components/wave-background";

import { Mail, Lock, EyeOff, Eye } from "lucide-react";

import { loginSchema, type LoginFormValues } from "./login-schema";

import { USERS_MOCK } from "@/mocks/users.mock";

import LogoLight from "@/assets/imgs/logos/logo-light.webp";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const { login } = useAuthStore();

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

    if (!user) {
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

    const userParse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    };

    login(userParse);

    navigate("/dashboard");
  }

  return (
    <main className="grid min-h-screen w-full place-items-center p-6 bg-cover bg-bottom bg-no-repeat">
      <div className="fixed top-16 md:top-20 lg:top-16 md:left-16 w-40 flex justify-center">
        <img
          src={LogoLight}
          alt="Logo Onda Finance"
          width="500"
          height="100"
          className="w-auto"
        />
      </div>

      <WaveBackground />
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center gap-3">
          <CardTitle variant={"huge"}>Faça login na Onda Finance</CardTitle>
          <CardDescription>
            Digite seu e-mail e senha abaixo para acessar sua conta
          </CardDescription>
        </CardHeader>

        <Separator />

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
                      <InputGroup className="min-h-12">
                        <InputGroupAddon
                          align="inline-start"
                          className="h-full px-3 bg-primary rounded-s-xl"
                        >
                          <Mail className="text-foreground" />
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
                        <FieldLabel htmlFor="password-form">Senha:</FieldLabel>
                        <InputGroup className="min-h-12">
                          <InputGroupAddon
                            align="inline-start"
                            className="h-full px-3 bg-primary rounded-s-xl"
                          >
                            <Lock className="text-foreground" />
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
                            className="h-full px-3 bg-primary cursor-pointer rounded-e-xl"
                            onClick={() => setIsVisible((prev) => !prev)}
                          >
                            {isVisible ? (
                              <EyeOff className="text-foreground" />
                            ) : (
                              <Eye className="text-foreground" />
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
                    className="ml-auto inline-block font-normal text-muted-foreground 
                    underline-offset-4 underline [:hover]:text-primary-foreground"
                  >
                    Esqueceu sua senha?
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
            <FieldDescription className="text-center [&>a:hover]:text-primary-foreground">
              Não tem uma conta <a href="#">Cadastre-se</a>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginPage;
