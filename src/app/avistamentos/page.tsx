"use client";
import { HiClipboardCopy } from "react-icons/hi";
import { useEffect, useState } from "react";
import { getAllAvistamentos } from "@/services/avistamentos";
import { Avistamento } from "@/types/avistamento";
import AvistamentoCard from "@/components/AvistamentoCard";
import AvistamentoForm from "@/components/AvistamentoForm";

interface User {
  id: number;
  tipo_usuario: string;
}

export default function AvistamentosPage() {
  const [avistamentos, setAvistamentos] = useState<Avistamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<Avistamento | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchAvistamentos = async () => {
    try {
      setLoading(true);
      const data = await getAllAvistamentos();
      setAvistamentos(data);
    } catch (error) {
      console.error("Erro ao buscar avistamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvistamentos();
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <div className="p-4 space-y-6 bg-[#ededed]">
      <h1 className="text-2xl font-bold">Avistamentos</h1>

      {!editData && !showForm && (
        <button
          onClick={() => {
            if (!user) {
              alert("Você precisa estar logado para criar um avistamento.");
              return;
            }
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 my-4 mt-12 text-white px-4 py-2 rounded hover:bg-indigo-700"
        ><HiClipboardCopy />
          Novo Avistamento
        </button>
      )}

      {user && (showForm || editData) && (
        <AvistamentoForm
          editData={editData}
          onSuccess={() => {
            fetchAvistamentos();
            setEditData(undefined);
            setShowForm(false);
          }}
          onCancelEdit={() => {
            setEditData(undefined);
            setShowForm(false);
          }}
        />
      )}

      {loading ? (
        <p>Carregando avistamentos...</p>
      ) : avistamentos.length === 0 ? (
        <p>Nenhum avistamento encontrado.</p>
      ) : (
        <div className="grid gap-4">
          {avistamentos.map((a) => (
            <AvistamentoCard
              key={a.id}
              avistamento={a}
              onDeleted={fetchAvistamentos}
              onEdit={(item) => {
                setEditData(item);
                setShowForm(true);
              }}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
}
