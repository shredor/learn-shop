import { CartTable } from './components/CartTable';

export const CartPage = () => {
  return (
    <div className="container py-4 px-4">
      <h1 className="text-2xl font-semibold mb-4">Cart Page</h1>
      <CartTable />
    </div>
  );
};
