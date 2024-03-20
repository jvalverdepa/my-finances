"use client";

import Link from "next/link";
import { Currency } from "@prisma/client";
import { useFormState } from "react-dom";

import { createTransaction } from "@/lib/transactions/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";
import { type GetAccountsResponse } from "@/app/api/accounts/route";
import { type GetCategoriesResponse } from "@/app/api/categories/route";

const currencies = [Currency.PEN, Currency.USD];
const initialState = {
  message: "",
  errors: {},
};

type NewTransactionFormProps = {
  accounts: GetAccountsResponse;
  categories: GetCategoriesResponse;
};

const FOOD_CATEGORY_ID = "10";

export const NewTransactionForm = ({ accounts, categories }: NewTransactionFormProps) => {
  const [state, formAction] = useFormState(createTransaction, initialState);

  return (
    <form action={formAction} autoComplete="off">
      <div className="mt-4">
        <Label htmlFor="description">Description</Label>
        <Input autoFocus type="text" name="description" id="description" />
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {state.errors?.description &&
            state.errors.description.map((error: string) => (
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
        <Label htmlFor="amount">Amount</Label>
        <Input
          inputMode="decimal"
          name="amount"
          id="amount"
          defaultValue="0.00"
          onClick={(e) => e.currentTarget.select()}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="categoryId">Category</Label>
        <Select name="categoryId" defaultValue={FOOD_CATEGORY_ID}>
          <SelectTrigger id="categoryId">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            {Object.keys(categories).map((type) => (
              <SelectGroup key={type}>
                <SelectLabel>{type}</SelectLabel>
                {categories[type].map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <Label htmlFor="accountId">Account</Label>
        <Select name="accountId">
          <SelectTrigger id="accountId">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id.toString()}>
                {account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link href="/transactions">Cancel</Link>
        </Button>
        <SubmitButton>Create</SubmitButton>
      </div>
    </form>
  );
};