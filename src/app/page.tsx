import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-fit m-auto mt-8 flex gap-2">
      <Link href="/produtos">
        <Button color="primary">Produtos</Button>
      </Link>
      <Link href="/fornecedores">
        <Button color="primary">Fornecedores</Button>
      </Link>
      <Link href="/cadastro">
        <Button color="primary">Cadastro</Button>
      </Link>
    </main>
  );
}
