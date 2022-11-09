import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useFormatDate } from "../../hooks/useFormatDate";
import { usePolls } from "../../hooks/usePolls";
import { Option, Poll } from "../../types/polls";

export default function PollPage(props: { poll: Poll }) {
  const { format } = useFormatDate();
  const [poll, setPoll] = useState<Poll | undefined>(props.poll);
  const { getRealtime } = usePolls();

  useEffect(() => {
    if (poll && poll.options) {
      getRealtime(poll.id, (record) => {
        setPoll((p) => {
          if (p)
            return {
              ...p,
              options: p.options?.map((o) => {
                if (o.id === record.option) {
                  return { ...o, votes: o.votes + 1 };
                }
                return o;
              }),
            };
        });
      });
    }
  }, [poll]);

  if (!poll) return <div>Invalid Poll</div>;

  return (
    <section className="py-6 px-2 space-y-4">
      <header className="flex flex-col items-center rounded-md bg-gray-700 py-4 px-2">
        <h1 className="font-semibold">{poll.title}</h1>
        <h3>
          {poll.description} - Valid Until {format(poll.validUntil)}
        </h3>
        <Link
          href={`/voterr/${poll.id}`}
          className="p-2 bg-blue-700 font-semibold rounded-md mt-2"
        >
          Vote!
        </Link>
      </header>
      <div>
        {poll && poll.options && (
          <div>
            {poll.options.map((o) => (
              <div key={o.id}>
                {o.text} - {o.votes}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const { id } = context.query;
  const { get } = usePolls();

  const poll = await get(id);

  return {
    props: { poll },
  };
}
