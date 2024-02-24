import Card from '@/components/layout/card';
import Button from '@/components/ui/button';

export default function SellCardsPage() {
  return (
    <Card>
      <h1>Sell Your Cards!</h1>
      <div>
        <p>Your sell cart is empty</p>
        <Button>Continue Selling</Button>
      </div>
      <div>
        <h3>Helpful Information</h3>
        <ul>
          <li>
            <h4>
              Questions? Our experts are here to help! Contact us
              at: 206-523-2273 (Phone Hours)
            </h4>
          </li>
          <li>
            <h4>
              {' '}
              How does pricing work? All prices are listed using
              NM condition, and may change based on grading.
            </h4>
          </li>
          <li>
            <h4>Selling to Card Kingdom is easy!</h4>
            <ol>
              <li>Send us your cards within seven days.</li>
              <li>
                Our expert team will grade them within 5-7 days
                of receipt.
              </li>
              <li>
                You’ll get paid! Get a 30% bonus if you opt for
                store credit.
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </Card>
  );
}
