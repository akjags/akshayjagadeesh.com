import { redirect } from "next/navigation";

export const metadata = {
  title: "Event",
  robots: { index: false, follow: false },
};

export default async function EventsPage() {
  redirect("/events/amara-1st-birthday");
}
