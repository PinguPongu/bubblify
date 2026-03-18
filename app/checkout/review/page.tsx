import ReviewStep from "../components/review-step";
import { submitOrder } from "../actions";

export default function CheckoutReviewPage() {
  return <ReviewStep submitAction={submitOrder} />;
}
