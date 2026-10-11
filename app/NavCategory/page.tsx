import { Suspense } from 'react';
import NavCategory from './NavCategory';
import { CategorySkeleton } from './CategorySkeleton';

export default function NavCategoryPage() {
  return (
    <main className="w-full">
      <Suspense fallback={<CategorySkeleton />}>
        <NavCategory />
      </Suspense>
    </main>
  );
}
