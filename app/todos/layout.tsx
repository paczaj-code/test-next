import React from 'react';
import TodosList from './TodosList';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="main-flex">
      <div>
        {/* @ts-ignore */}
        <TodosList />
      </div>
      <div>{children}</div>
    </main>
  );
}

// export default RootLayout;
