// app/ui/order-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrder } from '../context/orderContext';
import { usePaystack } from '../context/paystackContext'; // Assuming you create this
import { CreateOrderPayload } from '../lib/definition';
import { toast } from 'sonner';

// --- Import shadcn/ui components ---
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

// A simplified Paystack context for this example
// You should create a proper context for this
// const usePaystackContext = () => {
//     const { initializePaystack } = require('../lib/data/paystack'); // Lazy require
//     return { createPaystack: initializePaystack };
// }


const OrderForm: React.FC = () => {
  const { createNewOrder, isLoading } = useOrder();
  const { createPaystackPayment} = usePaystack()
  const router = useRouter();

  // Use a single state object for the form data
  const [formData, setFormData] = useState<CreateOrderPayload>({
    paymentMethod: '',
    shippingAddress: '',
    shippingMethod: '',
    currency: 'NGN',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: keyof CreateOrderPayload, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newOrder = await createNewOrder(formData);
      if (!newOrder) throw new Error('Order creation failed unexpectedly.');
const newOrderId = newOrder.id
      toast.success('Order created successfully!', {
        description: `Order #${newOrder.id} is being processed.`,
      });

      // If paying with Paystack, initialize payment and redirect
      if (formData.paymentMethod === 'Paystack' && newOrderId) {
        const paystackData = await  createPaystackPayment(newOrderId);
        if (paystackData?.authorization_url) {
          // Redirect the user to Paystack's payment page
          window.location.href = paystackData.authorization_url;
        } else {
          throw new Error('Failed to get Paystack authorization URL.');
        }
      } else {
        // For other payment methods (e.g., Cash), redirect to the order confirmation page
        router.push(`/orderPages/success/${newOrderId}`);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while creating the order.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Shipping & Payment</CardTitle>
        <CardDescription>Please provide your details to complete the purchase.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="shippingAddress">Shipping Address</Label>
            <Input
              id="shippingAddress" name="shippingAddress"
              value={formData.shippingAddress} onChange={handleInputChange}
              placeholder="123 Main Street, Lagos" required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="shippingMethod">Shipping Method</Label>
            <Select name="shippingMethod" onValueChange={(value) => handleSelectChange('shippingMethod', value)} required>
              <SelectTrigger><SelectValue placeholder="Select a shipping method" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard Shipping (3-5 days)</SelectItem>
                <SelectItem value="Express">Express Shipping (1-2 days)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select name="currency" onValueChange={(value) => handleSelectChange('currency', value)} defaultValue="NGN" required>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="NGN">NGN</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select name="paymentMethod" onValueChange={(value) => handleSelectChange('paymentMethod', value)} required>
                <SelectTrigger><SelectValue placeholder="Select a payment method" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paystack">Pay with Card (Paystack)</SelectItem>
                  <SelectItem value="Cash">Pay on Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Place Order'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;