  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }

  export interface CartItem extends Product {
    quantity: number;
    selected: boolean;
  }

  export interface User {
    name: string;
    email: string;
    address: string;
    phone: string;
  }

  export interface CheckoutForm {
    name: string;
    email: string;
    address: string;
    phone: string;
    paymentMethod: 'credit' | 'debit' | 'paypal';
  }

  export interface OrderHistory {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
  }