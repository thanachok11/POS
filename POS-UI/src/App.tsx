import React from "react";
import Header from "./components/Header.tsx";
import ProductList from "./components/ProductList.tsx";
import AddProductForm from "./components/AddProductForm.tsx";
import BarcodeSearch from "./components/BarcodeSearch.tsx";
import Scanner from "./components/scanner.tsx";
import Upload from "./components/upload.tsx";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <ProductList />
      <AddProductForm />
      <BarcodeSearch />
      <Scanner />
      <Upload />
    </div>
  );
};

export default App;
