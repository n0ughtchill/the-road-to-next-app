import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { searchParamsCache } from "@/features/ticket/search-params";

type TicketPageProps = {
  searchParams: SearchParams;
};

const TicketsPage = async ({ searchParams }: TicketPageProps) => {
  const { user } = await getAuth();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My Ticket" description="All my tickets" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        content={<TicketUpsertForm />}
        className="w-full max-w-[420px] self-center"
      />

      <Suspense fallback={<Spinner />}>
        <TicketList
          userId={user?.id}
          searchParams={await searchParamsCache.parse(searchParams)}
        />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
