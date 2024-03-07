import { NewAccountForm } from "@/components/accounts/new/form";

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold tracking-tight">New Account</h1>
      <NewAccountForm />
    </div>
  );
}
