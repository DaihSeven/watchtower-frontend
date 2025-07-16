"use client";

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
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Avistamentos</h1>

      {user && (
        <AvistamentoForm
          editData={editData}
          onSuccess={() => {
            fetchAvistamentos();
            setEditData(undefined);
          }}
          onCancelEdit={() => setEditData(undefined)}
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
              onEdit={(item) => setEditData(item)}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
}
