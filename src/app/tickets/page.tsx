import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { RedirectToast } from "@/components/redirect-toast";

const TicketsPage = () => {
  return (
    <>
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading title="Ticket" description="tickets all together" />

        <CardCompact
          title="Create Ticket"
          description="A new ticket will be created"
          content={<TicketUpsertForm />}
          className="w-full max-w-[420px] self-center"
        />

        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </div>
      <RedirectToast />
    </>
  );
};

export default TicketsPage;
