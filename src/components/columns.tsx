import { CircleCheckIcon, LoaderIcon, XCircleIcon } from "lucide-react";

import { Badge } from "./ui/badge";

import type { ColumnDef } from "@tanstack/react-table";

import type { Transaction } from "@/types/transaction";

import { brazilianDate } from "@/utils/brazilianDate";
import { realFormat } from "@/utils/realFormat";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => (
      <p id={`${row.original.id}-data`}>{brazilianDate(row.original.date)}</p>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => (
      <p id={`${row.original.id}-description`}>{row.original.description}</p>
    ),
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.original.type;

      return (
        <span
          className={type === "INCOME" ? "text-emerald-600" : "text-rose-600"}
        >
          {type === "INCOME" ? "RECEBIDO" : "DÉBITO"}
        </span>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => (
      <p id={`${row.original.id}-value`}>
        {realFormat(String(row.original.value))}
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="w-full text-right">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <div className="flex w-full justify-end">
          {status === "COMPLETED" && (
            <>
              <Badge className="flex items-center gap-1.5 px-2 py-0.5 font-medium">
                <CircleCheckIcon />
                <span>Concluído</span>
              </Badge>
            </>
          )}

          {status === "PENDING" && (
            <>
              <Badge className="flex items-center gap-1.5 px-2 py-0.5 font-medium bg-orange-400 ">
                <LoaderIcon className="animate-spin" />
                <span>Pendente</span>
              </Badge>
            </>
          )}

          {status === "FAILED" && (
            <>
              <Badge className="flex items-center gap-1.5 px-2 py-0.5 font-medium bg-red-400">
                <XCircleIcon />
                <span>Falhou</span>
              </Badge>
            </>
          )}
        </div>
      );
    },
  },
];
