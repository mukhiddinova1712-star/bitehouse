"use client";
import React, { createContext, useContext, useState } from "react";

export interface AdminOrder {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: string;
  total: number;
  payment: string;
  status: string;
  time: string;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  orders: number;
  total: number;
  status: string;
}

interface OrderContextType {
  adminOrders: AdminOrder[];
  addAdminOrder: (order: AdminOrder) => void;
  confirmAdminOrder: (id: string) => void;
  deleteAdminOrder: (id: string) => void;
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  deleteCustomer: (id: number) => void;
}

const OrderContext = createContext<OrderContextType>({
  adminOrders: [],
  addAdminOrder: () => {},
  confirmAdminOrder: () => {},
  deleteAdminOrder: () => {},
  customers: [],
  addCustomer: () => {},
  deleteCustomer: () => {},
});

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>([
    { id: "#BH-001", customer: "Alisher T.", phone: "+998901234567", address: "Yunusobod 7", items: "Wagyu Steak, Lobster", total: 630000, payment: "cash", status: "pending", time: "12:30" },
    { id: "#BH-002", customer: "Malika R.", phone: "+998901234568", address: "Chilonzor 12", items: "Beef Wellington", total: 285000, payment: "card", status: "confirmed", time: "13:15" },
    { id: "#BH-003", customer: "Jasur K.", phone: "+998901234569", address: "Mirzo Ulugbek 5", items: "Filet Mignon x2", total: 790000, payment: "payme", status: "delivered", time: "11:00" },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: "Alisher T.", phone: "+998 90 123 45 67", email: "alisher@gmail.com", orders: 12, total: 4200000, status: "VIP" },
    { id: 2, name: "Malika R.", phone: "+998 91 234 56 78", email: "malika@gmail.com", orders: 8, total: 2800000, status: "Doimiy" },
    { id: 3, name: "Jasur K.", phone: "+998 93 345 67 89", email: "jasur@gmail.com", orders: 15, total: 6500000, status: "VIP" },
    { id: 4, name: "Nodira S.", phone: "+998 94 456 78 90", email: "nodira@gmail.com", orders: 5, total: 1500000, status: "Yangi" },
  ]);

  const addAdminOrder = (order: AdminOrder) => setAdminOrders(prev => [order, ...prev]);
  const confirmAdminOrder = (id: string) => setAdminOrders(prev => prev.map(o => o.id === id ? { ...o, status: "confirmed" } : o));
  const deleteAdminOrder = (id: string) => setAdminOrders(prev => prev.filter(o => o.id !== id));
  const addCustomer = (customer: Customer) => setCustomers(prev => [...prev, customer]);
  const deleteCustomer = (id: number) => setCustomers(prev => prev.filter(c => c.id !== id));

  return (
    <OrderContext.Provider value={{ adminOrders, addAdminOrder, confirmAdminOrder, deleteAdminOrder, customers, addCustomer, deleteCustomer }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
