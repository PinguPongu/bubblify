import SuccessCleanup from "../components/success-cleanup";

interface CheckoutSuccessPageProps {
  /** The search params forwarded by Next for the success route. */
  searchParams: Promise<{
    telephone?: string;
  }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { telephone } = await searchParams;

  return <SuccessCleanup telephone={telephone} />;
}
