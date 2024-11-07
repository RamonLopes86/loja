import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Consumir from "./consumirApi/consumir";
import Ajson from "@/API_Json/apiJson";




export default function Home() {
  return (
    <>
      <Head>
        <title>Ramon Materiais</title>
        <meta name="description" content="Materiais de Construção" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/formico.ico" type="image/ico" />
        
      </Head>
      <main>

        {/* <Consumir/> */}
        <Ajson/>
        

      </main>
    </>
  );
}
