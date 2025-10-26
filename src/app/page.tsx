"use client";

import React from "react";
import { Navbar2 } from "./components/Navbar2";
import { Layout25 } from "./components/Layout25";
import { Header1 } from "./components/Header1";
import { Portfolio16 } from "./components/Portfolio16";
import { Substack } from "./components/Substack";
import { Cta1 } from "./components/cta1";

import { Pricing1 } from "./components/Pricing1";
import { Books } from "./components/Books";
import { Contacts } from "./components/contacts";
import { Newsletter } from "./components/Newsletter";
export default function Home() {
  return (
    <div>
      <Navbar2 />
      <Header1 />
      <Layout25 />
      <Portfolio16 />
      <Substack />
      <Cta1 />
      <Newsletter />
      <Pricing1 />
      <Books />
      <Contacts />
    </div>
  );
}
