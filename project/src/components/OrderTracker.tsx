import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Order, getOrderStatusStep } from '../utils/orderStatus';

interface OrderTrackerProps {
  order: Order;
}

export function OrderTracker({ order }: OrderTrackerProps) {
  const currentStep = getOrderStatusStep(order.status);
  const steps = ['Order Placed', 'Confirmed', 'Preparing', 'On the Way', 'Delivered'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Order Status</h2>
      <div className="relative">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center mb-8 last:mb-0">
            {index + 1 <= currentStep ? (
              <CheckCircle className="w-8 h-8 text-green-500" />
            ) : (
              <Circle className="w-8 h-8 text-gray-300" />
            )}
            <div className="ml-4">
              <p className={`font-medium ${index + 1 <= currentStep ? 'text-green-500' : 'text-gray-500'}`}>
                {step}
              </p>
              {index + 1 === currentStep && order.estimatedDeliveryTime && (
                <p className="text-sm text-gray-500 mt-1">
                  Estimated {step.toLowerCase()} by{' '}
                  {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}