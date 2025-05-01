import { Card, CardContent, CardHeader } from "@/components/ui/card";

type EventCardProps = {
  imageUrl: string;
  title: string;
  location: string;
  description?: string;
};

export function EventCard({
  imageUrl,
  title,
  location,
  description,
}: EventCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-2xl shadow-md">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <CardHeader className="pb-0 pt-4 px-4 text-lg font-semibold">
        {title}
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-1 text-sm text-muted-foreground">
        <p className="font-medium text-gray-700">📍 {location}</p>
        {description && <p>{description}</p>}
      </CardContent>
    </Card>
  );
}
