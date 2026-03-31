"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Input } from "@/components/ui/input";

import { useAuthStore } from "@/hooks/useAuthStore";
import { useCreateTransaction } from "@/hooks/useTransactionStore";
import { useUser } from "@/hooks/useUser";

import {
  transactionSchemaForm,
  type TransactionFormValues,
} from "../types/transaction-form-schema";

import { realFormat } from "@/utils/realFormat";
import { toast } from "sonner";

export function TransactionForm() {
  const user = useUser();
  const { balance, setBalance } = useAuthStore();

  const { mutate: addTransaction, isPending } = useCreateTransaction();

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchemaForm),
    defaultValues: {
      from: user.email,
      to: "",
      value: 0,
    },
  });

  function onSubmit(data: TransactionFormValues) {
    const { value, to } = data;

    const description = `Transferência para ${to}`;

    if (balance < value) return;

    const transactionObj = {
      id: `tx-${Date.now()}`,
      foreignKey: user.id,
      date: new Date().toISOString(),
      description: description,
      type: "EXPENSE",
      value: value,
      status: "COMPLETED",
    };

    const calc = balance - value;
    setBalance(calc);
    addTransaction(transactionObj, {
      onSuccess: () => {
        form.reset();
        toast.success("Transferência realizada com sucesso!");
      },
      onError: () => {
        console.log("Erro");
        toast.error("Erro ao processar transferência.");
      },
    });
  }

  return (
    <div className="w-full flex-col px-4 lg:px-6">
      <Card className="sm:max-w-md">
        <CardHeader>
          <CardTitle>Nova Transferência</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="from"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-from">De:</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-from"
                      aria-invalid={fieldState.invalid}
                      readOnly
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="to"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-to">
                      Para: (E-mail)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-to"
                      aria-invalid={fieldState.invalid}
                      placeholder="ex@example.com"
                      autoComplete="false"
                    />
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
                      <FieldLabel>Valor (R$):</FieldLabel>
                      <Input
                        {...field}
                        value={displayValue}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "");

                          const numericValue = digits
                            ? Number(digits) / 100
                            : 0;

                          onChange(numericValue);
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              disabled={form.formState.isSubmitting}
              onClick={() => form.reset()}
            >
              Recomeçar
            </Button>
            <Button
              type="submit"
              form="form-rhf-input"
              disabled={form.formState.isSubmitting}
            >
              {isPending ? "Enviando..." : "Enviar"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
