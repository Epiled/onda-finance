import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface SiteHeader {
  title?: string;
}

export function SiteHeader(props: SiteHeader) {
  const { title = "Title" } = props;

  return (
    <header className="flex bg-primary h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-primary-foreground" />
        <Separator
          orientation="vertical"
          className="mx-2 bg-primary-foreground data-[orientation=vertical]:h-8"
        />
        <h1 className="text-base text-primary-foreground font-medium">
          {title}
        </h1>
      </div>
    </header>
  );
}
