import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchProducts, selectProducts } from "../redux/productsSlice";
import { CircularProgress, Box } from "@mui/material";
import ProductTable from "../components/ProductTable";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { StatusContainer } from "../styles/styles";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <StatusContainer>
        <Header />
        {loading ? <CircularProgress /> : <ProductTable products={products} />}
      </StatusContainer>
    </Box>
  );
};

export default ProductsPage;
