'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Link from "next/link";

export default function ListaProduto() {

  const [listaFornecedores, setListaFornecedores] = useState(Array);
  const [nomeFornecedor, setNomeFornecedor] = useState(String)
  const [enderecoFornecedor, setEnderecoFornecedor] = useState(String)
  const [telefoneFornecedor, setTelefoneFornecedor] = useState(String)
  const [emailFornecedor, setEmailFornecedor] = useState(String)
  const [fornecedorId, setFornecedorId] = useState(String)

  const apiUrl = 'http://localhost:8080/api/fornecedores'

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = (fornecedor: any) => {
    onOpen();
    setFornecedorId(fornecedor.id)
    setNomeFornecedor(fornecedor.nome)
    setEnderecoFornecedor(fornecedor.endereco)
    setTelefoneFornecedor(fornecedor.telefone)
    setEmailFornecedor(fornecedor.email)
  }

  async function getListaFornecedor() {
    const response = await fetch(apiUrl)
    const responseData: any = await response.json()
    setListaFornecedores(responseData)
  }

  function deletarFornecedor(id: String) {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          getListaFornecedor()
        }
      }
      )
  }

  const atualizarFornecedor = async (id: String) => {
    console.log(id)
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(
        {
          nome: nomeFornecedor,
          endereco: enderecoFornecedor,
          telefone: telefoneFornecedor,
          email: emailFornecedor
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          getListaFornecedor()
          onClose()
        }
      }
      )
  }

  useEffect(() => {
    getListaFornecedor()
  }, [])

  return (
    <section className="relative">
      <Table className="w-4/6 h-fit m-auto"  aria-label="Lista de Fornecedores">
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Endereço</TableColumn>
          <TableColumn>Telefone</TableColumn>
          <TableColumn className="text-center">Email</TableColumn>
          <TableColumn className="text-center">Ações</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"Não há fornecedores cadastrados."}>
          {listaFornecedores.map((fornecedor: any, i) =>
            <TableRow key={i} className="">
              <TableCell>{fornecedor.nome}</TableCell>
              <TableCell>{fornecedor.endereço}</TableCell>
              <TableCell>{fornecedor.telefone}</TableCell>
              <TableCell className="w-fit text-center">{fornecedor.email}</TableCell>
              <TableCell>
                <div className="w-fit m-auto flex gap-2">
                  <button onClick={() => handleOpen(fornecedor)}><EditIcon /></button>
                  <button onClick={() => deletarFornecedor(fornecedor.id)}><DeleteIcon /></button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Link className="absolute top-0 ml-4" href={`/`}>
        <Button>Voltar</Button>
      </Link>
      <ModalAtualizar />
    </section>
  )

  function ModalAtualizar() {
    return (
      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <form>
                  <div className="flex items-center mb-2">
                    <label htmlFor="nomeFornecedor" className="w-32">Nome</label>
                    <Input
                      id="nomeFornecedor"
                      className="w-80"
                      key="outside-left"
                      type="text"
                      value={nomeFornecedor}
                      onChange={(e) => setNomeFornecedor(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <label htmlFor="enderecoFornecedor" className="w-32">Endereço</label>
                    <Input
                      id="enderecoFornecedor"
                      className="w-80"
                      key="outside-left"
                      type="text"
                      value={enderecoFornecedor}
                      onChange={(e) => setEnderecoFornecedor(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <label htmlFor="telefoneFornecedor" className="w-32">Telefone</label>
                    <Input
                      id="telefoneFornecedor"
                      className="w-28"
                      key="outside-left"
                      type="phone"
                      value={telefoneFornecedor}
                      onChange={(e) => setTelefoneFornecedor(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <label htmlFor="emailFornecedor" className="w-32">Email</label>
                    <Input
                      id="emailFornecedor"
                      className="w-28"
                      key="outside-left"
                      type="email"
                      value={emailFornecedor}
                      onChange={(e) => setEmailFornecedor(e.target.value)}
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="flex gap-2 ml-2">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={() => atualizarFornecedor(fornecedorId)}>
                  Cadastrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
  }
}