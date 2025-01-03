import React from 'react';
import { Package } from 'lucide-react';
import { OrderHistory as OrderHistoryType } from '../types';
import { formatGHS } from '../utils/currency';

interface OrderHistoryProps {
  history: OrderHistoryType;
}

export function OrderHistory({ history }: OrderHistoryProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-1">Total Orders</h3>
          <p className="text-2xl font-bold">{history.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-1">Total Spent</h3>
          <p className="text-2xl font-bold">{formatGHS(history.totalSpent)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Recent Orders</h3>
        </div>
        <div className="divide-y">
          {history.orders.map((order) => (
            <div key={order.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">Order #{order.id}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {order.items.map((item) => (
                  <div key={item.id}>
                    {item.quantity}x {item.name}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm font-medium">
                  Total: {formatGHS(order.total)}
                </span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  order.status === 'delivered' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}