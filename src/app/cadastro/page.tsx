import { Button } from "@nextui-org/react";

export default function Cadastro() {
  return (
    <main className="w-fit m-auto mt-8">
      <h1 className="mb-2">Oque deseja cadastrar?</h1>
      <div className="flex gap-2">
        <a href="cadastro/produto">
          <Button color="primary">Produto</Button>
        </a>
        <a href="/fornecedor">
          <Button color="primary">Fornecedor</Button>
        </a>
        <a href={`/`}>
            <Button>
              Voltar
            </Button>
          </a>
      </div>
    </main>
  )
}