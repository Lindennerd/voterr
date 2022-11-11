import Link from "next/link";
import { useFormatDate } from "../../hooks/useFormatDate";
import { Poll } from "../../types/polls";
import { Calendar } from "../Icons/calendar";
import { ChatBubble } from "../Icons/chat-bubble";

export function PollsList({ polls }: { polls: Poll[] }) {
  return (
    <section>
      {polls && polls.map((poll) => <PollItem key={poll.id} poll={poll} />)}
    </section>
  );
}

function PollItem({ poll }: { poll: Poll }) {
  const { format } = useFormatDate();

  return (
    <Link href={`/poll/${poll.id}`}>
      <div className="py-4 px-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm hover:shadow-lg flex flex-wrap items-center justify-between gap-2 transition-all">
        <div className="flex items-center gap-2">
          <ChatBubble /> <span> {poll.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {poll.validUntil && (
            <>
              <Calendar />
              <span> Valid Until: {format(poll.validUntil)}</span>
            </>
          )}
        </div>
        <div className="basis-full h-0"></div>
        <div>
          <span className="text-gray-400">{poll.description}</span>
        </div>
      </div>
    </Link>
  );
}
