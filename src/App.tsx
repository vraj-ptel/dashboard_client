import { Suspense, lazy, useEffect } from "react";
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import { server } from "./constant";
import { useAdmin } from "./context";
import Home from "./pages/Home";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Customers = lazy(() => import("./pages/Customers"));
const NewProduct = lazy(() => import("./pages/management/NewProduct"));
const ProductManagement = lazy(
  () => import("./pages/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./pages/management/TransactionManagement")
);

const BarCharts = lazy(() => import("./pages/charts/BarCharts"));
const LineCharts = lazy(() => import("./pages/charts/LineCharts"));
const PieCharts = lazy(() => import("./pages/charts/PieCharts"));

const Stopwatch = lazy(() => import("./pages/apps/Stopwatch"));
const Coupon = lazy(() => import("./pages/apps/Coupon"));
const Toss = lazy(() => import("./pages/apps/Toss"));


const App = () => {
  const [admin,setAdmin]=useAdmin();
  
  useEffect(()=>{
    const checkAdmin=async()=>{
     try {
       const res=await fetch(`${server}/api/v1/admin-check`,{method:'GET',credentials:'include'});
       const result=await res.json();
       console.log(result)
       if(result.success){
         setAdmin(true)
       }
     } catch (error) {
      console.log(error);
     }
    }
    checkAdmin();
  },[])
  
  
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              admin?<Navigate to="/admin/dashboard"/>:
              <Home/>
            }
          />
          <Route element={admin?<Outlet/>:<Navigate to="/"/>}>

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/customer" element={<Customers />} />
          <Route path="/admin/transaction" element={<Transaction />} />

          {/* Charts */}

          <Route path="/admin/chart/bar" element={<BarCharts />} />
          <Route path="/admin/chart/pie" element={<PieCharts />} />
          <Route path="/admin/chart/line" element={<LineCharts />} />

          {/* Apps */}

          <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
          <Route path="/admin/app/coupon" element={<Coupon />} />
          <Route path="/admin/app/toss" element={<Toss />} />

          {/* Management */}
          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route
            path="/admin/transaction/:id"
            element={<TransactionManagement />}
          />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};



export default App;
