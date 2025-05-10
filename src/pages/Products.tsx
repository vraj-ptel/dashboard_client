import { ReactElement, useCallback, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

interface DataType {
  id:string;
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const img =
  "https://joulemart.in/wp-content/uploads/2025/01/Holder.png"
const img2 = "https://joulemart.in/wp-content/uploads/2025/01/Modular-Range.png";

export const arr: DataType[] = [
  {
    id:"101",
    photo: <img src={img} alt="Shoes" />,
    name: "Holder & Ancillary",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/101">Manage</Link>,
  },

  {
    id:"102",
    photo: <img src={img2} alt="Shoes" />,
    name: "Switches & Modular Plates",
    price: 2200,
    stock: 213,
    action: <Link to="/admin/product/102">Manage</Link>,
  },
 
];



const Products = () => {
  const [data] = useState<DataType[]>(arr);

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-product-box",
      "Products",
      true
    ),
    []
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
