import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import Header from "./Header";
import Catergory from "./Catergory";
import MenuList from "./MenuList";
import OrderStatus from "./OrderStatus";
import Footer from "./Footer";

const NewMenu = () => {
  const [category, setCategoty] = useState('Best Seller');
  const [footerActive, setFooterActiveTab] = useState('');


  const handleDataFromChild = (data) => {
    setCategoty(data);
  };

  const handleFooterActiveTab = (data) => {
    setFooterActiveTab(data)
  }
  return (

    <div >
      {" "}
      <Header />
      {
        footerActive === 'orderList' ? (
          <div>
            <OrderStatus />
          </div>
        ) :
          (
            <div>
              <Catergory sendDataToParent={handleDataFromChild} />
              <MenuList category={category} />
            </div>
          )
      }
      <Footer footerActiveTab={handleFooterActiveTab} />
    </div>
  );
};

export default NewMenu;
