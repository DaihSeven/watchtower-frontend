import React from "react";

type Pessoa = {
  id: number;
  nome: string;
  idade: number;
  descricao?: string;
  status: string;
  dataDesaparecimento: string;
};

interface Props {
  pessoa: Pessoa;
  onDelete: (id: number) => void;
  onEdit: (pessoa: Pessoa) => void;
}

export function PessoaCard({ pessoa, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-4 border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{pessoa.nome}</h2>
        <span
          className={`text-sm px-2 py-1 rounded ${
            pessoa.status === "ATIVO"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {pessoa.status}
        </span>
      </div>
      <p>
        <strong>Idade:</strong> {pessoa.idade}
      </p>
      <p>
        <strong>Desaparecido em:</strong>{" "}
        {new Date(pessoa.dataDesaparecimento).toLocaleDateString()}
      </p>
      <p className="mt-2 text-gray-600">{pessoa.descricao}</p>
      <button
        onClick={() => onDelete(pessoa.id)}
        className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Deletar
      </button>
      {/* Edit button */}
      <button
        onClick={() => onEdit(pessoa)}
        className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
      >
        Editar
      </button>
    </div>
  );
}
