// exemplo em algum componente
'use client';

import { useEffect, useState } from 'react';
import { testApiConnection } from '../utils/testConnection';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ApiStatus() {
  const [status, setStatus] = useState<string>('Verificando...');

  useEffect(() => {
    const check = async () => {
      if (!API_BASE_URL) {
        setStatus('URL da API não definida');
        return;
      }
      const result = await testApiConnection(API_BASE_URL);
      setStatus(result.message);
    };
    check();
  }, []);

  return (
    <div className="text-sm text-gray-700">
      Status da API: <strong>{status}</strong>
    </div>
  );
}
