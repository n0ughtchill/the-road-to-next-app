"use server"

import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { TicketStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { resolve } from "path";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
 try{
 
    await prisma.ticket.update({
    where: { id },
    data: { status },
});
 } catch(error){
    return fromErrorToActionState(error)
 }
revalidatePath(ticketsPath());

return toActionState("SUCCESS", "Status updated")
}