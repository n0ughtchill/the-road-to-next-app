import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";
import { Heading } from "@/components/heading";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Ticket" description="tickets all together" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
