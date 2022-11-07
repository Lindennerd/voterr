import { Poll } from "../../types/polls";

export function PollsList({polls}: {polls: Poll[]}) {

    return <section>
        <div>
            {polls && polls.map(poll => (
                <PollItem key={poll.id} poll={poll} />
            ))}
        </div>
    </section>
}

function PollItem({poll}: {poll: Poll}) {
    return <div>
        {poll.title}
    </div>
}