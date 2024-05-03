import { Grid } from '@mui/material';
import SalesCard from './SalesCard';
import SalesChart from './SalesChart';
import { useDispatch, useSelector } from 'react-redux';
import { countWeeklySales, getOrderCount, getCancelledOrderCount, getAllOrdersForSeller  } from '../../actions/orderAction';
import { getDetails } from '../../actions/sellerAction';
import { getTotalProductsInCarts } from '../../actions/cartAction';
import { getAllProductsBySeller } from '../../actions/productAction.js';
import { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

const generateSellerReport = (sellerDetails, orders, products) => {

  // Filter orders belonging to the current seller
  const sellerOrders = orders.filter(order => order.product.sellerId === sellerDetails.seller._id);

  const totalOrders = sellerOrders.length;
  const totalProducts = products.length;

  // Calculate counts for different order statuses
  const orderStatusCounts = {
    'Pending': sellerOrders.filter(order => order.status === 'pending').length,
    'Processing': sellerOrders.filter(order => order.status === 'processing').length,
    'Delivered': sellerOrders.filter(order => order.status === 'delivered').length,
  };

  // Calculate total sales for each product
  const productSales = {};
  sellerOrders.forEach(order => {
    const productId = order.product.product;
    const productPrice = order.totalPrice;
    productSales[productId] = (productSales[productId] || 0) + productPrice;
  });

  // Calculate total sales and breakdown by product
  const totalSales = sellerOrders.reduce((total, order) => total + order.totalPrice, 0);

  // Create a new PDF document
  const doc = new jsPDF();

  // Add content to the PDF document
  doc.setFontSize(16);
  doc.setFont('Times New Roman', 'bold');
  doc.text(`Store Report for ${sellerDetails.seller.firstName} ${sellerDetails.seller.lastName}`, 10, 10);

  // Order Status Table
  let startY = 30;
  doc.setFontSize(12);
  doc.text('Order Status', 10, startY);
  startY += 10;
  Object.entries(orderStatusCounts).forEach(([status, count]) => {
    doc.cell(10, startY, 40, 10, status, 'B');
    doc.cell(50, startY, 30, 10, count.toString(), 'B');
    startY += 10;
  });
  doc.cell(10, startY, 40, 10, 'Total Orders', 'B');
  doc.cell(50, startY, 30, 10, ` ${totalOrders}`, 'B');
  startY += 10;

  // Total Sales Table
  startY += 10;
  doc.text('Total Sales', 10, startY);
  startY += 10;
  Object.entries(productSales).forEach(([productId, totalSales]) => {
    const product = products.find(product => product._id === productId);
    if (product) {
      doc.cell(10, startY, 40, 10, product.name, 'B');
      doc.cell(50, startY, 30, 10, `Rs. ${totalSales.toFixed(2)}`, 'B');
      startY += 10;
    }
  });
  doc.cell(10, startY, 40, 10, 'Total Sales', 'B');
  doc.cell(50, startY, 30, 10, `Rs. ${totalSales.toFixed(2)}`, 'B');;
  startY += 10;

  // Products Table
  startY += 10;
  doc.text('Products', 10, startY);
  startY += 10;
  const categoryCounts = products.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
    return counts;
  }, {});
  Object.entries(categoryCounts).forEach(([category, count]) => {
    doc.cell(10, startY, 40, 10, category, 'B');
    doc.cell(50, startY, 30, 10, count.toString(), 'B');
    startY += 10;
  });
  doc.cell(10, startY, 40, 10, 'Total Products', 'B');
  doc.text(50, startY, 30, 10, `Rs. ${totalProducts}`, 'B');
  startY += 10;

  // Save or download the PDF document
  doc.save('seller_report.pdf');
};


const SellerHomePage = () => {

  const dispatch = useDispatch();
  const {seller} = useSelector((state) => state.sellerDetails);
  const { products } = useSelector((state) => state.productsBySeller);
  const { orders } = useSelector((state) => state.getAllOrders);
  const { weeklySales } = useSelector((state) => state.weeklySales);
  const { totalCount } = useSelector((state) => state.totalProducts);
  const { loading, countPaid, countPending, error } = useSelector((state) => state.orderCount);
  const { countCancelled } = useSelector((state) => state.cancelledOrderCount);


  // const {id} = seller.seller._id;
  useEffect(() => {
    dispatch(getDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(countWeeklySales())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotalProductsInCarts())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderCount())
  }, [dispatch]);

  useEffect(() => {
     dispatch(getCancelledOrderCount())
  }, [dispatch]);

  useEffect(() => {
    if (seller && seller.seller && seller.seller._id) {
      dispatch(getAllOrdersForSeller(seller.seller._id));
    }
  }, [dispatch, seller]);

  useEffect(() => {
    if (seller && seller.seller && seller.seller._id) {
      dispatch(getAllProductsBySeller(seller.seller._id));
    }
  }, [dispatch, seller])


  return (
    <Grid container spacing={3} sx={{ padding: "9px" }}>
{console.log("weeklySales", weeklySales)}
{console.log("count pending", countPending)}
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Pending Orders" total={countPending} color='primary' icon={'ant-design:carry-out-filled'} />
      </Grid>
{console.log("added to carts", totalCount)}
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Added to Cart" total={totalCount} color="success" icon={'ant-design:shopping-cart-outlined'} />
      </Grid>
      {console.log("count paid", countPaid)}
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Ongoing Orders" total={countPaid} color="warning" icon={'material-symbols:data-exploration'} />
      </Grid>
      {console.log("cancelled paid", countCancelled)}
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Cancelled Orders" total={countCancelled} color="error" icon={'material-symbols:free-cancellation-rounded'} />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="line" />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="bar" />
      </Grid>

      <div>
        {console.log("seller", seller)}
        {console.log("orders", orders)}
        {console.log("products", products)}
        <button onClick={() => generateSellerReport(seller, orders, products)}>Generate Report</button>
    </div>
    </Grid>
  );
};

export default SellerHomePage;
