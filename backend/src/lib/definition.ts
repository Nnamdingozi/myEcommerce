export type PaystackInitResponse = {
  
    status: true,
    message: string,
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    }


  };

  export type PaystackVerificationData = {
    id: number;
    domain: string;
    data: {
    status: 'success' | 'failed' | 'abandoned'; 
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
   
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string | null;
    }
    metadata: {
      orderId: string;
      userId: string;  
      [key: string]: any; 
    };
    fees: number;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
    };
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
    };
  };
  