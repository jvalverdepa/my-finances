"use client";

import Link from "next/link";
import { AccountType, Currency } from "@prisma/client";
import { useFormState } from "react-dom";

import { createAccount } from "@/lib/accounts/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";

const currencies = [Currency.PEN, Currency.USD];
const accountTypes = [
  AccountType.CASH,
  AccountType.CHECKING,
  AccountType.SAVINGS,
  AccountType.CREDIT,
];
const initialState = {
  message: "",
  errors: {},
};

export const NewAccountForm = () => {
  const [state, formAction] = useFormState(createAccount, initialState);

  return (
    <form action={formAction} autoComplete="off">
      <div className="mt-4">
        <Label htmlFor="name">Name</Label>
        <Input autoFocus type="text" name="name" id="name" />
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="currency">Currency</Label>
        <Select name="currency" defaultValue={Currency.USD}>
          <SelectTrigger id="currency">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <Label htmlFor="type">Type</Label>
        <Select name="type" defaultValue={AccountType.CREDIT}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            {accountTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <Label htmlFor="initial-balance">Initial Balance</Label>
        <Input
          inputMode="decimal"
          name="initial-balance"
          id="initial-balance"
          defaultValue="0.00"
          onClick={(e) => e.currentTarget.select()}
        />
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link href="/accounts">Cancel</Link>
        </Button>
        <SubmitButton>Create</SubmitButton>
      </div>
    </form>
  );
};
