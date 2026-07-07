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

interface OrderContextType {
  adminOrders: AdminOrder[];
  addAdminOrder: (order: AdminOrder) => void;
  confirmAdminOrder: (id: string) => void;
  deleteAdminOrder: (id: string) => void;
}

const OrderContext = createContext<OrderContextType>({
  adminOrders: [],
  addAdminOrder: () => {},
  confirmAdminOrder: () => {},
  deleteAdminOrder: () => {},
});

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>([
    { id: "#BH-001", customer: "Alisher T.", phone: "+998901234567", address: "Yunusobod 7", items: "Wagyu Steak, Lobster", total: 630000, payment: "cash", status: "pending", time: "12:30" },
    { id: "#BH-002", customer: "Malika R.", phone: "+998901234568", address: "Chilonzor 12", items: "Beef Wellington", total: 285000, payment: "card", status: "confirmed", time: "13:15" },
    { id: "#BH-003", customer: "Jasur K.", phone: "+998901234569", address: "Mirzo Ulugbek 5", items: "Filet Mignon x2", total: 790000, payment: "payme", status: "delivered", time: "11:00" },
  ]);

  const addAdminOrder = (order: AdminOrder) => {
    setAdminOrders(prev => [order, ...prev]);
  };

  const confirmAdminOrder = (id: string) => {
    setAdminOrders(prev => prev.map(o => o.id === id ? { ...o, status: "confirmed" } : o));
  };

  const deleteAdminOrder = (id: string) => {
    setAdminOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <OrderContext.Provider value={{ adminOrders, addAdminOrder, confirmAdminOrder, deleteAdminOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
