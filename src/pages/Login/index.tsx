import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

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

import { Mail, Lock, EyeOff } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginPage: React.FC = () => {
  const [loggingIn, setLoggingIn] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form Data:", data);
    setLoggingIn(true);

    // Simulate an API call
    setTimeout(() => {
      setLoggingIn(false);
    }, 2000);
  }

  return (
    <div className="grid min-h-screen w-full place-items-center px-4">
      <Card className="w-full max-w-md flex">
        <CardHeader>
          <CardTitle variant={"huge"} className="text-center py-4">
            Welcome to Onda Finance
          </CardTitle>
          <CardTitle variant={"subtitle"}>Login to your account</CardTitle>
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
                      <InputGroup>
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
                        <InputGroup>
                          <InputGroupAddon
                            align="inline-start"
                            className="px-2"
                          >
                            <Lock className="text-muted-foreground" />
                          </InputGroupAddon>
                          <InputGroupInput
                            {...field}
                            id="password-form"
                            type="password"
                            placeholder="••••••••"
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align="inline-end" className="px-2">
                            <EyeOff className="text-muted-foreground" />
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
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Field>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              form="login-form"
              disabled={loggingIn}
            >
              {loggingIn ? (
                <>
                  <Spinner />
                  Wait
                </>
              ) : (
                "Login"
              )}
            </Button>
            <Button type="submit" className="w-full" variant="ghost">
              Create an account
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
