import {
  Card as CardUi,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Card {
  description: string;
  title: string;
}

export function Card(props: Card) {
  const { description, title } = props;

  return (
    <CardUi className="@container/card">
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {title}
        </CardTitle>
      </CardHeader>
    </CardUi>
  );
}

export default Card;
