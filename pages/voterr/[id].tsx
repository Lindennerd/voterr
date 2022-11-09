import { useState } from "react";
import { VoteForm } from "../../components/Polls/VoteForm";
import { useFormatDate } from "../../hooks/useFormatDate";
import { usePolls } from "../../hooks/usePolls";
import { Poll, Option } from "../../types/polls";

export default function Voterr({ poll }: { poll: Poll }) {
  const { format } = useFormatDate();
  const [voted, setVoted] = useState(false);

  function onVoted(option: Option) {
    setVoted(true);
  }

  return (
    <>
      <section className="py-6 px-2 space-y-4">
        <header className="flex flex-col items-center rounded-md bg-gray-700 py-4 px-2">
          <h1 className="font-semibold">{poll.title}</h1>
          <h3>
            {poll.description} - Valid Until {format(poll.validUntil)}
          </h3>
        </header>

        {!voted && <VoteForm poll={poll} onVoted={onVoted} />}
        {voted && (
          <div className="p-8 rounded-full text-2xl font-semibold text-center bg-green-600">
            You voted!
          </div>
        )}
      </section>
    </>
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
