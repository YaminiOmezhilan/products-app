import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";
import ReviewModal from "./ReviewModal";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductTableProps {
  products: Product[];
}

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CustomButton = styled(Button)`
  text-transform: none;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 8px;
  line-height: 1.5;
  border: none;
  border-radius: 6px;
  background-color: #e6ecf0;
  border-color: #d9d9d9;
  color: #2d3540;
  box-shadow: none;
  &:hover {
    background-color: #dde3e7;
    border-color: #dde3e7;
  }

  &:active {
    color: #1c4b8e;
    border-color: #1c4b8e;
  }
`;

const ActionTableCell = styled(TableCell)`
  white-space: nowrap;
  width: 120px;
`;

const TableHeader = styled(TableHead)`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
`;

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Table stickyHeader>
        <TableHeader>
          <TableRow>
            <StyledTableCell style={{ width: "20%" }}>Title</StyledTableCell>
            <StyledTableCell style={{ width: "50%" }}>
              Description
            </StyledTableCell>
            <StyledTableCell style={{ width: "10%" }}>Price</StyledTableCell>
            <StyledTableCell style={{ width: "20%" }}>Action</StyledTableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell style={{ width: "20%", fontSize: "13px" }}>
                {product.title}
              </TableCell>
              <TableCell style={{ width: "50%", fontSize: "13px" }}>
                {product.description}
              </TableCell>
              <TableCell style={{ width: "10%", fontSize: "13px" }}>
                ${product.price.toFixed(2)}
              </TableCell>
              <ActionTableCell style={{ width: "20%" }}>
                <CustomButton
                  variant="contained"
                  onClick={() => handleOpenModal(product)}
                  sx={{ textTransform: "none" }} 
                >
                  View Reviews
                </CustomButton>
              </ActionTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ReviewModal
        open={open}
        onClose={handleCloseModal}
        productId={selectedProduct?.id ?? null}
      />
    </TableContainer>
  );
};

export default ProductTable;
