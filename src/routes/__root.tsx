import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClient } from '@tanstack/react-query';
import Header from '@/components/Header';

type RouterContext = {
  queryClient: QueryClient;
};

const rootRoute = createRootRouteWithContext<RouterContext>();

const RootLayout = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <HeadContent />
      <Header />
      <main className='flex justify-center p-6'>
        <div className='w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8'>
          <Outlet />
        </div>
      </main>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  );
};

export const Route = rootRoute({
  head: () => ({
    meta: [
      {
        name: 'description',
        content:
          'Share, explore and build on the best startup ideas and side hustles',
      },
      { title: 'IdeaDrop - Your Idea Hub' },
    ],
  }),
  component: RootLayout,
});
