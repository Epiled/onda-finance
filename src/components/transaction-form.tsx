"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";

import { useAuthStore } from "@/hooks/useAuthStore";
import { useCreateTransaction } from "@/hooks/useTransactionStore";
import { useUser } from "@/hooks/useUser";

import {
  transactionSchemaForm,
  type TransactionFormValues,
} from "../types/transaction-form-schema";

import { realFormat } from "@/utils/realFormat";
import { toast } from "sonner";

import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "./ui/input-group";

import { Check } from "lucide-react";

import { Stepper } from "./stepper";

export function TransactionForm() {
  const user = useUser();
  const { balance, setBalance } = useAuthStore();

  const { mutate: addTransaction } = useCreateTransaction();

  const [activeTab, setActiveTab] = useState("step-1");

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchemaForm),
    defaultValues: {
      to: "",
      value: 0,
      description: "",
    },
  });

  const steps = [
    {
      id: "step-1",
      label: "1",
    },
    {
      id: "step-2",
      label: "2",
    },
    {
      id: "step-3",
      label: "3",
    },
  ];

  const handleNextStep = async () => {
    const isValid = await form.trigger(["to", "value"]);
    if (isValid) {
      setActiveTab("step-2");
    }
  };

  function onSubmit(data: TransactionFormValues) {
    if (activeTab === "step-1") {
      handleNextStep();
      return;
    }

    const { value, to, description } = data;
    if (balance < value) return;

    const defaultDescription = `Transferência para ${to}`;
    const descriptionParse = description
      ? `${description} - ${defaultDescription}`
      : defaultDescription;

    const transactionObj = {
      id: `tx-${Date.now()}`,
      foreignKey: user.id,
      date: new Date().toISOString(),
      description: descriptionParse,
      type: "EXPENSE",
      value: value,
      status: "COMPLETED",
    };

    addTransaction(transactionObj, {
      onSuccess: () => {
        setBalance(balance - value);
        setActiveTab("step-3");
        form.reset();
        toast.success("Transferência realizada com sucesso!");
      },
      onError: () => {
        console.log("Error");
        toast.error("Erro ao processar transferência.");
      },
    });
  }

  return (
    <div className="w-full flex-col px-4 lg:px-6">
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-xl">Nova transferência</CardTitle>
          <CardDescription>Preencha os dados obrigátorios</CardDescription>
        </CardHeader>

        <Separator />

        <Stepper steps={steps} currentStep={activeTab} />

        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          {activeTab === "step-1" && (
            <div className="flex flex-col gap-4">
              <CardContent>
                <FieldGroup>
                  <Controller
                    name="to"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="form-rhf-input-to"
                          className="text-muted-foreground"
                        >
                          Destinatário: (E-mail)
                        </FieldLabel>
                        <InputGroup className="min-h-12 px-1">
                          <InputGroupInput
                            {...field}
                            id="form-rhf-input-to"
                            aria-invalid={fieldState.invalid}
                            placeholder="ex@example.com"
                            autoComplete="false"
                          />
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                        <FieldDescription>
                          Infome um e-mail válido.
                        </FieldDescription>
                      </Field>
                    )}
                  />

                  <Controller
                    name="value"
                    control={form.control}
                    render={({
                      field: { onChange, value, ...field },
                      fieldState,
                    }) => {
                      const displayValue = realFormat(String(value));

                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="text-muted-foreground">
                            Valor (R$):
                          </FieldLabel>
                          <InputGroup className="min-h-12 px-1">
                            <InputGroupInput
                              {...field}
                              value={displayValue}
                              onChange={(e) => {
                                const digits = e.target.value.replace(
                                  /\D/g,
                                  "",
                                );

                                const numericValue = digits
                                  ? Number(digits) / 100
                                  : 0;

                                onChange(numericValue);
                              }}
                            />
                          </InputGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel
                          htmlFor="form-rhf-input-description"
                          className="text-muted-foreground"
                        >
                          Descrição: (Opcional)
                        </FieldLabel>
                        <InputGroup className="min-h-12 px-1">
                          <InputGroupTextarea
                            {...field}
                            id="form-rhf-input-description"
                            placeholder="Pagamento..."
                            autoComplete="false"
                          />
                        </InputGroup>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </CardContent>

              <Separator />

              <CardFooter>
                <Button
                  type="button"
                  size="lg3"
                  className="rounded-lg"
                  form="form-rhf-input"
                  onClick={handleNextStep}
                >
                  Próximo
                </Button>
              </CardFooter>
            </div>
          )}

          {activeTab === "step-2" && (
            <div className="flex flex-col gap-4">
              <CardContent>
                <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    Confirme os dados da transferência
                  </h3>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm text-muted-foreground">
                      Destinatário:
                    </span>
                    <span className="text-sm font-medium">
                      {form.getValues("to")}
                    </span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm text-muted-foreground">
                      Valor:
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {realFormat(String(form.getValues("value")))}
                    </span>
                  </div>

                  <div className="flex justify-between gap-2">
                    <span className="text-sm text-muted-foreground">
                      Descrição:
                    </span>
                    <span className="text-sm italic text-right">
                      {form.getValues("description")
                        ? `${form.getValues("description")} - Transferência para ${form.getValues("to")}`
                        : `Transferência para ${form.getValues("to")}`}
                    </span>
                  </div>
                </div>
              </CardContent>

              <Separator />

              <CardFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg3"
                  className="rounded-lg"
                  disabled={form.formState.isSubmitting}
                  onClick={() => setActiveTab("step-1")}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  size="lg3"
                  className="rounded-lg"
                  form="form-rhf-input"
                  disabled={form.formState.isSubmitting}
                >
                  Confirmar
                </Button>
              </CardFooter>
            </div>
          )}
        </form>

        {activeTab === "step-3" && (
          <div className="flex flex-col justify-center items-center gap-4">
            <CardContent className="flex flex-col items-center gap-4">
              <div className="bg-primary text-primary-foreground flex aspect-square w-16 shrink-0 items-center justify-center rounded-full">
                <Check className="size-8" strokeWidth={3} />
              </div>
              <h3 className="text-xl">Transferência enviada com sucesso!</h3>
            </CardContent>

            <Separator />

            <CardFooter>
              <Button
                type="submit"
                size="lg3"
                className="rounded-lg"
                onClick={() => setActiveTab("step-1")}
              >
                Nova transferência
              </Button>
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
}
