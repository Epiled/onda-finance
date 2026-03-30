import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";

import { CircleCheckIcon, LoaderIcon, XCircleIcon } from "lucide-react";

import { Badge } from "./ui/badge";
import { realFormat } from "@/utils/realFormat";
import { brazilianDate } from "@/utils/brazilianDate";
import type { ColumnDef } from "@tanstack/react-table";

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  status: z.string(),
  date: z.string(),
  description: z.string(),
  type: z.string(),
  value: z.string(),
});

export type Transaction = z.infer<typeof schema>;

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: () => <div className="w-full">Data</div>,
    cell: ({ row }) => (
      <p id={`${row.original.id}-data`}>{brazilianDate(row.original.date)}</p>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="w-full">Descrição</div>,
    cell: ({ row }) => (
      <p id={`${row.original.id}-description`}>{row.original.description}</p>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div className="w-full">Tipo</div>,
    cell: ({ row }) => {
      const type = row.original.type;

      return (
        <span
          className={type === "INCOME" ? "text-emerald-600" : "text-rose-600"}
        >
          {type === "INCOME" ? "ENTRADA" : "SAÍDA"}
        </span>
      );
    },
  },
  {
    accessorKey: "value",
    header: () => <div className="w-full">Valor</div>,
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
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 px-2 py-0.5 font-medium"
          >
            {status === "COMPLETED" && (
              <>
                <CircleCheckIcon className="text-emerald-500" />
                <span>Concluído</span>
              </>
            )}

            {status === "PENDING" && (
              <>
                <LoaderIcon className="animate-spin text-zinc-500" />
                <span>Pendente</span>
              </>
            )}

            {status === "FAILED" && (
              <>
                <XCircleIcon className="text-rose-500" />
                <span>Falhou</span>
              </>
            )}
          </Badge>
        </div>
      );
    },
  },
];
