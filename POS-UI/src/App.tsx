import React from "react";
import Header from "./components/Header.tsx";
import ProductList from "./components/ProductList.tsx";
import AddProductForm from "./components/AddProductForm.tsx";
import BarcodeSearch from "./components/BarcodeSearch.tsx";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <ProductList />
      <AddProductForm />
      <BarcodeSearch />
    </div>
  );
};

export default App;
