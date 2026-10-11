import { Suspense } from 'react';
import { CategoryBar, Category } from './CategoryBar';
import { CategorySkeleton } from './CategorySkeleton';

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

const NavCategory = async () => {
  const data = await getCategories();
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryBar categories={data} />
    </Suspense>
  );
};

export default NavCategory;