import { useRouter } from "next/router"

export default function PollPage() {
    const router = useRouter();
    const {slug} = router.query;

    return <div>{slug}</div>
}