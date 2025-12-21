import DrawSpreadPage from "@/app/draw/_components/DrawSpreadPage";

type DrawSpreadRouteProps = {
  params: { spread: string };
};

export default function DrawSpreadRoute({ params }: DrawSpreadRouteProps) {
  return <DrawSpreadPage spreadId={params.spread} />;
}
