import React from "react";
import Container from "../../container/Container";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
const Header = () => {
  return (
    <header className="w-full flex justify-center items-center  h-[80px] bg-blue-500">
      <Container>
        <div className="flex justify-between items-center">
          <img
            width={150}
            height={150}
            src={require("../../assets/images/logo.png")}
            alt="logo"
          />

          <nav>
            <div className="hidden md:flex justify-between items-center gap-10 text-white font-medium">
              <Link>CATAGORIES</Link>
              <Link>BEST SELLERS</Link>
              <Link>FEATURED</Link>
            </div>
            <div className="md:hidden sm:flex justify-center items-center">
              <FaBars size={50} color="white" />
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
