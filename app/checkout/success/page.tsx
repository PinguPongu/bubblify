import SuccessCleanup from "../components/success-cleanup";

// Hér fáum við símanúmer úr URL'inu og drillum því niður í SuccessCleanup svo það geti verið sýtn þar
interface CheckoutSuccessPageProps {
  searchParams: Promise<{ telephone?: string; }>;
}

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { telephone } = await searchParams;

  return <SuccessCleanup telephone={telephone} />;
}
