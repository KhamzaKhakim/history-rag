import History from "@/components/ui/History";
import RagSearch from "@/components/ui/RagSearch";
import TimeLine from "@/components/ui/TimeLine";

export default function Home() {
  return (
    <div className="flex w-screen">
      <TimeLine />
      <div className="flex-1 flex flex-col">
        <RagSearch />
        <History />
      </div>
    </div>
  );
}
