exports.getOrders = async (req, res) => {
  res.json({
    success: true,
    orders: [
      {
        id: 'ord-1024',
        orderNumber: '#KAR1024',
        buyerName: 'Punjab Handicraft Retailer',
        productTitle: '500 Phulkari Bags',
        totalAmount: 650000.0,
        status: 'Picked Up',
        date: '2026-09-14',
        tracking: {
          trackingId: 'TRK-PK-984210',
          carrier: 'CraftExpress Logistics',
          expectedDelivery: '19 Sep 2026',
          currentStep: 4,
          timeline: [
            { step: 1, label: 'Order Placed', completed: true, date: '14 Sep 10:00 AM' },
            { step: 2, label: 'Artisan Confirmed', completed: true, date: '14 Sep 02:30 PM' },
            { step: 3, label: 'Packed', completed: true, date: '15 Sep 05:00 PM' },
            { step: 4, label: 'Picked Up', completed: true, current: true, date: '16 Sep 09:15 AM' },
            { step: 5, label: 'In Transit', completed: false, date: 'Estimated 17 Sep' },
            { step: 6, label: 'Delivered', completed: false, date: 'Estimated 19 Sep' }
          ]
        }
      },
      {
        id: 'ord-1023',
        orderNumber: '#KAR1023',
        buyerName: 'Delhi Gift Company',
        productTitle: '200 Punjabi Juttis',
        totalAmount: 330000.0,
        status: 'Delivered',
        date: '2026-09-02',
        tracking: {
          trackingId: 'TRK-DL-441092',
          carrier: 'IndiaPost Express',
          expectedDelivery: '07 Sep 2026',
          currentStep: 6,
          timeline: [
            { step: 1, label: 'Order Placed', completed: true },
            { step: 2, label: 'Artisan Confirmed', completed: true },
            { step: 3, label: 'Packed', completed: true },
            { step: 4, label: 'Picked Up', completed: true },
            { step: 5, label: 'In Transit', completed: true },
            { step: 6, label: 'Delivered', completed: true, current: true }
          ]
        }
      }
    ]
  });
};
