import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/ideas/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/ideas/"!</div>;
}
