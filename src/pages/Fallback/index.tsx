import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router";

const FallbackPage: React.FC = () => {
  return (
    <main className="grid min-h-screen w-full place-items-center px-4 bg-linear-to-r from-green-300 to-green-400">
      <Card className="w-full max-w-md flex">
        <CardHeader className="text-center">
          <CardTitle variant={"huge"} className="py-4">
            Oops!
          </CardTitle>
          <CardDescription>
            The page you are looking for does not exist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NavLink to={"/"}>
            <Button variant="outline" className="w-full">
              Go Back Home
            </Button>
          </NavLink>
        </CardContent>
      </Card>
    </main>
  );
};

export default FallbackPage;
